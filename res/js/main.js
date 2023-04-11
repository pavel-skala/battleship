const playGameMenu = document.getElementById("playGameMenu");
const spinBxs = document.getElementsByClassName("spinBx");
const startTutorial = document.getElementById("startTutorial");




let scale = [1, 1];
let InInterval;
let OutInterval;

playGameMenu.onmouseenter = () => {
    InInterval = setInterval(() => {
        scale[0] += 0.01;
        playGameMenu.style.transform = `scale(${scale[0]})`;
    }, 50);
};

playGameMenu.onmouseleave = () => {
    clearInterval(InInterval);
    OutInterval = setInterval(() => {
        scale[0] -= 0.01;
        playGameMenu.style.transform = `scale(${scale[0]})`;

        if (scale[0] <= 1) {
            clearInterval(OutInterval);
        }
    },10);
};

startTutorial.onmouseenter = () => {
    InInterval = setInterval(() => {
        scale[1] += 0.01;
        startTutorial.style.transform = `scale(${scale[1]})`;
    }, 50);
};

startTutorial.onmouseleave = () => {
    clearInterval(InInterval);
    OutInterval = setInterval(() => {
        scale[1] -= 0.01;
        startTutorial.style.transform = `scale(${scale[1]})`;

        if (scale[1] <= 1) {
            clearInterval(OutInterval);
            console.log("ahoj");
        }
    },10);
};