const text = "Un duel. Trois choix. Une seule victoire.\nPrêt à défier le hasard et à montrer qui est le véritable champion ?\nChoisis ton arme et que le meilleur gagne !";
const element = document.querySelector("#text");

let index = 0;

function typeWriter() {
    if (index < text.length) {
        element.textContent += text[index];
        index++;

        setTimeout(typeWriter, 40);
    }
}

window.addEventListener("load", () => {
    const title = document.querySelector(".highlight");
    setTimeout(() => {title.classList.add("active");}, 1000);
});

// Attendre le chargement complet de la page
window.addEventListener("load", () => {
    setTimeout(typeWriter, 2000);
});

window.addEventListener("load", () => {

    const image = document.querySelector("#gameImage");

    const images = [
        "/images/pierre.svg",
        "/images/feuille.svg",
        "/images/ciseaux.svg"
    ];

    let index = 0;

    setInterval(() => {

        // Faire disparaître l'image
        image.style.opacity = 0;

        setTimeout(() => {

            // Passer à l'image suivante
            index = (index + 1) % images.length;

            // Modifier la source
            image.src = images[index];

            // Faire réapparaître l'image
            image.style.opacity = 1;

        }, 400);

    }, 400);

});
