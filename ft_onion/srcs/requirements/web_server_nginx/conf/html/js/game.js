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

pierre.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", event.target.id);
    console.log("dragstart");
});

pierre.addEventListener("dragenter", () => {
    console.log("dragenter");
});

pierre.addEventListener("dragleave", () => {
    console.log("dragleave");
});

pierre.addEventListener("dragover", (e) => {
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.effectAllowed = "move";
    console.log("drag_dragover");
});

pierre.addEventListener("drag", () => {
    console.log("drag");
});

pierre.addEventListener("dragend", () => {
    console.log("dragend");
});




const dropzone = document.querySelector("#dropzone");
const drop_message = document.querySelector("#drop_message");

dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.effectAllowed = "move";
    console.log("drop_dragover");
});

dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    e.dataTransfer.effectAllowed = "move";
    console.log("drop");
    const id = e.dataTransfer.getData("text/plain");
    const svg = document.getElementById(id);
    dropzone.appendChild(svg);
    drop_message.style.display = "none";
});
