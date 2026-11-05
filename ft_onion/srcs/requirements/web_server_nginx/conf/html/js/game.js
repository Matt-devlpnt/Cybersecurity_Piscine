function chifoumi_roll() {
    const target = document.querySelector("#chifoumi_roll");

    const text_roll = [
        "CHI",
	"FOU",
	"MI"
    ];

    let index = 0;

    setInterval(() => {
        index = (index + 1) % text_roll.length;

	target.textContent = text_roll[index];
    }, 1000);
}



window.addEventListener("load", () => {
    setTimeout(chifoumi_roll, 1000);
});



const pierre = document.querySelector("#pierre");

const img_pierre = new Image();
img_pierre.src = "/images/pierre_game_80x80.png";

pierre.addEventListener("dragstart", (e) => {
    e.dataTransfer.setDragImage(img_pierre, 40, 40);
    e.dataTransfer.setData("text/plain", e.target.id);
    pierre.style.visibility = "hidden";
});

pierre.addEventListener("dragover", (e) => {
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.effectAllowed = "move";
});

pierre.addEventListener("dragend", (e) => {
    if (e.dataTransfer.dropEffect) {
        pierre.style.visibility = "visible";
    }
});



const feuille = document.querySelector("#feuille");

const img_feuille = new Image();
img_feuille.src = "/images/feuille_game_80x80.png";

feuille.addEventListener("dragstart", (e) => {
    e.dataTransfer.setDragImage(img_feuille, 40, 40);
    e.dataTransfer.setData("text/plain", e.target.id);
    feuille.style.visibility = "hidden";
});

feuille.addEventListener("dragover", (e) => {
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.effectAllowed = "move";
});

feuille.addEventListener("dragend", (e) => {
    if (e.dataTransfer.dropEffect) {
        feuille.style.visibility = "visible";
    }
});



const ciseaux = document.querySelector("#ciseaux");

const img_ciseaux = new Image();
img_ciseaux.src = "/images/ciseaux_game_80x80.png";

ciseaux.addEventListener("dragstart", (e) => {
    e.dataTransfer.setDragImage(img_ciseaux, 40, 40);
    e.dataTransfer.setData("text/plain", e.target.id);
    ciseaux.style.visibility = "hidden";
});

ciseaux.addEventListener("dragover", (e) => {
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.effectAllowed = "move";
});

ciseaux.addEventListener("dragend", (e) => {
    if (e.dataTransfer.dropEffect) {
        ciseaux.style.visibility = "visible";
    }
});



const dropzone = document.querySelector("#dropzone");
const drop_message = document.querySelector("#drop_message");

const dropzone_pierre = document.querySelector("#dropzone_pierre");
const dropzone_ciseaux = document.querySelector("#dropzone_ciseaux");
const dropzone_feuille = document.querySelector("#dropzone_feuille");

dropzone.addEventListener("dragenter", (e) => {
    const id = e.dataTransfer.getData("text/plain");
    if (id === "pierre" || id === "feuille" || id === "ciseaux") {
        drop_message.style.display = "none";
        dropzone.style.backgroundColor = "rgb(226, 192, 192)";
    }
});

dropzone.addEventListener("dragleave", (e) => {
    if (!dropzone.contains(e.relatedTarget)) {
        if (dropzone.querySelectorAll("img").length === 0) {
            drop_message.style.display = "block";
        }
        dropzone.style.backgroundColor = "#f0dede";
    }
});

dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.effectAllowed = "move";
});

dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.effectAllowed = "move";
    const id = e.dataTransfer.getData("text/plain");
    const svg = document.getElementById(id);
    if (dropzone.querySelectorAll("img").length === 1 && dropzone.children[1].id === "pierre") {
	dropzone_pierre.appendChild(pierre);
    } else if (dropzone.querySelectorAll("img").length === 1 && dropzone.children[1].id === "feuille") {
	dropzone_feuille.appendChild(feuille);
    } else if (dropzone.querySelectorAll("img").length === 1 && dropzone.children[1].id === "ciseaux") {
	dropzone_ciseaux.appendChild(ciseaux);
    }
    if (svg && svg.nodeName === "IMG")
        dropzone.appendChild(svg);
    dropzone.style.backgroundColor = "#f0dede";
});



dropzone_pierre.addEventListener("dragenter", (e) => {
    const id = e.dataTransfer.getData("text/plain");
});

dropzone_pierre.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.effectAllowed = "move";
});

dropzone_pierre.addEventListener("drop", (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.effectAllowed = "move";
    const id = e.dataTransfer.getData("text/plain");
    const svg = document.getElementById(id);
    if (svg && svg.nodeName === "IMG" && id == "pierre")
        dropzone_pierre.appendChild(svg);
    if (!dropzone.contains(e.relatedTarget)) {
        if (dropzone.querySelectorAll("img").length === 0) {
            drop_message.style.display = "block";
        }
    }
});



dropzone_feuille.addEventListener("dragenter", (e) => {
    const id = e.dataTransfer.getData("text/plain");
});

dropzone_feuille.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.effectAllowed = "move";
});

dropzone_feuille.addEventListener("drop", (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.effectAllowed = "move";
    const id = e.dataTransfer.getData("text/plain");
    const svg = document.getElementById(id);
    if (svg && svg.nodeName === "IMG" && id == "feuille")
        dropzone_feuille.appendChild(svg);
    if (!dropzone.contains(e.relatedTarget)) {
        if (dropzone.querySelectorAll("img").length === 0) {
            drop_message.style.display = "block";
        }
    }
});



dropzone_ciseaux.addEventListener("dragenter", (e) => {
    const id = e.dataTransfer.getData("text/plain");
});

dropzone_ciseaux.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.effectAllowed = "move";
});

dropzone_ciseaux.addEventListener("drop", (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.effectAllowed = "move";
    const id = e.dataTransfer.getData("text/plain");
    const svg = document.getElementById(id);
    if (svg && svg.nodeName === "IMG" && id == "ciseaux")
        dropzone_ciseaux.appendChild(svg);
    if (!dropzone.contains(e.relatedTarget)) {
        if (dropzone.querySelectorAll("img").length === 0) {
            drop_message.style.display = "block";
        }
    }
});
