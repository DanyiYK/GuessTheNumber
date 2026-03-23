import { createElement, Frown, Trophy } from "lucide";

export function Modal(id="my_modal", content = document.createDocumentFragment()) {
    const dialog = document.createElement("dialog");
    dialog.classList.add("modal");
    dialog.setAttribute("id", id)
    const div = document.createElement("div");
    div.classList.add("modal-box");

    const h3 = document.createElement("h3");
    h3.classList.add("text-lg", "font-bold", "text-center");
    h3.textContent = "Game ended";
    div.appendChild(h3);
    div.appendChild(content);
    
    dialog.appendChild(div);


    const form = document.createElement("form");
    form.setAttribute("method", "dialog");
    form.classList.add("modal-backdrop");

    const button1 = document.createElement("button");
    button1.textContent = "close";
    form.appendChild(button1);
    dialog.appendChild(form);

    document.querySelector("body").append(dialog);
    dialog.showModal();
}

export function WonContent() {
    const div = document.createElement("div");
    div.classList.add("flex", "justify-center", "items-center", "flex-col", "gap-4", "mt-8")

    const svg = createElement(Trophy);
    svg.classList.add("size-16", "text-center", "text-yellow-400")
    div.append(svg);

    const p = document.createElement("p");
    p.classList.add("text-center");
    p.textContent = "You won!"
    div.append(p);


    return div;
}

export function LostContent() {
    const div = document.createElement("div");
    div.classList.add("flex", "justify-center", "items-center", "flex-col", "gap-4", "mt-8")

    const svg = createElement(Frown);
    svg.classList.add("size-16", "text-center", "text-blue-400")
    div.append(svg);

    const p = document.createElement("p");
    p.classList.add("text-center");
    p.textContent = "You lost!";
    div.append(p);

    return div;
}