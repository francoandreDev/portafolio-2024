import { ListProject, Project } from "../concepts/project/exports.js";

import { changeLanguageElement } from "../utils/load.js";

const listProjects = new ListProject();

const projects = [
    new Project(
        "Project 1",
        "A brief description of project 1.",
        "https://github.com/user/project1",
        "https://example.com/project1",
        "https://images3.alphacoders.com/135/1350069.jpeg"
    ),
    new Project(
        "Project 2",
        "A brief description of project 2.",
        "https://github.com/user/project2",
        "https://example.com/project2",
        "https://wallpapers.com/images/hd/4k-ultra-hd-landscape-wallpaper-awid1q3a5dov0lop.jpg"
    ),
];

projects.forEach((project) => {
    listProjects.add(project);
});

// Contenedor del grid
const cardContainer = document.querySelector(".card-container");
cardContainer.innerHTML = "";

listProjects.renderProjects(cardContainer);

// Actualizar idioma
const elementContents = {
    projectsTitle: document.getElementById("projects-title"),
};

Object.entries(elementContents).forEach(([key, element]) => {
    changeLanguageElement(element, key);
});
