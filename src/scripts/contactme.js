import {
    changeLanguageElement,
    translatePlaceHolder,
    translateText,
} from "../utils/load.js";

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

        let isValid = true;

        // Obtener Nombre
        const nameInput = document.getElementById("name");
        const nameData = nameInput.value;

        // Validar Email
        const emailInput = document.getElementById("email");
        const emailError = document.getElementById("email-error");
        const emailPattern = /^[^@]+@[^@]+\.[a-z]{2,}$/i;
        if (!emailPattern.test(emailInput.value)) {
            emailError.textContent = translateText("contactmeEmailError");
            isValid = false;
        } else {
            emailError.textContent = "";
        }
        // Obtener Email
        const emailData = emailInput.value;

        if (!isValid) {
            alert(translateText("contactmeInvalidForm"));
            return;
        }

        const messageTextArea = document.getElementById("message");
        const messageData = messageTextArea.value || "";

        const formData = {
            service_id: "service_x8smchf", // Reemplaza con tu Service ID
            template_id: "template_sqxxfyh", // Reemplaza con tu Template ID
            user_id: "qQLuRN1GQ5a-P5r_x", // Reemplaza con tu API Key pública
            template_params: {
                name: nameData,
                email: emailData,
                message: messageData,
            },
        };

        // Realizar la solicitud POST utilizando fetch
        fetch("https://api.emailjs.com/api/v1.0/email/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData), // Convierte el objeto formData a JSON
        })
            .then((response) => {
                // Verificar si la respuesta es exitosa (status 200)
                if (!response.ok) {
                    return Promise.reject(
                        "Error en la solicitud: " + response.statusText
                    );
                }
                return response.text(); // Usar text() si la respuesta no es JSON
            })
            .then((data) => {
                if (data !== "OK") {
                    alert(translateText("contactmeUnexpectedError"));
                    redirectToGmail(formData);
                } else {
                    nameInput.value = "";
                    emailInput.value = "";
                    messageTextArea.value = "";
                }
            })
            .catch((error) => {
                alert(translateText("contactmeEmailError"));
                redirectToGmail(formData);
            });

        alert(translateText("contactmeValidForm"));
    });

function redirectToGmail(formData) {
    const { name, email, message } = formData.template_params;
    const toEmail = "francoacm1011000@gmail.com";
    const subject = `Mensaje de ${email} desde Portafolio`;
    const body = `${name}: ${message}`;
    window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${toEmail}&su=${subject}&body=${body}`;
}

