const buildShip = document.getElementById("buildShip");
const shipsInGarage = document.getElementsByClassName("shipsInGarage");
const shipsGarageBx = document.getElementsByClassName("shipsGarageBx");
const saveShipButton = document.getElementById("saveShipButton");
const buildGarageOverLap = document.getElementById("buildGarageOverLap");
const saveButtonOverLap = document.getElementById("saveButtonOverLap");
const rotateButtonOverLap = document.getElementById("rotateButtonOverLap");
const rotateShipButton = document.getElementById("rotateShipButton");
const buildBoard = document.getElementById("buildBoard");
// const buildSquare = document.getElementsByClassName("buildSquare");
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

let buildSquare = [];

for (let i = 0; i < 100; i++) {
    shipSquareIndex[i] = false;
    myAreaIndex[i] = 0;

    buildSquare[i] = document.createElement("div");
    buildSquare[i].classList.add("buildSquare");
    buildBoard.appendChild(buildSquare[i]);
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

function shipPlacingWithPx() {
    shipsInGarage[shipPickedIndex].style.left = `${
        shipInGaragePositionX[shipPickedIndex] * 60 + shipOffSetX
    }px`;
    shipsInGarage[shipPickedIndex].style.top = `${
        shipInGaragePositionY[shipPickedIndex] * 60 + shipOffSetY
    }px`;
}

function shipPositionCalc() {
    shipInGaragePosition[shipPickedIndex] =
        shipInGaragePositionY[shipPickedIndex] * 10 +
        shipInGaragePositionX[shipPickedIndex];
}

[...shipsInGarage].forEach((shipInGarage, shipGarageIndex) => {
    shipInGarage.addEventListener("click", shipInGarageClick);

    function shipInGarageClick() {
        movingIndex = true;
        shipPickedIndex = shipGarageIndex;

        rotateIndex = false;

        shipInGarage.style.position = "absolute";
        shipInGarage.style.zIndex = "1000";

        let i = 0;
        for (i; i < 100; i++) {
            if (shipSquareIndex[i] === false) {
                break;
            }
        }

        shipInGaragePosition[shipGarageIndex] = i;
        shipBxinShip[shipGarageIndex] =
            shipInGarage.getElementsByClassName("shipsGarageBx").length;
        console.log(shipBxinShip);

        shipInGaragePositionX[shipGarageIndex] =
            shipInGaragePosition[shipGarageIndex] % 10;
        shipInGaragePositionY[shipGarageIndex] = Math.floor(
            shipInGaragePosition[shipGarageIndex] / 10
        );
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
        rotateButtonOverLap.style.zIndex = "0";
        shipInGarage.removeEventListener("click", shipInGarageClick);
    }
});

document.addEventListener("keydown", ({ keyCode }) => {
    if (movingIndex === true) {
        if (keycodes.UP[keyCode]) {
            if (shipInGaragePositionY[shipPickedIndex] > 0) {
                shipInGaragePositionY[shipPickedIndex]--;
            }
            shipPlacingWithPx();
        }

        if (keycodes.DOWN[keyCode]) {
            if (rotateIndex === false) {
                if (
                    shipInGaragePositionY[shipPickedIndex] <=
                    9 - shipBxinShip[shipPickedIndex]
                ) {
                    shipInGaragePositionY[shipPickedIndex]++;
                }
                shipPlacingWithPx();
            } else {
                if (shipInGaragePositionY[shipPickedIndex] <= 8) {
                    shipInGaragePositionY[shipPickedIndex]++;
                }
                shipPlacingWithPx();
            }
        }

        if (keycodes.LEFT[keyCode]) {
            if (shipInGaragePositionX[shipPickedIndex] > 0) {
                shipInGaragePositionX[shipPickedIndex]--;
            }
            shipPlacingWithPx();
        }

        if (keycodes.RIGHT[keyCode]) {
            if (rotateIndex === false) {
                if (shipInGaragePositionX[shipPickedIndex] < 9) {
                    shipInGaragePositionX[shipPickedIndex]++;
                }
                shipPlacingWithPx();
            } else {
                if (
                    shipInGaragePositionX[shipPickedIndex] <
                    10 - shipBxinShip[shipPickedIndex]
                ) {
                    shipInGaragePositionX[shipPickedIndex]++;
                }
                shipPlacingWithPx();
            }
        }

        shipPositionCalc();

        freeSquareCheck();
    }
});


rotateShipButton.onclick = () => {
        shipPositionCalc();
        shipsInGarage[shipPickedIndex].style.transformOrigin = "30px 30px";
        if (shipBxinShip[shipPickedIndex] % 2 == 0) {
        }
        if (rotateIndex === false) {
            rotateIndex = true;
            shipsInGarage[shipPickedIndex].style.rotate = "-90deg";

            if (shipInGaragePositionX[shipPickedIndex] > 6) {
                shipInGaragePositionX[shipPickedIndex] =
                    10 - shipBxinShip[shipPickedIndex];
            }

        } else {
            rotateIndex = false;
            shipsInGarage[shipPickedIndex].style.rotate = "0deg";

            if (shipInGaragePositionY[shipPickedIndex] > 6) {
                shipInGaragePositionY[shipPickedIndex] =
                    10 - shipBxinShip[shipPickedIndex];
            }
        }
        shipPlacingWithPx();

};


saveShipButton.onclick = () => {
    if (shipFreeSquare === false) {
        saveShipButton.className = "saveShipAnimation";
        setTimeout(() => {
            saveShipButton.classList.remove("saveShipAnimation");
        }, 1000);
    } else {
        shipPositionCalc();

        movingIndex = false;
        let savePosition = shipInGaragePosition[shipPickedIndex];

        if (rotateIndex === false) {
            //save the position
            for (let i = 0; i < shipBxinShip[shipPickedIndex]; i++) {
                myAreaIndex[savePosition] = 1;
                savePosition += 10;
            }
    
    
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
        }
        else {
            //save the position
            for (let i = 0; i < shipBxinShip[shipPickedIndex]; i++) {
                myAreaIndex[savePosition] = 1;
                savePosition ++;
            }

            if (shipInGaragePositionX[shipPickedIndex] == 0) {
                savePosition = shipInGaragePosition[shipPickedIndex] - 10;
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < shipBxinShip[shipPickedIndex]+1; j++) {
                        shipSquareIndex[savePosition] = true;
                        savePosition++;
                    }
                    savePosition += 9-shipBxinShip[shipPickedIndex];
                }
            }
            else if (shipInGaragePositionX[shipPickedIndex] == 10-shipBxinShip[shipPickedIndex]) {
                savePosition = shipInGaragePosition[shipPickedIndex] - 11;
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < shipBxinShip[shipPickedIndex]+1; j++) {
                        shipSquareIndex[savePosition] = true;
                        savePosition++;
                    }
                    savePosition += 9-shipBxinShip[shipPickedIndex];
                }
            }
            else{
                savePosition = shipInGaragePosition[shipPickedIndex] - 11;
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < shipBxinShip[shipPickedIndex]+2; j++) {
                        shipSquareIndex[savePosition] = true;
                        savePosition++;
                    }
                    savePosition += 8-shipBxinShip[shipPickedIndex];
                }
            }
            
        }

        

        for (let i = 0; i < 100; i++) {
            if (shipSquareIndex[i] === true) {
                buildSquare[i].style.backgroundColor = "rgb(209 55 55)";
            }
        }

        saveShipButton.style.backgroundColor = "white";
        buildGarageOverLap.style.zIndex = "0";
        saveButtonOverLap.style.zIndex = "10";
        rotateButtonOverLap.style.zIndex = "10";

        savedShipsCount++;

        if (savedShipsCount == shipsInGarage.length) {
            buildShipContinue.style.display = "block";
        }
    }
};

buildShipContinue.onclick = () => {
    buildShip.style.animation = "slideBuildShip 1s forwards";
    game.style.animation = "slideGame 1s forwards";
};

[...enemySquares].forEach((enemySquare) => {
    enemySquare.onclick = () => {
        enemySquare.style.backgroundColor = "red";
    };
});
