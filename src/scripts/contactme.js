import {
    changeLanguageElement,
    translatePlaceHolder,
    translateText,
} from "../utils/load.js";

import { Form } from "../concepts/contact/Form.js";

// Actualizar idioma
const elementosContenido = {
    contactmeTitle: document.getElementById("contactme-title"),
    contactmeSubTitle: document.getElementById("contactme-sub-title"),
    contactmeLabelName: document.getElementById("contactme-label-name"),
    contactmeLabelEmail: document.getElementById("contactme-label-email"),
    contacmeLabelMessage: document.getElementById("contactme-label-message"),
    contactmeButtonSend: document.getElementById("contactme-button-send"),
};

Object.entries(elementosContenido).forEach(([key, element]) => {
    changeLanguageElement(element, key);
});

// otros elementos
const elementosPlaceHolder = {
    contactmeName: document.getElementById("name"),
    contactmeEmail: document.getElementById("email"),
    contactmeMessage: document.getAnimations("message"),
};

Object.entries(elementosPlaceHolder).forEach(([key, element]) => {
    translatePlaceHolder(element, key);
});

document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
        event.preventDefault();
        sendForm();
    });

function sendForm() {
    const form = new Form(
        document.getElementById("name"),
        document.getElementById("email"),
        document.getElementById("email-error"),
        document.getElementById("message")
    );

    form.setEmailError(translateText("contactmeEmailError"));
    if (!form.isValid) return;
    form.sendPostRequest();

    alert(translateText("contactmeValidForm"));
    resetForm()
}

function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("email-error").textContent = "";
    document.getElementById("message").value = "";
}
