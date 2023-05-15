const arrowLeft = document.getElementById("arrowLeft");
const arrowRight = document.getElementById("arrowRight");
const imageArea = document.getElementById("imageArea");
const image = document.getElementsByClassName("image");
const description = document.getElementsByClassName("description");

let currentImage = 0;

arrowRight.onclick = () => {
    currentImage++;
    if (currentImage > 3) {
        window.location.href = "./index.html";
    } else {
        imageArea.style.backgroundImage = `url(../res/img/tutorial${currentImage}.png)`;
        description[currentImage].style.display = "block";
        description[currentImage - 1].style.display = "none";
    }
};

arrowLeft.onclick = () => {
    currentImage--;
    if (currentImage < 0) {
        window.location.href = "./index.html";
    } else {
        imageArea.style.backgroundImage = `url(../res/img/tutorial${currentImage}.png)`;
        description[currentImage].style.display = "block";
        description[currentImage + 1].style.display = "none";
    }
};
