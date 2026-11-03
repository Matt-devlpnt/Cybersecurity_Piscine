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



function insert_button() {
    img_roll = document.querySelector('#gameImage');

    const address = document.createElement("a");
    address.href = "game.html";
    img_roll.after(address);

    const button = document.createElement('button');
    button.textContent = 'Let\'s GO';
    button.classList.add('button_play');

    address.appendChild(button);
}



window.addEventListener("load", () => {
    setTimeout(typeWriter, 1000);

    setTimeout(image_roll, 3500);

    setTimeout(insert_button, 4000);
});
