import { createElement, FileWarning } from "lucide"

export function NotFoundLayout() {
    const fragment = document.createDocumentFragment();

    const div = document.createElement("div");
    div.classList.add("flex", "justify-center", "items-center", "flex-col", "w-screen", "h-screen", "gap-4");
    fragment.append(div);


    const div2 = document.createElement("div");
    div2.classList.add("flex", "justify-center", "items-center", "gap-4", "flex-col")
    div.append(div2);

    const warning = createElement(FileWarning);
    warning.classList.add("text-orange-300", "size-12")
    div2.append(warning);

    const h2 = document.createElement("h2");
    h2.classList.add("text-4xl", "text-gray-400")
    h2.textContent = "404 - Not Found :(";
    div2.append(h2);

    const p = document.createElement("p");
    p.classList.add("text-xl", "text-shadow-gray-200");
    p.textContent = "The page you are looking for either doesn't exist or might be removed.";
    div.append(p);

    const a = document.createElement("a");
    a.classList.add("text-blue-400", "hover:text-blue-600", "duration-200");
    a.href = "./game";
    a.textContent = "Hop back to the main game";
    div.append(a);

    return fragment;
}