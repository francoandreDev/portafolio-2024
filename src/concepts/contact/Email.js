import { translateText } from "../../utils/load.js";

export class Email {
    static sendData() {
        // Realizar la solicitud POST utilizando fetch
        fetch("https://api.emailjs.com/api/v1.0/email/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.formData), // Convierte el objeto formData a JSON
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
                    Email.redirectToGmail(this.formData);
                } else {
                    this.name = "";
                    this.email = "";
                    this.message = ""
                }
            })
            .catch((error) => {
                alert(translateText("contactmeEmailError"));
                Email.redirectToGmail(this.formData);
            });
    }

    static redirectToGmail(formData) {
        const { name, email, message } = formData.template_params;
        const toEmail = "francoacm1011000@gmail.com";
        const subject = `Mensaje de ${email} desde Portafolio`;
        const body = `${name}: ${message}`;
        window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=${toEmail}&su=${subject}&body=${body}`;
    }
}
