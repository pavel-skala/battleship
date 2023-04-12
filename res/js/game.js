const buildShip = document.getElementById("buildShip");
const shipsInGarage = document.getElementsByClassName("shipsInGarage");
const shipsGarageBx = document.getElementsByClassName("shipsGarageBx");
const saveShipButton = document.getElementById("saveShipButton");

const arrowUp = document.getElementById("arrowUp");
const arrowLeft = document.getElementById("arrowLeft");
const arrowRight = document.getElementById("arrowRight");
const arrowDown = document.getElementById("arrowDown");

const buildGarageOverLap = document.getElementById("buildGarageOverLap");
const saveButtonOverLap = document.getElementById("saveButtonOverLap");
const rotateButtonOverLap = document.getElementById("rotateButtonOverLap");
const rotateShipButton = document.getElementById("rotateShipButton");
const buildBoard = document.getElementById("buildBoard");
const buildShipContinue = document.getElementById("buildShipContinue");

const game = document.getElementById("game");
const myBoard = document.getElementById("myBoard");
const enemyBoard = document.getElementById("enemyBoard");

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
let mySquares = [];
let enemySquares = [];

for (let i = 0; i < 100; i++) {
    shipSquareIndex[i] = false;
    myAreaIndex[i] = 0;

    //placing ships
    buildSquare[i] = document.createElement("div");
    buildSquare[i].classList.add("buildSquare");
    buildBoard.appendChild(buildSquare[i]);

    //my area
    mySquares[i] = document.createElement("div");
    mySquares[i].classList.add("mySquare");
    myBoard.appendChild(mySquares[i]);

    //enemy area
    enemySquares[i] = document.createElement("div");
    enemySquares[i].classList.add("enemySquare");
    enemyBoard.appendChild(enemySquares[i]);
}

function freeSquareCheck() {
    shipFreeSquare = true;
    if (rotateIndex === false) {
        
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
    }
    else {
        for (let i = shipInGaragePosition[shipPickedIndex]; i < shipInGaragePosition[shipPickedIndex] + shipBxinShip[shipPickedIndex]; i++) {
            if (shipSquareIndex[i] === true) {
                shipFreeSquare = false
            }
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

function goUpFunction() {
    if (shipInGaragePositionY[shipPickedIndex] > 0) {
        shipInGaragePositionY[shipPickedIndex]--;
    }
    shipPlacingWithPx();
}

function goDownFunction() {
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

function goLeftFunction() {
    if (shipInGaragePositionX[shipPickedIndex] > 0) {
        shipInGaragePositionX[shipPickedIndex]--;
    }
    shipPlacingWithPx();
}

function goRightFunction() {
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


document.addEventListener("keydown", ({ keyCode }) => {
    if (movingIndex === true) {
        if (keycodes.UP[keyCode]) {
            goUpFunction();
        }

        if (keycodes.DOWN[keyCode]) {
            goDownFunction();
        }

        if (keycodes.LEFT[keyCode]) {
            goLeftFunction();
        }

        if (keycodes.RIGHT[keyCode]) {
            goRightFunction();
        }

        shipPositionCalc();

        freeSquareCheck();
    }
});

arrowUp.onclick = () => {
    if (movingIndex === true) {
        goUpFunction();

        shipPositionCalc();

        freeSquareCheck();
    }
}

arrowDown.onclick = () => {
    if (movingIndex === true) {
        goDownFunction();

        shipPositionCalc();

        freeSquareCheck();
    }
}

arrowLeft.onclick = () => {
    if (movingIndex === true) {
        goLeftFunction();

        shipPositionCalc();

        freeSquareCheck();
    }
}

arrowRight.onclick = () => {
    if (movingIndex === true) {
        goRightFunction();

        shipPositionCalc();

        freeSquareCheck();
    }
}

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

        freeSquareCheck();
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


    // for (let i = 0; i < 100; i++) {
    //     if (myAreaIndex[i] == 1) {
    //         mySquares[i].style.backgroundColor = "blue";
    //     }
    // }
};

[...enemySquares].forEach((enemySquare) => {
    enemySquare.onclick = () => {
        enemySquare.style.backgroundColor = "red";
    };
});
