window.addEventListener("load", () => {
    const title = document.querySelector(".highlight");
    setTimeout(() => {title.classList.add("active");}, 500);
});


const text = "Un duel. Trois choix. Une seule victoire.\nPrêt à défier le hasard et à montrer qui est le véritable champion ?\nChoisis ton arme et que le meilleur gagne !";
const element = document.querySelector("#text");

let index = 0;

function typeWriter() {
    if (index < text.length) {
        element.textContent += text[index];
        index++;

        setTimeout(typeWriter, 20);
    }
}

// Attendre le chargement complet de la page
window.addEventListener("load", () => {
    setTimeout(typeWriter, 1000);
});



function image_roll() {
    const image = document.querySelector("#gameImage");

    const images_src = [
        "/images/pierre.svg",
        "/images/feuille.svg",
        "/images/ciseaux.svg"
    ];

    const images_alt = [
        "pierre",
        "feuille",
        "ciseaux"
    ];

    let index = 0;

    setInterval(() => {
            index = (index + 1) % images_src.length;

            image.src = images_src[index];
            image.alt = images_alt[index];
    }, 400);
}

window.addEventListener("load", () => {
    setTimeout(image_roll, 3500);
});



function insert_button() {
    img_roll = document.querySelector('#gameImage');

    const button = document.createElement('button');
    button.textContent = 'Let\'s GO';
    button.classList.add('button_play');

    img_roll.after(button);
}

window.addEventListener("load", () => {
    setTimeout(insert_button, 4000);
});
