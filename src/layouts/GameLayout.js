import { createElement, ArrowUp, ArrowDown, Check, FileQuestion, Heart, HeartHandshake } from "lucide";
import { HeartCounter } from "../components/HeartCounter";
import { LostContent, Modal, WonContent } from "../components/Modal";

const Colors = {
    correct: {
        bg:"bg-green-800",
        text: "text-green-500"
    },
    other: {
        bg:"bg-gray-700",
        text: "text-yellow-400"
    }
};

const MaxAttempts = 10;
const Stats = {
    randomNumber: 0,
    attempts: [],
    status: "playing"
}

export function GameLayout() {
    const fragment = document.createDocumentFragment();

    const div = document.createElement("div");
    div.classList.add("h-screen", "flex", "justify-center", "items-center")
    fragment.append(div);
    
    const div2 = document.createElement("div");
    div2.classList.add("flex", "flex-col", "justify-center", "items-center", "gap-4")
    div2.classList.add("w-lg", "p-8", "rounded-lg", "border-gray-400", "border-2", "bg-gray-800", "shadow-lg", "shadow-gray-700")
    div.append(div2);
    
    const title = document.createElement("h1");
    title.classList.add("text-4xl", "font-bold", "text-gray-300");
    title.textContent = "Guess the Number";
    div2.append(title);

    const hr = document.createElement("hr");
    hr.classList.add("border-t", "border", "w-full", "border-gray-600");
    div2.append(hr);

    div2.append(HeartCounter());
    div2.append(InputField());
    
    const p = document.createElement("p");
    p.classList.add("validator-hint");
    p.textContent = "Must be between be 1 to 10";
    
    const attempts = AttemptTable();
    div2.append(attempts)

    const retryButton = document.createElement("button");
    retryButton.classList.add("btn", "hover:bg-blue-600", "hover:text-white", "duration-200", "w-32");
    retryButton.textContent = "Retry";
    retryButton.style.display = "none";
    retryButton.setAttribute("id", "retry");
    div2.append(retryButton);

    retryButton.addEventListener("click", e=>{retryButton.style.display = "none"; ResetStats()});

    ResetStats()

    return fragment;
}

function InputField() {
    const field = document.createElement("div");
    field.classList.add("flex", "justify-center", "items-center", "gap-2", "w-full")
    
    const input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("id", "input");

    input.classList.add("input", "validator");
    input.setAttribute("required", "");
    input.setAttribute("placeholder", "Type a number between 1 to 100");
    input.setAttribute("min", "1");
    input.setAttribute("max", "100");
    input.setAttribute("title", "Must be between be 1 to 100");
    field.append(input)
    
    const sendButton = document.createElement("button");
    sendButton.classList.add("btn", "hover:bg-green-600", "duration-200");
    sendButton.textContent = "Send";
    field.append(sendButton);

    input.addEventListener("keydown", (e)=>{
        if(e.key==='Enter'){
            doAttempt();
        }

        input.focus();
    });

    sendButton.addEventListener("click", e=>doAttempt());

    return field;
}

function ResetStats() {
    Stats.attempts.length = 0;
    Stats.randomNumber = Math.round(Math.random()*(100-1)+1);
    Stats.status = "playing";

    const input = document.querySelector("#input");
    const tbody = document.querySelector("#tbody");
    const modal = document.querySelector("#result");

    updateCounter();

    if(input){
        input.removeAttribute("disabled");
    }

    if(modal){
        modal.remove();
    }

    if(!tbody){ return; };

    while(tbody.children.length!==0) {
        tbody.children[0].remove();
    }
}

function doAttempt() {
    const input = document.querySelector("#input");
    const value = +input.value;

    input.value = "";

    if(isNaN(value)) {
        return alert("Invalid input!");
    } else if (Stats.attempts.some((v)=>{return v==value})) {
        return alert("You already inserted this number!");
    } else if (value < 1 || value > 100) {
        return alert("Number has to be between 1 and 100");
    }

    Stats.attempts.push(value);
    updateCounter();

    switch(true) {
        case value > Stats.randomNumber:
            AddAttemptToTable(value, ArrowDown, "The number is lower!");
                
            break;
                
        case value < Stats.randomNumber:
            AddAttemptToTable(value, ArrowUp, "The number is greater!");
                    
            break;
            
        default:
            AddAttemptToTable(value, Check, "The number is correct!", Colors.correct);

            input.setAttribute("disabled", "");
            Stats.status = "won"
            document.querySelector("#retry").style.display = "block";

            setTimeout(()=>Modal("result", WonContent()), 1000);

            return;
    }

    if(Stats.attempts.length>=MaxAttempts) {
        input.setAttribute("disabled", "");
        Stats.status = "lost"
        document.querySelector("#retry").style.display = "block";
        setTimeout(()=>Modal("result", LostContent()), 1000);
    }
}

function updateCounter() {
    const hearts = document.querySelector("#hearts");
    if(!hearts){ return; }
    
    hearts.textContent = MaxAttempts-Stats.attempts.length;
}

function AttemptTable() {
    const div = document.createElement("div");
    div.classList.add("w-full", "overflow-x-auto", "rounded-box", "border", "border-base-content/5", "bg-base-100", "max-h-48", "h-48");
    
    const table = document.createElement("table");
    table.classList.add("table");

    const thead = document.createElement("thead");

    const tr = document.createElement("tr");

    const th = document.createElement("th");
    th.textContent = "Guess";
    tr.appendChild(th);

    const th1 = document.createElement("th");
    th1.textContent = "Result";
    tr.appendChild(th1);
    thead.appendChild(tr);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    tbody.setAttribute("id", "tbody")

    table.appendChild(tbody);
    div.appendChild(table);

    return div
}

function AddAttemptToTable(guessedNumber=-1, icon=Check, text = "Unknown", color_object=Colors.other) {
    const tbody = document.querySelector("#tbody");

    const tr = document.createElement("tr");
    tr.classList.add(tbody.children.length%2===0? "bg-[rgba(0,0,0,1)]":"bg-[rgba(0,0,0,.5)]")

    tr.classList.add(color_object.bg, "duration-700");

    const th = document.createElement("th");
    th.textContent = guessedNumber;
    tr.appendChild(th);
    
    const td = document.createElement("td");
    td.classList.add("flex-col-reverse")
    tr.appendChild(td);

    const div = document.createElement("div");
    div.classList.add("flex", "gap-2", "w-full", "justify-between");
    td.append(div)

    const p = document.createElement("p");
    p.textContent = text,
    div.append(p);
    
    const svg = createElement(icon);
    svg.classList.add(color_object.text);
    div.append(svg);

    if(tbody.children.length === 0) {
        tbody.append(tr);
    } else {
        tbody.insertBefore(tr, tbody.children[0]);
    }

    setTimeout(()=>tr.classList.remove(color_object.bg), 10);
}