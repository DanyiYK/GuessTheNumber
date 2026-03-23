import { createElement, Heart } from "lucide";
export function HeartCounter() {
    const div = document.createElement('div');
    div.classList.add('badge', 'badge-soft', 'badge-secondary', 'p-4');

    const heartContainer = document.createElement("div");
    heartContainer.classList.add("w-full", "flex", "justify-center", "items-center", "gap-2")
    div.append(heartContainer)

    const heart = createElement(Heart);
    heartContainer.append(heart); 

    const span2 = document.createElement("span");
    span2.setAttribute("id", "hearts")
    span2.textContent = "10";
    heartContainer.append(span2);

    return div;
}