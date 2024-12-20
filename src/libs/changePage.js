const currentStyle = document.getElementById("currentStyle");
loadContent("home")
// Función para cargar contenido dinámico
async function loadContent(name) {
    const path = "/src/";
    const pageHTML = `${path}pages/${name}.html`;
    const pageCSS = `${path}styles/${name}.css`;
    const pageJS = `${path}scripts/${name}.js`;

    // Si la bandera está activada en sessionStorage, recargar la página
    if (sessionStorage.getItem("reloadFlag") === "true") {
        sessionStorage.setItem("reloadFlag", "false"); // Cambiar la bandera a false

        // Guardar datos del nuevo contenido en sessionStorage
        sessionStorage.setItem("pageHTML", pageHTML);
        sessionStorage.setItem("pageCSS", pageCSS);
        sessionStorage.setItem("pageJS", pageJS);

        // Guardar la posición relativa del elemento activo
        const navButtons = Array.from(document.querySelectorAll("nav button"));
        const activeIndex = navButtons.findIndex((button) =>
            button.classList.contains("active")
        );
        sessionStorage.setItem("activeIndex", activeIndex);

        // Recargar la página para aplicar los cambios
        window.location.reload();
        return;
    }

    // Comprobar si tenemos datos almacenados de la página anterior
    const storedPageHTML = sessionStorage.getItem("pageHTML");
    const storedPageCSS = sessionStorage.getItem("pageCSS");
    const storedPageJS = sessionStorage.getItem("pageJS");

    if (storedPageHTML && storedPageCSS && storedPageJS) {
        // Si tenemos los datos almacenados, cargamos directamente los recursos
        document.getElementById("content").innerHTML = await fetchPageContent(storedPageHTML);

        // Cargar CSS dinámico (si es diferente)
        if (currentStyle.href !== storedPageCSS) {
            currentStyle.href = storedPageCSS;
        }

        // Cargar y ejecutar JS dinámico
        loadScript(storedPageJS);

        // Restaurar el estado 'active' por posición relativa
        const activeIndex = sessionStorage.getItem("activeIndex");
        if (activeIndex !== null) {
            const navButtons = document.querySelectorAll("nav button");
            navButtons.forEach((button, index) => {
                button.classList.toggle("active", index === parseInt(activeIndex, 10));
            });
        }
    } else {
        try {
            // Cargar contenido HTML
            const response = await fetch(pageHTML);
            if (!response.ok) throw new Error("Page not found");
            const content = await response.text();
            document.getElementById("content").innerHTML = content;

            // Cargar CSS dinámico (solo si cambia)
            if (currentStyle.href !== pageCSS) {
                currentStyle.href = pageCSS;
            }

            // Cargar y ejecutar JS dinámico
            loadScript(pageJS);
        } catch (error) {
            console.error("Error loading page:", error);
            document.getElementById("content").innerHTML =
                "<p>Failed to load content.</p>";
        }
    }

    // Establecer la bandera de recarga para la siguiente vez
    sessionStorage.setItem("reloadFlag", "true");
}

async function fetchPageContent(pageHTML) {
    const response = await fetch(pageHTML);
    return await response.text();
}

function loadScript(src) {
    // Eliminar el script anterior si existe
    const baseSrc = src.split('?')[0];
    const existingScript = document.querySelector(`script[src^="${baseSrc}"]`);

    if (existingScript) {
        existingScript.remove();
    }

    // Crear un nuevo script con un "cache buster" único
    const newScript = document.createElement("script");
    newScript.type = "module";
    newScript.src = `${src}?t=${Date.now()}`;
    newScript.defer = true;
    newScript.id = "currentScript";

    // Dejar que el DOM se actualice antes de agregar el nuevo script
    setTimeout(() => {
        document.body.appendChild(newScript);
    }, 0);
}

export function dinamicNav() {
    // Manejar navegación dinámica
    document.querySelectorAll("a[data-page]").forEach((link, index) => {
        link.addEventListener("click", (event) => {
            event.preventDefault(); // Prevenir navegación por defecto
            const page = link.getAttribute("data-page");

            // Quitar la clase 'active' de todos los botones
            document.querySelectorAll("nav button").forEach((button) => {
                button.classList.remove("active");
            });

            // Agregar la clase 'active' al botón actual
            link.parentElement.classList.add("active");

            // Guardar la posición relativa del botón activo
            sessionStorage.setItem("activeIndex", index);

            // Cargar contenido dinámico
            loadContent(page);
        });
    });
}

dinamicNav();

// Cargar 'home.html' por defecto al cargar la página
if (sessionStorage.getItem("reloadFlag") !== "true") {
    loadContent("home");
}

// Mostrar el año actual en el footer
document.getElementById("year").textContent += " " + new Date().getFullYear();
