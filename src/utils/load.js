import { content } from "../translate/content.js";

export function changeLanguageElement(element, key) {
    const language = sessionStorage.getItem("language") || "en";
    element.textContent = content[language][key];
}

export function translatePlaceHolder(element, key) {
    const language = sessionStorage.getItem("language") || "en";
    element.placeholder = content[language][key];
}

export function translateValueOption(element, key) {
    const language = sessionStorage.getItem("language") || "en";
    element.value = content[language][key];
}

export function translateText(key) {
    const language = sessionStorage.getItem("language") || "en";
    return content[language][key];
}

export function loadConfiguration() {
    // Revisa si hay alguna configuración previa guardada para aplicarla
    const language = sessionStorage.getItem("language");
    const theme = sessionStorage.getItem("theme");
    const fontSize = sessionStorage.getItem("font-size");
    const fontFamily = sessionStorage.getItem("font-family");

    // Cambiar las variables de CSS para el tema, tamaño y tipo de fuente
    document.documentElement.style.setProperty("--font-size", fontSize);
    document.documentElement.style.setProperty("--font-family", fontFamily);

    // Cambiar el tema de la página (cambia las variables del root)
    if (theme === "dark") {
        document.body.setAttribute("data-theme", "dark");
    } else {
        document.body.setAttribute("data-theme", "light");
    }

    // actualizar el idioma
    if (language === null) return;
    window.document.title = content[language].windowTitle;
}

loadConfiguration();
