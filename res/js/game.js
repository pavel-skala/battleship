const nicknameSection = document.getElementById("nicknameSection");
const enterNickname = document.getElementById("enterNickname");
const submitNicknameBtn = document.getElementById("submitNicknameBtn");
const nicknameCondition = document.getElementById("nicknameCondition");

const buildShip = document.getElementById("buildShip");
const shipsInGarage = document.getElementsByClassName("shipsInGarage");
const shipsGarageBx = document.getElementsByClassName("shipsGarageBx");
const buildGarageOverLap = document.getElementById("buildGarageOverLap");
const buildBoard = document.getElementById("buildBoard");

const arrowUp = document.getElementById("arrowUp");
const arrowLeft = document.getElementById("arrowLeft");
const arrowRight = document.getElementById("arrowRight");
const arrowDown = document.getElementById("arrowDown");

const saveShipButton = document.getElementById("saveShipButton");
const saveButtonOverLap = document.getElementById("saveButtonOverLap");

const rotateShipButton = document.getElementById("rotateShipButton");
const rotateButtonOverLap = document.getElementById("rotateButtonOverLap");

const buildShipContinue = document.getElementById("buildShipContinue");

const game = document.getElementById("game");
const playersTurnArrow = document.getElementById("playersTurnArrow");
const myIconName = document.getElementById("myIconName");

const myBoard = document.getElementById("myBoard");
const myBoardTitle = document.getElementById("myBoardTitle");
const enemyBoard = document.getElementById("enemyBoard");
const myShips = document.getElementsByClassName("myShips");

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

const shipLenght = [4, 3, 2, 2, 1];

let userNickname;

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
let rotateIndex = [];
let shipFreeSquare = true;
let savedShipsCount = 0;

let buildSquare = [];
let mySquares = [];
let enemySquares = [];

let enemySquareFree = [];
let enemyShipAround = [];

for (let i = 0; i < 100; i++) {
    shipSquareIndex[i] = false;
    myAreaIndex[i] = 0;

    //creating squares
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

    enemySquareFree[i] = true;
    enemyShipAround[i] = false;
}

//nickname section
submitNicknameBtn.onclick = () => {
    userNickname = enterNickname.value;
    if (userNickname.length > 2) {
        buildShip.style.scale = "1";
        buildShip.style.top = "0";
        nicknameSection.style.scale = "20";
        nicknameSection.style.opacity = "0";

        setTimeout(() => {
            nicknameSection.style.display = "none";
        }, 3000);
    } else if (userNickname.length == 0) {
        nicknameCondition.innerHTML = "Please enter a nickname";
        enterNickname.style.marginTop = "0";
    } else {
        nicknameCondition.innerHTML =
            "Nickname must have at least three characters";
        enterNickname.style.marginTop = "0";
    }
};

//checking if square is free
function freeSquareCheck() {
    shipFreeSquare = true;
    if (rotateIndex[shipPickedIndex] === false) {
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
    } else {
        for (
            let i = shipInGaragePosition[shipPickedIndex];
            i <
            shipInGaragePosition[shipPickedIndex] +
                shipBxinShip[shipPickedIndex];
            i++
        ) {
            if (shipSquareIndex[i] === true) {
                shipFreeSquare = false;
            }
        }
    }

    if (shipFreeSquare === false) {
        saveShipButton.style.backgroundColor = "#eb3939";
    } else {
        saveShipButton.style.backgroundColor = "#07d307";
    }
}

//placing ships
function shipPlacingWithPx() {
    shipsInGarage[shipPickedIndex].style.left = `${
        shipInGaragePositionX[shipPickedIndex] * 60 + shipOffSetX
    }px`;
    shipsInGarage[shipPickedIndex].style.top = `${
        shipInGaragePositionY[shipPickedIndex] * 60 + shipOffSetY
    }px`;
}

//position calculation
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

        rotateIndex[shipPickedIndex] = false;

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

//move up
function goUpFunction() {
    if (shipInGaragePositionY[shipPickedIndex] > 0) {
        shipInGaragePositionY[shipPickedIndex]--;
    }
    shipPlacingWithPx();
}

//move down
function goDownFunction() {
    if (rotateIndex[shipPickedIndex] === false) {
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

//move left
function goLeftFunction() {
    if (shipInGaragePositionX[shipPickedIndex] > 0) {
        shipInGaragePositionX[shipPickedIndex]--;
    }
    shipPlacingWithPx();
}

//move right
function goRightFunction() {
    if (rotateIndex[shipPickedIndex] === false) {
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

//pressing arrow keys
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

//arrow  clicking
arrowUp.onclick = () => {
    if (movingIndex === true) {
        goUpFunction();

        shipPositionCalc();

        freeSquareCheck();
    }
};
arrowDown.onclick = () => {
    if (movingIndex === true) {
        goDownFunction();

        shipPositionCalc();

        freeSquareCheck();
    }
};
arrowLeft.onclick = () => {
    if (movingIndex === true) {
        goLeftFunction();

        shipPositionCalc();

        freeSquareCheck();
    }
};
arrowRight.onclick = () => {
    if (movingIndex === true) {
        goRightFunction();

        shipPositionCalc();

        freeSquareCheck();
    }
};

//rotate button clicking
rotateShipButton.onclick = () => {
    shipPositionCalc();
    shipsInGarage[shipPickedIndex].style.transformOrigin = "30px 30px";
    if (shipBxinShip[shipPickedIndex] % 2 == 0) {
    }
    if (rotateIndex[shipPickedIndex] === false) {
        rotateIndex[shipPickedIndex] = true;
        shipsInGarage[shipPickedIndex].style.rotate = "-90deg";

        if (shipInGaragePositionX[shipPickedIndex] > 6) {
            shipInGaragePositionX[shipPickedIndex] =
                10 - shipBxinShip[shipPickedIndex];
        }
    } else {
        rotateIndex[shipPickedIndex] = false;
        shipsInGarage[shipPickedIndex].style.rotate = "0deg";

        if (shipInGaragePositionY[shipPickedIndex] > 6) {
            shipInGaragePositionY[shipPickedIndex] =
                10 - shipBxinShip[shipPickedIndex];
        }
    }
    shipPlacingWithPx();

    freeSquareCheck();
};

//save button clicking
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

        if (rotateIndex[shipPickedIndex] === false) {
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
        } else {
            //save the position
            for (let i = 0; i < shipBxinShip[shipPickedIndex]; i++) {
                myAreaIndex[savePosition] = 1;
                savePosition++;
            }

            if (shipInGaragePositionX[shipPickedIndex] == 0) {
                savePosition = shipInGaragePosition[shipPickedIndex] - 10;
                for (let i = 0; i < 3; i++) {
                    for (
                        let j = 0;
                        j < shipBxinShip[shipPickedIndex] + 1;
                        j++
                    ) {
                        shipSquareIndex[savePosition] = true;
                        savePosition++;
                    }
                    savePosition += 9 - shipBxinShip[shipPickedIndex];
                }
            } else if (
                shipInGaragePositionX[shipPickedIndex] ==
                10 - shipBxinShip[shipPickedIndex]
            ) {
                savePosition = shipInGaragePosition[shipPickedIndex] - 11;
                for (let i = 0; i < 3; i++) {
                    for (
                        let j = 0;
                        j < shipBxinShip[shipPickedIndex] + 1;
                        j++
                    ) {
                        shipSquareIndex[savePosition] = true;
                        savePosition++;
                    }
                    savePosition += 9 - shipBxinShip[shipPickedIndex];
                }
            } else {
                savePosition = shipInGaragePosition[shipPickedIndex] - 11;
                for (let i = 0; i < 3; i++) {
                    for (
                        let j = 0;
                        j < shipBxinShip[shipPickedIndex] + 2;
                        j++
                    ) {
                        shipSquareIndex[savePosition] = true;
                        savePosition++;
                    }
                    savePosition += 8 - shipBxinShip[shipPickedIndex];
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

//continue button clicking
buildShipContinue.onclick = () => {
    buildShip.style.scale = "20";
    buildShip.style.top = "-50%";
    buildShip.style.opacity = "0";
    buildShip.style.transition = "2s scale, 2s top, 2s opacity";
    game.style.scale = "1";
    game.style.top = "0";

    myBoardTitle.innerText = `${userNickname}'s Board`;
    myIconName.innerText = `${userNickname}`;

    //place my ships on my area
    shipOffSetX = 211;
    shipOffSetY = 271;

    for (let i = 0; i < shipsInGarage.length; i++) {
        myShips[i].style.left = `${
            shipInGaragePositionX[i] * 60 + shipOffSetX
        }px`;
        myShips[i].style.top = `${
            shipInGaragePositionY[i] * 60 + shipOffSetY
        }px`;

        if (rotateIndex[i] === true) {
            myShips[i].style.rotate = "-90deg";
        }
    }
};

//gameplay
let enemySquareIndex;

let enemyShips = [];
let enemyShipRotate = [];
let enemyShipPosition = [];
let enemyShipPositionX = [];
let enemyShipPositionY = [];
let enemyShipPlaceCycle;

for (let i = 0; i < 5; i++) {
    enemyShipRotate[i] = Math.floor(Math.random() * 2);
    //not rotated
    if (enemyShipRotate[i] === 0) {
        do {
            enemyShipPlaceCycle = false;

            enemyShipPositionX[i] = Math.floor(Math.random() * 10);
            enemyShipPositionY[i] = Math.floor(
                Math.random() * (10 - shipLenght[i] + 1)
            );
            enemyShipPosition[i] =
                enemyShipPositionY[i] * 10 + enemyShipPositionX[i];

            let savePosition = enemyShipPosition[i];

            let enemySquareFreeCheck = false;
            for (
                let j = enemyShipPosition[i];
                j < enemyShipPosition[i] + shipLenght[i] * 10;
                j += 10
            ) {
                if (enemyShipAround[j] === true) {
                    enemySquareFreeCheck = true;
                }
            }
            if (enemySquareFreeCheck === false) {
                for (
                    let j = enemyShipPosition[i];
                    j < enemyShipPosition[i] + shipLenght[i] * 10;
                    j += 10
                ) {
                    enemySquareFree[j] = false;
                    // enemySquares[j].style.backgroundColor = "blue";
                }
                if (enemyShipPositionX[i] == 0) {
                    savePosition = enemyShipPosition[i] - 10;
                    for (let k = 0; k < shipLenght[i] + 2; k++) {
                        for (let j = 0; j < 2; j++) {
                            enemyShipAround[savePosition] = true;
                            savePosition++;
                        }
                        savePosition += 8;
                    }
                } else if (enemyShipPositionX[i] == 9) {
                    savePosition = enemyShipPosition[i] - 11;
                    for (let k = 0; k < shipLenght[i] + 2; k++) {
                        for (let j = 0; j < 2; j++) {
                            enemyShipAround[savePosition] = true;
                            savePosition++;
                        }
                        savePosition += 8;
                    }
                } else {
                    savePosition = enemyShipPosition[i] - 11;
                    for (let k = 0; k < shipLenght[i] + 2; k++) {
                        for (let j = 0; j < 3; j++) {
                            enemyShipAround[savePosition] = true;
                            savePosition++;
                        }
                        savePosition += 7;
                    }
                }

                enemyShipPlaceCycle = true;
            }
        } while (!enemyShipPlaceCycle);
    }
    //rotated
    else {
        do {
            enemyShipPlaceCycle = false;

            enemyShipPositionX[i] = Math.floor(
                Math.random() * (10 - shipLenght[i] + 1)
            );
            enemyShipPositionY[i] = Math.floor(Math.random() * 10);
            enemyShipPosition[i] =
                enemyShipPositionY[i] * 10 + enemyShipPositionX[i];

            let savePosition = enemyShipPosition[i];

            let enemySquareFreeCheck = false;
            for (
                let j = enemyShipPosition[i];
                j < enemyShipPosition[i] + shipLenght[i];
                j++
            ) {
                if (enemyShipAround[j] === true) {
                    enemySquareFreeCheck = true;
                }
            }
            if (enemySquareFreeCheck === false) {
                for (
                    let j = enemyShipPosition[i];
                    j < enemyShipPosition[i] + shipLenght[i];
                    j++
                ){
                    enemySquareFree[j] = false;
                }

            if (enemyShipPositionX[i] == 0) {
                savePosition = enemyShipPosition[i] - 10;
                for (let k = 0; k < 3; k++) {
                    for (let j = 0; j < shipLenght[i] + 1; j++) {
                        enemyShipAround[savePosition] = true;
                        savePosition++;
                    }
                    savePosition += 9 - shipLenght[i];
                }
            } 
            else if (enemyShipPositionX[i] == 10 - shipLenght[i]) {
                savePosition = enemyShipPosition[i] - 11;
                for (let k = 0; k < 3; k++) {
                    for (let j = 0; j < shipLenght[i] + 1; j++) {
                        enemyShipAround[savePosition] = true;
                        savePosition++;
                    }
                    savePosition += 9 - shipLenght[i];
                }
            } 
            else {
                savePosition = enemyShipPosition[i] - 11;
                for (let k = 0; k < 3; k++) {
                    for (let j = 0; j < shipLenght[i] + 2; j++) {
                        enemyShipAround[savePosition] = true;
                        savePosition++;
                    }
                    savePosition += 8 - shipLenght[i];
                }
            }
            enemyShipPlaceCycle = true;
        }

        } while (!enemyShipPlaceCycle);
    }
    for (let e = 0; e < 100; e++) {
        if (enemyShipAround[e] == true) {
            enemySquares[e].style.backgroundColor = "pink";
        }
        if (enemySquareFree[e] == false) {
            enemySquares[e].style.backgroundColor = "blue";
        }
    }
}

[...enemySquares].forEach((enemySquare, enemySquareIndex) => {
    enemySquare.addEventListener("click", myAttack);
    // enemySquare.addEventListener("click") = () => {

    // }
    function myAttack() {
        console.log(enemySquareIndex);
        enemySquares[enemySquareIndex].style.backgroundColor = "red";
        playersTurnArrow.style.transform = "rotate(90deg)";
    }
});
