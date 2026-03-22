export function GameLayout() {
    const fragment = document.createDocumentFragment();

    const div = document.createElement("div");
    div.classList.add("h-screen", "flex", "justify-center", "items-center")
    fragment.append(div);

    const div2 = document.createElement("div");
    div2.classList.add("flex", "flex-col", "justify-center", "items-center", "gap-4")
    div2.classList.add("w-lgk", "p-8", "rounded-lg", "border-white", "border-2", "bg-gray-800")
    div.append(div2);

    const logo = document.createElement("img");
    logo.src = ""; // TODO: Insert a good logo
    div2.append(logo);

    const input = document.createElement("input");
    input.setAttribute("type", "number");
    input.classList.add("input", "validator");
    input.setAttribute("required", "");
    input.setAttribute("placeholder", "Type a number between 1 to 10");
    input.setAttribute("min", "1");
    input.setAttribute("max", "10");
    input.setAttribute("title", "Must be between be 1 to 10");

    const p = document.createElement("p");
    p.classList.add("validator-hint");
    p.textContent = "Must be between be 1 to 10";

    div2.append(input);

    return fragment;
}