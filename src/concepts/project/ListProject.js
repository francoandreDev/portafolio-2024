import { Project } from "./Project.js";

export class ListProject {
    constructor() {
        this.projects = [];
    }

    add(project) {
        this.projects.push(project);
    }

    remove(projectName) {
        index =
            this.projects.findIndex(
                (project) => project.title === projectName
            ) || -1;
        if (index === -1) return;
        this.projects.splice(index, 1);
        //? Alternativa:
        // this.projects = this.projects.filter((project) => project.title !== projectName);
    }

    getProject(pos) {
        if (pos < this.projects.length) return this.projects[pos];
        else if (pos === this.projects.length) {
            const emptyProject = new Project(
                "Next Project",
                "Coming Soon",
                "https://github.com/user/project3",
                "https://example.com/project3",
                "https://www.everwallpaper.co.uk/cdn/shop/collections/blackthorne-game-style-wallpaper-mural-room.jpg?v=1660200203"
            );
            return emptyProject;
        }
    }

    renderProjects(cardContainer) {
        for (let i = 0; i<= this.projects.length; i++) {
            const project = this.getProject(i)
            //? template 
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    <img src="${project.image}" alt="${project.title}" />
                </div>
                <div class="card-back">
                    <h2>${project.title}</h2>
                    <p>${project.description}</p>
                    <a href="${project.github}" target="_blank">GitHub</a>
                    <a href="${project.live}" target="_blank">Live Project</a>
                </div>
            </div>
        `;
            cardContainer.appendChild(card);

            // Evento para alternar entre frente y reverso
            card.addEventListener("click", () => {
                card.classList.toggle("flipped");
            });
        }
    }
}
