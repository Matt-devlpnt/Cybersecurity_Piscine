const target = document.querySelector("#chifoumi_roll");

function chifoumi_roll(text) {
    target.textContent = text;
}



function add_image(src, alt, id) {
    image = document.createElement("img");
    image.src = src;
    image.alt = alt;
    image.id = id;
    target.textContent = "";
    target.appendChild(image);
}



function robot_choice() {
    const choice = ["pierre", "feuille", "ciseaux"];

    const pull = choice[Math.floor(Math.random() * choice.length)];

    if (pull === "pierre") {
        add_image("/images/pierre_robot.svg", "pierre robot", "pierre_robot");
    } else if (pull === "feuille") {
        add_image("/images/feuille_robot.svg", "feuille robot", "feuille_robot");
    } else {
        add_image("/images/ciseaux_robot.svg", "ciseaux robot", "ciseaux_robot");
    }

    return pull;
}



let round_number = 1;
let robot_score = 0;
let user_score = 0;
const round = document.getElementById("round_zone").querySelector("p");;
const robot_scr = document.getElementById("score_zone").querySelector("#robot_score");
const user_scr = document.getElementById("score_zone").querySelector("#user_score");

function counter_handler(old_robot_score, old_user_score, robot_score, user_score) {
    if (old_robot_score !== robot_score
        || old_user_score !== user_score) {
        round_number += 1;
        round.textContent = "Round: " + round_number;
    }
}

function score_handler(old_robot_score, old_user_score, robot_score, user_score) {
    if (old_robot_score !== robot_score) {
        robot_scr.textContent = "Robot: " + robot_score;
    } else if (old_user_score !== user_score) {
        user_scr.textContent = "Guest: "+ user_score;
    }
}

function game_score(robot_choice, user_choice) {
    let old_robot_score = robot_score;
    let old_user_score = user_score;

    if (robot_choice === "pierre") {
        if (user_choice === "pierre") {
            robot_score += 0;
            user_score += 0;
	} else if (user_choice === "feuille") {
            robot_score += 0;
            user_score += 1;
	} else {
            robot_score += 1;
            user_score += 0;
	}
    } else if (robot_choice === "feuille") {
        if (user_choice === "pierre") {
            robot_score += 1;
            user_score += 0;
	} else if (user_choice === "feuille") {
            robot_score += 0;
            user_score += 0;
	} else {
            robot_score += 0;
            user_score += 1;
	}
    } else {
        if (user_choice === "pierre") {
            robot_score += 0;
            user_score += 1;
	} else if (user_choice === "feuille") {
            robot_score += 1;
            user_score += 0;
	} else {
            robot_score += 0;
            user_score += 0;
	}
    }

    counter_handler(old_robot_score, old_user_score, robot_score, user_score);

    score_handler(old_robot_score, old_user_score, robot_score, user_score);

    if (robot_score === 3) {
        target.textContent = "KO";
    } else if (user_score === 3) {
        target.textContent = "OK";
    }
    
    if (robot_score === 3 || user_score === 3) {
        robot_score = 0;
        user_score = 0;
        robot_scr.textContent = "Robot: 0";
        user_scr.textContent = "Guest: 0";
        round_number = 1;
        round.textContent = "Round: " + round_number;
    }
}



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

    chifoumi_roll("CHI");
    setTimeout(() => {chifoumi_roll("FOU");}, 1000);
    setTimeout(() => {chifoumi_roll("MI");}, 2000);
    setTimeout(() => {
        choice = robot_choice();
        game_score(choice, dropzone.children[1].id);
    }, 2500);
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
