import { Email } from "./Email.js";

export class Form {
    constructor(nameInput, emailInput, emailError, messageInput) {
        this.nameInput = nameInput;
        this.emailInput = emailInput;
        this.emailErrorInput = emailError;
        this.messageInput = messageInput;
        this.isValid = true;
    }

    get name() {
        return this.nameInput.value || "";
    }

    set name(newName) {
        this.nameInput.value = newName || ""
    }

    get email() {
        return this.emailInput.value || "";
    }

    set email(newEmail) {
        this.emailInput.value = newEmail || ""
    }

    get emailError() {
        return this.emailErrorInput || ""
    }

    set emailError(newEmailError) {
        this.emailErrorInput.textContent = newEmailError || ""
    }

    get message() {
        return this.messageInput.value || "";
    }

    set message(newMessage) {
        this.messageInput.value = newMessage || ""
    }

    setEmailError(textTranslated) {
        const emailData = this.email
        const emailPattern = /^[^@]+@[^@]+\.[a-z]{2,}$/i;
        if (!emailPattern.test(emailData)) {
            this.emailError = textTranslated;
            this.isValid = false;
        } else {
            this.emailError = "";
        }
        return this.emailErrorInput.textContent
    }

    get formData() {
        return {
            service_id: "service_x8smchf", 
            template_id: "template_sqxxfyh", 
            user_id: "qQLuRN1GQ5a-P5r_x", 
            template_params: {
                name: this.name,
                email: this.email,
                message: this.message,
            },
        };
    }

    sendPostRequest() {
        Email.sendData.bind(this)()
    }
}
