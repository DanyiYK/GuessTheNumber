import { createElement, ArrowUp, ArrowDown, Check, FileQuestion } from "lucide";

const colors = {
    correct: {
        bg:"bg-green-800",
        text: "text-green-500"
    },
    other: {
        bg:"bg-gray-700",
        text: "text-yellow-400"
    }
};
const choosenNumber = 10;

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

    const logo = document.createElement("img");
    logo.src = ""; // TODO: Insert a good logo
    div2.append(logo);
    
    const inputField = document.createElement("div");
    inputField.classList.add("flex", "justify-center", "items-center", "gap-2", "w-full")
    div2.append(inputField);
    
    const input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("id", "input");

    input.classList.add("input", "validator");
    input.setAttribute("required", "");
    input.setAttribute("placeholder", "Type a number between 1 to 100");
    input.setAttribute("min", "1");
    input.setAttribute("max", "100");
    input.setAttribute("title", "Must be between be 1 to 100");
    inputField.append(input)
    
    const sendButton = document.createElement("button");
    sendButton.classList.add("btn", "hover:bg-green-600", "duration-200");
    sendButton.textContent = "Send";
    inputField.append(sendButton);
    
    const p = document.createElement("p");
    p.classList.add("validator-hint");
    p.textContent = "Must be between be 1 to 10";
    
    const attempts = AttemptTable();
    div2.append(attempts)

    input.addEventListener("keydown", (e)=>{
        if(e.key==='Enter'){
            DoAttempt();
        }

        input.focus();
    });
    sendButton.addEventListener("click", DoAttempt);

    return fragment;
}

function DoAttempt() {
    const input = document.querySelector("#input");
    const value = +input.value;

    input.value = "";

    if(isNaN(value)) {
        alert("Invalid input!");
    } else if (value < 1 || value > 100) {
        alert("Number has to be between 1 and 100")
    }

    switch(true) {
        case value > choosenNumber:
            MakeAttemptEntry(value, ArrowDown, "The number is lower!");
                
            break;
                
        case value < choosenNumber:
            MakeAttemptEntry(value, ArrowUp, "The number is greater!");
                    
            break;
            
        default:
            MakeAttemptEntry(value, Check, "The number is correct!", colors.correct);

            break;
    }
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

function MakeAttemptEntry(guess=-1, icon=Check, text = "Unknown", color_object=colors.other) {
    const tbody = document.querySelector("#tbody");

    const tr = document.createElement("tr");
    tr.classList.add(tbody.children.length%2===0? "bg-[rgba(0,0,0,1)]":"bg-[rgba(0,0,0,.5)]")

    tr.classList.add(color_object.bg, "duration-700");

    const th = document.createElement("th");
    th.textContent = guess;
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