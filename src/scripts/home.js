import { changeLanguageElement } from "../utils/load.js";
import { dinamicNav } from "../libs/changePage.js";

dinamicNav();

// Actualizar idioma
const elementosContenido = {
    homeTitle: document.getElementById("home-title"),
    homeSpan11: document.getElementById("home-span-1-1"),
    homeSpan12: document.getElementById("home-span-1-2"),
    homeSpan21: document.getElementById("home-span-2-1"),
    homeSpan31: document.getElementById("home-span-3-1"),
    homeStrong11: document.getElementById("home-strong-1-1"),
    homeStrong21: document.getElementById("home-strong-2-1"),
    homeStrong31: document.getElementById("home-strong-3-1"),
    homeCv: document.getElementById("home-cv"),
    homeContactme: document.getElementById("home-contactme"),
};

Object.entries(elementosContenido).forEach(([key, element]) => {
    changeLanguageElement(element, key);
});
