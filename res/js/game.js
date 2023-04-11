const buildShip = document.getElementById("buildShip");
const shipsInGarage = document.getElementsByClassName("shipsInGarage");
const shipsGarageBx = document.getElementsByClassName("shipsGarageBx");
const saveShipButton = document.getElementById("saveShipButton");
const buildGarageOverLap = document.getElementById("buildGarageOverLap");
const saveButtonOverLap = document.getElementById("saveButtonOverLap");
const rotateShipButton = document.getElementById("rotateShipButton");
const buildSquare = document.getElementsByClassName("buildSquare");
const buildShipContinue = document.getElementById("buildShipContinue");

const game = document.getElementById("game");
const mySquares = document.getElementsByClassName("mySquare");
const enemySquares = document.getElementsByClassName("enemySquare");

const keycodes = {
    //up
    UP: { 38: 1 },
    //down
    DOWN: { 40: 1 },
    //left
    LEFT: { 37: 1 },
    //right
    RIGHT: { 39: 1 },
};

let shipSquareIndex = [];

let myAreaIndex = [];

let shipOffSetX = 561;
let shipOffSetY = 91;
let shipBxinShip = [];
let shipInGaragePosition = [];
let shipInGaragePositionX = [];
let shipInGaragePositionY = [];
let shipPickedIndex;
let movingIndex = false;
let rotateIndex = false;
let shipFreeSquare = true;
let savedShipsCount = 0;

for (let i = 0; i < 100; i++) {
    shipSquareIndex[i] = false;
    myAreaIndex[i] = 0;
}

function freeSquareCheck() {
    shipFreeSquare = true;
        for (
            let i = shipInGaragePosition[shipPickedIndex];
            i <
            shipInGaragePosition[shipPickedIndex] +
                10 * shipBxinShip[shipPickedIndex];
            i += 10
        ) {
            if (shipSquareIndex[i] === true) {
                shipFreeSquare = false;
            }
        }

        if (shipFreeSquare === false) {
            saveShipButton.style.backgroundColor = "#eb3939";
        } else {
            saveShipButton.style.backgroundColor = "#07d307";
        }
}

[...shipsInGarage].forEach((shipInGarage, shipGarageIndex) => {
    shipInGarage.addEventListener("click", shipInGarageClick);

    function shipInGarageClick() {
        movingIndex = true;
        shipPickedIndex = shipGarageIndex;

        rotateIndex = false
        shipOffSetX = 561;
        shipOffSetY = 91;

        shipInGarage.style.position = "absolute";
        shipInGarage.style.zIndex = "1000";

        let i = 0;
        for (i; i < shipGarageIndex.length; i++) {
            if (shipGarageIndex[i] === false) {
                shipGarageIndex[i] = true;
                break;
            }
        }
        shipInGaragePosition[shipGarageIndex] = i;
        shipBxinShip[shipGarageIndex] =
            shipInGarage.getElementsByClassName("shipsGarageBx").length;
        console.log(shipBxinShip);

        shipInGaragePositionX[shipGarageIndex] = Math.floor(
            shipInGaragePosition[shipGarageIndex] / 10
        );
        shipInGaragePositionY[shipGarageIndex] =
            shipInGaragePosition[shipGarageIndex] % 10;
        shipInGarage.style.left = `${
            shipInGaragePositionX[shipGarageIndex] * 60 + shipOffSetX
        }px`;
        shipInGarage.style.top = `${
            shipInGaragePositionY[shipGarageIndex] * 60 + shipOffSetY
        }px`;

        freeSquareCheck();

        shipInGarage.style.cursor = "default";
        buildGarageOverLap.style.zIndex = "10";
        saveButtonOverLap.style.zIndex = "0";
        shipInGarage.removeEventListener("click", shipInGarageClick);
    }
});

document.addEventListener("keydown", ({ keyCode }) => {
    
    if (movingIndex === true) {
        if (keycodes.UP[keyCode]) {
            if (shipInGaragePositionY[shipPickedIndex] > 0) {
                shipInGaragePositionY[shipPickedIndex]--;
            }
            shipsInGarage[shipPickedIndex].style.left = `${
                shipInGaragePositionX[shipPickedIndex] * 60 + shipOffSetX
            }px`;
            shipsInGarage[shipPickedIndex].style.top = `${
                shipInGaragePositionY[shipPickedIndex] * 60 + shipOffSetY
            }px`;
        }

        if (keycodes.DOWN[keyCode]) {
            if (rotateIndex === false) {
                
            if (
                shipInGaragePositionY[shipPickedIndex] <=
                9 - shipBxinShip[shipPickedIndex]
            ) {
                shipInGaragePositionY[shipPickedIndex]++;
            }
            shipsInGarage[shipPickedIndex].style.left = `${
                shipInGaragePositionX[shipPickedIndex] * 60 + shipOffSetX
            }px`;
            shipsInGarage[shipPickedIndex].style.top = `${
                shipInGaragePositionY[shipPickedIndex] * 60 + shipOffSetY
            }px`;
        }
        else{
            if (
                shipInGaragePositionY[shipPickedIndex] <=
                8
            ) {
                shipInGaragePositionY[shipPickedIndex]++;
            }
            shipsInGarage[shipPickedIndex].style.left = `${
                shipInGaragePositionX[shipPickedIndex] * 60 + shipOffSetX
            }px`;
            shipsInGarage[shipPickedIndex].style.top = `${
                shipInGaragePositionY[shipPickedIndex] * 60 + shipOffSetY
            }px`;
        }
        }

        if (keycodes.LEFT[keyCode]) {
            if (shipInGaragePositionX[shipPickedIndex] > 0) {
                shipInGaragePositionX[shipPickedIndex]--;
            }
            shipsInGarage[shipPickedIndex].style.left = `${
                shipInGaragePositionX[shipPickedIndex] * 60 + shipOffSetX
            }px`;
            shipsInGarage[shipPickedIndex].style.top = `${
                shipInGaragePositionY[shipPickedIndex] * 60 + shipOffSetY
            }px`;
        }

        if (keycodes.RIGHT[keyCode]) {
            if (rotateIndex === false) {
                if (shipInGaragePositionX[shipPickedIndex] < 9) {
                    shipInGaragePositionX[shipPickedIndex]++;
                }
                shipsInGarage[shipPickedIndex].style.left = `${
                    shipInGaragePositionX[shipPickedIndex] * 60 + shipOffSetX
                }px`;
                shipsInGarage[shipPickedIndex].style.top = `${
                    shipInGaragePositionY[shipPickedIndex] * 60 + shipOffSetY
                }px`;
            }
            else{
                if (shipInGaragePositionX[shipPickedIndex] < 10 - shipBxinShip[shipPickedIndex]) {
                    shipInGaragePositionX[shipPickedIndex]++;
                }
                shipsInGarage[shipPickedIndex].style.left = `${
                    shipInGaragePositionX[shipPickedIndex] * 60 + shipOffSetX
                }px`;
                shipsInGarage[shipPickedIndex].style.top = `${
                    shipInGaragePositionY[shipPickedIndex] * 60 + shipOffSetY
                }px`;
            }
            
        }

        shipInGaragePosition[shipPickedIndex] =
            shipInGaragePositionY[shipPickedIndex] * 10 +
            shipInGaragePositionX[shipPickedIndex];

        freeSquareCheck();
    }
    console.log(shipInGaragePosition[shipPickedIndex]);
});


rotateShipButton.onclick = () => {
    shipInGaragePosition[shipPickedIndex] =
            shipInGaragePositionY[shipPickedIndex] * 10 +
            shipInGaragePositionX[shipPickedIndex];
    if (shipBxinShip[shipPickedIndex]%2 == 0) {
        shipsInGarage[shipPickedIndex].style.transformOrigin = "left";
    }
    if (rotateIndex === false) {
        rotateIndex = true;
        shipsInGarage[shipPickedIndex].style.rotate = "-90deg";
        shipOffSetX = 681;
        shipOffSetY = 31;
        console.log(shipInGaragePosition[shipPickedIndex]);
    }
    else {
        rotateIndex = false;
        shipsInGarage[shipPickedIndex].style.rotate = "0deg";
        shipOffSetX = 561;
        shipOffSetY = 91;
    }
}

saveShipButton.onclick = () => {
    if (shipFreeSquare === false) {
        saveShipButton.className = "saveShipAnimation";
        setTimeout(() => {
            saveShipButton.classList.remove("saveShipAnimation");
        }, 1000);
    } else {
        shipInGaragePosition[shipPickedIndex] =
            shipInGaragePositionY[shipPickedIndex] * 10 +
            shipInGaragePositionX[shipPickedIndex];

        //save the position
        let savePosition = shipInGaragePosition[shipPickedIndex];

        for (let i = 0; i < shipBxinShip[shipPickedIndex]; i++) {
            myAreaIndex[savePosition] = 1;
            savePosition += 10;
        }

        movingIndex = false;

        if (shipInGaragePositionX[shipPickedIndex] == 0) {
            savePosition = shipInGaragePosition[shipPickedIndex] - 10;
            for (let i = 0; i < shipBxinShip[shipPickedIndex] + 2; i++) {
                for (let j = 0; j < 2; j++) {
                    shipSquareIndex[savePosition] = true;
                    savePosition++;
                }
                savePosition += 8;
            }
        } else if (shipInGaragePositionX[shipPickedIndex] == 9) {
            savePosition = shipInGaragePosition[shipPickedIndex] - 11;
            for (let i = 0; i < shipBxinShip[shipPickedIndex] + 2; i++) {
                for (let j = 0; j < 2; j++) {
                    shipSquareIndex[savePosition] = true;
                    savePosition++;
                }
                savePosition += 8;
            }
        } else {
            savePosition = shipInGaragePosition[shipPickedIndex] - 11;
            for (let i = 0; i < shipBxinShip[shipPickedIndex] + 2; i++) {
                for (let j = 0; j < 3; j++) {
                    shipSquareIndex[savePosition] = true;
                    savePosition++;
                }
                savePosition += 7;
            }
        }

        for (let i = 0; i < 100; i++) {
            if (shipSquareIndex[i] === true) {
                buildSquare[i].style.backgroundColor = "rgb(209 55 55)";
            }
        }

        saveShipButton.style.backgroundColor = "white";
        buildGarageOverLap.style.zIndex = "0";
        savedShipsCount ++;
        saveButtonOverLap.style.zIndex = "10";

        if (savedShipsCount == shipsInGarage.length){
            buildShipContinue.style.display = "block";
        }
    }
};


buildShipContinue.onclick = () => {
    buildShip.style.animation = "slideBuildShip 1s forwards";
    game.style.animation = "slideGame 1s forwards";
}


[...enemySquares].forEach((enemySquare) => {
    enemySquare.onclick = () => {
        enemySquare.style.backgroundColor = "red";
    };
});
