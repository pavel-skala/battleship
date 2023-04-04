const playGameMenu = document.getElementById("playGameMenu");
const spinBxs = document.getElementsByClassName("spinBx");
const startTutorial = document.getElementById("startTutorial");


playGameMenu.onmouseenter = () => {
    spinBxs[0].style.display = "block";
};
startTutorial.onmouseenter = () => {
    spinBxs[1].style.display = "block";
};
playGameMenu.onmouseleave = () => {
    spinBxs[0].style.display = "none";
};
startTutorial.onmouseleave = () => {
    spinBxs[1].style.display = "none";
};