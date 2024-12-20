import {
    changeLanguageElement,
    loadConfiguration,
    translateValueOption,
} from "../utils/load.js";

// Obtener elementos del formulario
const languageSelect = document.getElementById("language");
const themeSelect = document.getElementById("theme");
const fontSizeSelect = document.getElementById("font-size");
const fontFamilySelect = document.getElementById("font-family");

// Cargar configuraciones previas del sessionStorage, si existen
const savedLanguage = sessionStorage.getItem("language");
const savedTheme = sessionStorage.getItem("theme");
const savedFontSize = sessionStorage.getItem("font-size");
const savedFontFamily = sessionStorage.getItem("font-family");

// Aplicar configuraciones guardadas, si existen
if (savedLanguage) languageSelect.value = savedLanguage;
if (savedTheme) themeSelect.value = savedTheme;
if (savedFontSize) fontSizeSelect.value = savedFontSize;
if (savedFontFamily) fontFamilySelect.value = savedFontFamily;

// Aplicar los cambios a las variables CSS
applySettings();

// Agregar eventos a los selects para aplicar cambios
languageSelect.addEventListener("change", applySettings);
themeSelect.addEventListener("change", applySettings);
fontSizeSelect.addEventListener("change", applySettings);
fontFamilySelect.addEventListener("change", applySettings);

// Función para aplicar las configuraciones a las variables CSS
function applySettings() {
    // Obtener los valores de los selects
    const language = languageSelect.value;
    const theme = themeSelect.value;
    const fontSize = fontSizeSelect.value;
    const fontFamily = fontFamilySelect.value;

    // Guardar las configuraciones en el sessionStorage
    sessionStorage.setItem("language", language);
    sessionStorage.setItem("theme", theme);
    sessionStorage.setItem("font-size", fontSize);
    sessionStorage.setItem("font-family", fontFamily);

    loadConfiguration();
    changeLanguage();
}

function changeLanguage() {
    const elementsContent = {
        settingsTitle: document.getElementById("settings-title"),
        settingsLanguage: document.getElementById("settings-language"),
        settingsTheme: document.getElementById("settings-theme"),
        settingsSize: document.getElementById("settings-size"),
        settingsFont: document.getElementById("settings-font"),
        //? es curioso que no se modifiquen sus atributos value, sino los textContent
        settingsLanguageOption1: document.getElementById(
            "settings-language-option-1"
        ),
        settingsLanguageOption2: document.getElementById(
            "settings-language-option-2"
        ),
        settingsThemeOption1: document.getElementById(
            "settings-theme-option-1"
        ),
        settingsThemeOption2: document.getElementById(
            "settings-theme-option-2"
        ),
        settingsSizeOption1: document.getElementById("settings-size-option-1"),
        settingsSizeOption2: document.getElementById("settings-size-option-2"),
        settingsSizeOption3: document.getElementById("settings-size-option-3"),
        settingsFontOption1: document.getElementById("settings-font-option-1"),
        settingsFontOption2: document.getElementById("settings-font-option-2"),
        settingsFontOption3: document.getElementById("settings-font-option-3"),
    };
    Object.entries(elementsContent).forEach(([key, element]) => {
        changeLanguageElement(element, key);
    });
}
