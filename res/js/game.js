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
const myShipsBx = document.getElementsByClassName("myShipsBx");
const enemyShips = document.getElementsByClassName("enemyShips");

const myBullet = document.getElementById("myBullet");
const enemyBullet = document.getElementById("enemyBullet");
const myExplosion = document.getElementById("myExplosion");
const enemyExplosion = document.getElementById("enemyExplosion");

const endSection = document.getElementById("endSection");
const winnerInfo = document.getElementById("winnerInfo");
const scorePlayerName = document.getElementById("scorePlayerName");
const myScore = document.getElementById("myScore");
const enemyScore = document.getElementById("enemyScore");
const playAgainButton = document.getElementById("playAgainButton");

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

const shipLenght = [4, 3, 3, 2, 2];

let userNickname;

let shipSquareIndex = [];

let myAreaIndex = [];

let shipOffSetX = 561;
let shipOffSetY = 91;

let enemyShipOffSetX = 1011;
let enemyShipOffSetY = 271;

let myShipPosition = [];
let myShipPositionX = [];
let myShipPositionY = [];
let shipPickedIndex;
let movingIndex = false;
let rotateIndex = [];
let shipFreeSquare = true;
let savedShipsCount = 0;

let myShipsFullPos = [[], [], [], [], []];

let buildSquare = [];
let mySquares = [];
let enemySquares = [];

let enemySquareFree = [];
let enemyShipAround = [];
let enemyAreaIndex = [];
let enemySquareClicked = [];

let mySquaresCanBeHit = [];

let totalScore = [0, 0];

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
    enemyAreaIndex[i] = 0;
    enemySquareClicked[i] = false;

    mySquaresCanBeHit[i] = true;
}

let myShipBxCount = 0;

let shipBgOffset = [40.8, 32.5, 32.5, 36, 36];
for (let i = 0; i < shipLenght.length; i++) {
    for (let j = 0; j < shipLenght[i]; j++) {
        myShipsBx[myShipBxCount].style.backgroundPosition = `center ${
            j * -60
        }px`;
        myShipsBx[
            myShipBxCount
        ].style.backgroundImage = `url(./res/img/shipFire${i}.png)`;
        myShipsBx[myShipBxCount].style.backgroundSize = `${shipBgOffset[i]}px`;
        myShipBxCount++;
    }
}

//nickname section
submitNicknameBtn.onclick = () => {
    userNickname = enterNickname.value;
    if (userNickname.length > 2) {
        buildShip.style.display = "flex";

        localStorage.setItem("userNickname", userNickname);
        setTimeout(() => {
            buildShip.style.scale = "1";
            buildShip.style.top = "0";
            nicknameSection.style.scale = "20";
            nicknameSection.style.opacity = "0";
        }, 100);

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
    shipPositionCalc();
    shipFreeSquare = true;
    if (rotateIndex[shipPickedIndex] === false) {
        for (
            let i = myShipPosition[shipPickedIndex];
            i <
            myShipPosition[shipPickedIndex] + 10 * shipLenght[shipPickedIndex];
            i += 10
        ) {
            if (shipSquareIndex[i] === true) {
                shipFreeSquare = false;
            }
        }
    } else {
        for (
            let i = myShipPosition[shipPickedIndex];
            i < myShipPosition[shipPickedIndex] + shipLenght[shipPickedIndex];
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
        myShipPositionX[shipPickedIndex] * 60 + shipOffSetX
    }px`;
    shipsInGarage[shipPickedIndex].style.top = `${
        myShipPositionY[shipPickedIndex] * 60 + shipOffSetY
    }px`;
}

//position calculation
function shipPositionCalc() {
    myShipPosition[shipPickedIndex] =
        myShipPositionY[shipPickedIndex] * 10 +
        myShipPositionX[shipPickedIndex];
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

        myShipPosition[shipGarageIndex] = i;

        myShipPositionX[shipGarageIndex] = myShipPosition[shipGarageIndex] % 10;
        myShipPositionY[shipGarageIndex] = Math.floor(
            myShipPosition[shipGarageIndex] / 10
        );
        shipInGarage.style.left = `${
            myShipPositionX[shipGarageIndex] * 60 + shipOffSetX
        }px`;
        shipInGarage.style.top = `${
            myShipPositionY[shipGarageIndex] * 60 + shipOffSetY
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
    if (myShipPositionY[shipPickedIndex] > 0) {
        myShipPositionY[shipPickedIndex]--;
    }
    shipPlacingWithPx();
}

//move down
function goDownFunction() {
    if (rotateIndex[shipPickedIndex] === false) {
        if (
            myShipPositionY[shipPickedIndex] <=
            9 - shipLenght[shipPickedIndex]
        ) {
            myShipPositionY[shipPickedIndex]++;
        }
        shipPlacingWithPx();
    } else {
        if (myShipPositionY[shipPickedIndex] <= 8) {
            myShipPositionY[shipPickedIndex]++;
        }
        shipPlacingWithPx();
    }
}

//move left
function goLeftFunction() {
    if (myShipPositionX[shipPickedIndex] > 0) {
        myShipPositionX[shipPickedIndex]--;
    }
    shipPlacingWithPx();
}

//move right
function goRightFunction() {
    if (rotateIndex[shipPickedIndex] === false) {
        if (myShipPositionX[shipPickedIndex] < 9) {
            myShipPositionX[shipPickedIndex]++;
        }
        shipPlacingWithPx();
    } else {
        if (
            myShipPositionX[shipPickedIndex] <
            10 - shipLenght[shipPickedIndex]
        ) {
            myShipPositionX[shipPickedIndex]++;
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

        freeSquareCheck();
    }
});

//arrow  clicking
arrowUp.onclick = () => {
    if (movingIndex === true) {
        goUpFunction();

        freeSquareCheck();
    }
};
arrowDown.onclick = () => {
    if (movingIndex === true) {
        goDownFunction();

        freeSquareCheck();
    }
};
arrowLeft.onclick = () => {
    if (movingIndex === true) {
        goLeftFunction();

        freeSquareCheck();
    }
};
arrowRight.onclick = () => {
    if (movingIndex === true) {
        goRightFunction();

        freeSquareCheck();
    }
};

//rotate button clicking
rotateShipButton.onclick = () => {
    shipPositionCalc();

    if (shipLenght[shipPickedIndex] == 4) {
        shipsInGarage[shipPickedIndex].style.transformOrigin = "120px 120px";
    } else if (shipLenght[shipPickedIndex] == 3) {
        shipsInGarage[shipPickedIndex].style.transformOrigin = "90px 90px";
    } else {
        shipsInGarage[shipPickedIndex].style.transformOrigin = "60px 60px";
    }
    if (rotateIndex[shipPickedIndex] === false) {
        rotateIndex[shipPickedIndex] = true;
        shipsInGarage[shipPickedIndex].style.transform = "rotate(90deg)";

        if (myShipPositionX[shipPickedIndex] > 6) {
            myShipPositionX[shipPickedIndex] = 10 - shipLenght[shipPickedIndex];
        }
    } else {
        rotateIndex[shipPickedIndex] = false;
        shipsInGarage[shipPickedIndex].style.transform = "rotate(0deg)";

        if (myShipPositionY[shipPickedIndex] > 6) {
            myShipPositionY[shipPickedIndex] = 10 - shipLenght[shipPickedIndex];
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
        let savePosition = myShipPosition[shipPickedIndex];

        if (rotateIndex[shipPickedIndex] === false) {
            //save the position
            for (let i = 0; i < shipLenght[shipPickedIndex]; i++) {
                myAreaIndex[savePosition] = 1;
                myShipsFullPos[shipPickedIndex][i] = savePosition;
                savePosition += 10;
            }

            if (myShipPositionX[shipPickedIndex] == 0) {
                savePosition = myShipPosition[shipPickedIndex] - 10;
                for (let i = 0; i < shipLenght[shipPickedIndex] + 2; i++) {
                    for (let j = 0; j < 2; j++) {
                        shipSquareIndex[savePosition] = true;
                        savePosition++;
                    }
                    savePosition += 8;
                }
            } else if (myShipPositionX[shipPickedIndex] == 9) {
                savePosition = myShipPosition[shipPickedIndex] - 11;
                for (let i = 0; i < shipLenght[shipPickedIndex] + 2; i++) {
                    for (let j = 0; j < 2; j++) {
                        shipSquareIndex[savePosition] = true;
                        savePosition++;
                    }
                    savePosition += 8;
                }
            } else {
                savePosition = myShipPosition[shipPickedIndex] - 11;
                for (let i = 0; i < shipLenght[shipPickedIndex] + 2; i++) {
                    for (let j = 0; j < 3; j++) {
                        shipSquareIndex[savePosition] = true;
                        savePosition++;
                    }
                    savePosition += 7;
                }
            }
        } else {
            //save the position
            for (let i = 0; i < shipLenght[shipPickedIndex]; i++) {
                myAreaIndex[savePosition] = 1;
                myShipsFullPos[shipPickedIndex][i] = savePosition;
                savePosition++;
            }

            if (myShipPositionX[shipPickedIndex] == 0) {
                savePosition = myShipPosition[shipPickedIndex] - 10;
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < shipLenght[shipPickedIndex] + 1; j++) {
                        shipSquareIndex[savePosition] = true;
                        savePosition++;
                    }
                    savePosition += 9 - shipLenght[shipPickedIndex];
                }
            } else if (
                myShipPositionX[shipPickedIndex] ==
                10 - shipLenght[shipPickedIndex]
            ) {
                savePosition = myShipPosition[shipPickedIndex] - 11;
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < shipLenght[shipPickedIndex] + 1; j++) {
                        shipSquareIndex[savePosition] = true;
                        savePosition++;
                    }
                    savePosition += 9 - shipLenght[shipPickedIndex];
                }
            } else {
                savePosition = myShipPosition[shipPickedIndex] - 11;
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < shipLenght[shipPickedIndex] + 2; j++) {
                        shipSquareIndex[savePosition] = true;
                        savePosition++;
                    }
                    savePosition += 8 - shipLenght[shipPickedIndex];
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
    game.style.display = "flex";

    setTimeout(() => {
        buildShip.style.scale = "20";
        buildShip.style.top = "-50%";
        buildShip.style.opacity = "0";
        buildShip.style.transition = "2s scale, 2s top, 2s opacity";
        game.style.scale = "1";
        game.style.top = "0";
    }, 100);

    myIconName.innerText = `${userNickname}`;

    //place my ships on my area
    shipOffSetX = 211;
    shipOffSetY = 271;

    for (let i = 0; i < shipsInGarage.length; i++) {
        myShips[i].style.left = `${myShipPositionX[i] * 60 + shipOffSetX}px`;
        myShips[i].style.top = `${myShipPositionY[i] * 60 + shipOffSetY}px`;

        if (rotateIndex[i] === true) {
            myShips[i].style.transform = "rotate(90deg)";
            if (shipLenght[i] == 4) {
                myShips[i].style.transformOrigin = "120px 120px";
            } else if (shipLenght[i] == 3) {
                myShips[i].style.transformOrigin = "90px 90px";
            } else {
                myShips[i].style.transformOrigin = "60px 60px";
            }
        }
    }
};

//gameplay
let enemySquareHit;

let enemyShipRotate = [];
let enemyShipPosition = [];
let enemyShipPositionX = [];
let enemyShipPositionY = [];
let enemyShipPlaceCycle;

let enemyShipFullPos = [[], [], [], [], []];

let enemySunkIndex = [false, false, false, false, false];
let enemyWaterAround = [];

let playerTurn = 0;
let mySunkCount = 0;



//placing enemyShips
for (let i = 0; i < 5; i++) {
    enemyShipRotate[i] = Math.floor(Math.random() * 2);

    let savePosition;

    //not rotated
    if (enemyShipRotate[i] == 0) {
        do {
            enemyShipPlaceCycle = false;

            enemyShipPositionX[i] = Math.floor(Math.random() * 10);
            enemyShipPositionY[i] = Math.floor(
                Math.random() * (10 - shipLenght[i] + 1)
            );
            enemyShipPosition[i] =
                enemyShipPositionY[i] * 10 + enemyShipPositionX[i];

            savePosition = enemyShipPosition[i];

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
        //save enemy position
        savePosition = enemyShipPosition[i];

        for (let j = 0; j < shipLenght[i]; j++) {
            enemyAreaIndex[savePosition] = 1;
            enemyShipFullPos[i][j] = savePosition;

            savePosition += 10;
        }
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
                ) {
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
                } else if (enemyShipPositionX[i] == 10 - shipLenght[i]) {
                    savePosition = enemyShipPosition[i] - 11;
                    for (let k = 0; k < 3; k++) {
                        for (let j = 0; j < shipLenght[i] + 1; j++) {
                            enemyShipAround[savePosition] = true;
                            savePosition++;
                        }
                        savePosition += 9 - shipLenght[i];
                    }
                } else {
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
        //save enemy position
        savePosition = enemyShipPosition[i];

        for (let j = 0; j < shipLenght[i]; j++) {
            enemyAreaIndex[savePosition] = 1;
            enemyShipFullPos[i][j] = savePosition;

            savePosition++;
        }
    }

    //placing enemy ships
    enemyShips[i].style.left = `${
        enemyShipPositionX[i] * 60 + enemyShipOffSetX
    }px`;
    enemyShips[i].style.top = `${
        enemyShipPositionY[i] * 60 + enemyShipOffSetY
    }px`;

    if (enemyShipRotate[i] == 1) {
        enemyShips[i].style.transform = "rotate(90deg)";
        if (shipLenght[i] == 4) {
            enemyShips[i].style.transformOrigin = "120px 120px";
        } else if (shipLenght[i] == 3) {
            enemyShips[i].style.transformOrigin = "90px 90px";
        } else {
            enemyShips[i].style.transformOrigin = "60px 60px";
        }
    }
}

let squarePosX;
let squarePosY;
console.log(enemyAreaIndex);
[...enemySquares].forEach((enemySquare, enemySquareHit) => {
    enemySquare.addEventListener("click", myAttack);

    function myAttack() {
        if (enemySquareClicked[enemySquareHit] === false && playerTurn == 0) {
            enemySquareClicked[enemySquareHit] = true;
            enemySquares[enemySquareHit].style.cursor = "auto";
            playerTurn = 1;

            squarePosX = 964 + (enemySquareHit % 10) * 60;
            squarePosY = 140 + Math.floor(enemySquareHit / 10) * 60;

            myBullet.style.transition =
                "left 500ms, top 500ms, transform 500ms";
            myBullet.style.left = "800px";
            myBullet.style.top = "-60px";
            myBullet.style.transform = "rotate(140deg)";
            let gifLength;

            setTimeout(() => {
                myBullet.style.zIndex = "1000";
                myBullet.style.left = `${squarePosX}px`;
                myBullet.style.top = `${squarePosY}px`;

                myExplosion.style.zIndex = "1000";
                myExplosion.style.left = `${squarePosX + 11}px`;
                myExplosion.style.top = `${squarePosY + 67}px`;

                setTimeout(() => {
                    if (enemyAreaIndex[enemySquareHit] == 0) {
                        myExplosion.innerHTML = `<img src="./res/img/splash.gif" draggable="false">`;
                        gifLength = 1200;
                        console.log("ahooooj");
                    } else {
                        myExplosion.innerHTML = `<img src="./res/img/explosion.gif" draggable="false">`;
                        gifLength = 1400;
                    }

                    setTimeout(() => {
                        myBullet.style.transition = "";
                        myBullet.style.left = "440px";
                        myBullet.style.top = "4px";
                        myBullet.style.transform = "rotate(74deg)";
                        myBullet.style.zIndex = "1";
                    }, 50);
                    setTimeout(() => {
                        console.log("hovnooooo");
                        myExplosion.innerHTML = "";
                        myExplosion.style.zIndex = "-1";
                    }, gifLength);
                }, 500);
            }, 500);

            setTimeout(() => {
                playersTurnArrow.style.transform = "rotate(90deg)";
            }, 400);

            setTimeout(() => {
                if (enemyAreaIndex[enemySquareHit] == 1) {
                    enemySquares[enemySquareHit].style.backgroundImage =
                        "url(./res/img/fire.png)";

                    let shipHitted;
                    for (let i = 0; i < 5; i++) {
                        for (let j = 0; j < shipLenght[i]; j++) {
                            if (enemySquareHit == enemyShipFullPos[i][j]) {
                                shipHitted = i;
                                enemyShipFullPos[i][j] = undefined;
                                break;
                            }
                        }
                    }

                    let shipSunk = true;
                    for (let i = 0; i < shipLenght[shipHitted]; i++) {
                        if (enemyShipFullPos[shipHitted][i] != undefined) {
                            shipSunk = false;
                        }
                    }

                    //if sunked
                    if (shipSunk === true) {
                        mySunkCount++;

                        let savePosition = enemyShipPosition[shipHitted];
                        enemySunkIndex[shipHitted] = true;

                        if (enemyShipRotate[shipHitted] == 0) {
                            if (enemyShipPositionX[shipHitted] == 0) {
                                savePosition =
                                    enemyShipPosition[shipHitted] - 10;
                                for (
                                    let k = 0;
                                    k < shipLenght[shipHitted] + 2;
                                    k++
                                ) {
                                    for (let j = 0; j < 2; j++) {
                                        enemyWaterAround[savePosition] = true;
                                        savePosition++;
                                    }
                                    savePosition += 8;
                                }
                            } else if (enemyShipPositionX[shipHitted] == 9) {
                                savePosition =
                                    enemyShipPosition[shipHitted] - 11;
                                for (
                                    let k = 0;
                                    k < shipLenght[shipHitted] + 2;
                                    k++
                                ) {
                                    for (let j = 0; j < 2; j++) {
                                        enemyWaterAround[savePosition] = true;
                                        savePosition++;
                                    }
                                    savePosition += 8;
                                }
                            } else {
                                savePosition =
                                    enemyShipPosition[shipHitted] - 11;
                                for (
                                    let k = 0;
                                    k < shipLenght[shipHitted] + 2;
                                    k++
                                ) {
                                    for (let j = 0; j < 3; j++) {
                                        enemyWaterAround[savePosition] = true;
                                        savePosition++;
                                    }
                                    savePosition += 7;
                                }
                            }
                        } else {
                            if (enemyShipPositionX[shipHitted] == 0) {
                                savePosition =
                                    enemyShipPosition[shipHitted] - 10;
                                for (let k = 0; k < 3; k++) {
                                    for (
                                        let j = 0;
                                        j < shipLenght[shipHitted] + 1;
                                        j++
                                    ) {
                                        enemyWaterAround[savePosition] = true;
                                        savePosition++;
                                    }
                                    savePosition += 9 - shipLenght[shipHitted];
                                }
                            } else if (
                                enemyShipPositionX[shipHitted] ==
                                10 - shipLenght[shipHitted]
                            ) {
                                savePosition =
                                    enemyShipPosition[shipHitted] - 11;
                                for (let k = 0; k < 3; k++) {
                                    for (
                                        let j = 0;
                                        j < shipLenght[shipHitted] + 1;
                                        j++
                                    ) {
                                        enemyWaterAround[savePosition] = true;
                                        savePosition++;
                                    }
                                    savePosition += 9 - shipLenght[shipHitted];
                                }
                            } else {
                                savePosition =
                                    enemyShipPosition[shipHitted] - 11;
                                for (let k = 0; k < 3; k++) {
                                    for (
                                        let j = 0;
                                        j < shipLenght[shipHitted] + 2;
                                        j++
                                    ) {
                                        enemyWaterAround[savePosition] = true;
                                        savePosition++;
                                    }
                                    savePosition += 8 - shipLenght[shipHitted];
                                }
                            }
                        }

                        for (let i = 0; i < 100; i++) {
                            if (enemyWaterAround[i] === true) {
                                enemySquares[i].style.backgroundImage =
                                    "url(./res/img/water.png)";
                                enemySquareClicked[i] = true;
                                enemySquares[i].style.cursor = "auto";
                            }
                        }

                        for (let i = 0; i < 5; i++) {
                            savePosition = enemyShipPosition[i];
                            if (enemyShipRotate[i] == 0) {
                                if (enemySunkIndex[i] === true) {
                                    for (
                                        let j = savePosition;
                                        j < savePosition + shipLenght[i] * 10;
                                        j += 10
                                    ) {
                                        enemySquares[j].style.backgroundImage =
                                            "";
                                    }
                                }
                            } else {
                                if (enemySunkIndex[i] === true) {
                                    for (
                                        let j = savePosition;
                                        j < savePosition + shipLenght[i];
                                        j++
                                    ) {
                                        enemySquares[j].style.backgroundImage =
                                            "";
                                    }
                                }
                            }
                        }

                        enemyShips[shipHitted].style.display = "block";
                    }
                } else if (enemyAreaIndex[enemySquareHit] == 0) {
                    enemySquares[enemySquareHit].style.backgroundImage =
                        "url(./res/img/water.png)";
                }
                if (mySunkCount == 5) {
                    totalScore[0]++;
                    localStorage.setItem("totalScore", totalScore);
                    endSection.style.display = "flex";
                    winnerInfo.innerText = `${userNickname} Won`;
                    scorePlayerName.innerText = `${userNickname}`;
                    myScore.innerText = `${totalScore[0]}`;
                    enemyScore.innerText = `${totalScore[1]}`;
                } else {
                    //enemy shot
                    setTimeout(() => {
                        enemyAttack();
                    }, 300);
                }
            }, 1800);
        }
    }
});
playAgainButton.onclick = () => {
    console.log(localStorage.getItem("totalScore"));
}
let shipFire = false;
let shotSideOffset;
let saveShotPosition;
let saveShotPositionX;
let saveShotPositionY;
let saveShotSide;
let secondHit;

let mySquarePosX;
let mySquarePosY;

let enemySunkCount = 0;

//enemy attack
function enemyAttack() {
    let enemyShotPos;
    let enemyShotPosCycle;
    do {
        enemyShotPosCycle = false;
        enemyShotPos = Math.floor(Math.random() * 100);
        // enemyShotPos = 64;
        shotSideOffset = [-10, -1, 1, 10];

        if (mySquaresCanBeHit[enemyShotPos] === true) {
            if (shipFire === true) {
                let randomSide = Math.floor(Math.random() * 4);

                enemyShotPos = saveShotPosition + shotSideOffset[randomSide];
                if (saveShotPosition == 0) {
                    shotSideOffset[0] = undefined;
                    shotSideOffset[1] = undefined;
                } else if (saveShotPosition == 9) {
                    shotSideOffset[0] = undefined;
                    shotSideOffset[2] = undefined;
                } else if (saveShotPosition == 90) {
                    shotSideOffset[1] = undefined;
                    shotSideOffset[3] = undefined;
                } else if (saveShotPosition == 99) {
                    shotSideOffset[2] = undefined;
                    shotSideOffset[3] = undefined;
                } else if (saveShotPositionX == 0) {
                    shotSideOffset[1] = undefined;
                } else if (saveShotPositionX == 9) {
                    shotSideOffset[2] = undefined;
                } else if (saveShotPositionY == 0) {
                    shotSideOffset[0] = undefined;
                } else if (saveShotPositionY == 9) {
                    shotSideOffset[3] = undefined;
                }

                if (secondHit === true) {
                    console.log("second hit");
                    let randomSideCycle;
                    let num = 1;
                    do {
                        randomSideCycle = false;

                        enemyShotPos =
                            saveShotPosition +
                            shotSideOffset[saveShotSide] * num;

                        if (
                            shotSideOffset[saveShotSide] != undefined &&
                            mySquaresCanBeHit[enemyShotPos] === true
                        ) {
                            randomSideCycle = true;
                        } else {
                            enemyShotPos =
                                saveShotPosition +
                                shotSideOffset[3 - saveShotSide] * num;

                            if (
                                shotSideOffset[saveShotSide] != undefined &&
                                mySquaresCanBeHit[enemyShotPos] === true
                            ) {
                                randomSideCycle = true;
                            }
                        }
                        num++;
                    } while (!randomSideCycle);
                    enemyShotPosCycle = true;
                    break;
                }

                if (
                    shotSideOffset[randomSide] != undefined &&
                    mySquaresCanBeHit[enemyShotPos] === true
                ) {
                    console.log("save");
                    saveShotSide = randomSide;
                    enemyShotPosCycle = true;
                }
            } else {
                enemyShotPosCycle = true;
            }
        } else console.log("znova");
    } while (!enemyShotPosCycle);

    mySquarePosX = 246 + (enemyShotPos % 10) * 60;
    mySquarePosY = 137 + Math.floor(enemyShotPos / 10) * 60;

    enemyBullet.style.transition = "left 500ms, top 500ms, transform 500ms";
    enemyBullet.style.left = "800px";
    enemyBullet.style.top = "-60px";
    enemyBullet.style.transform = "rotate(220deg)";
    let gifLength;

    setTimeout(() => {
        enemyBullet.zIndex = "1000";
        enemyBullet.style.left = `${mySquarePosX}px`;
        enemyBullet.style.top = `${mySquarePosY}px`;

        enemyExplosion.style.left = `${mySquarePosX - 70}px`;
        enemyExplosion.style.top = `${mySquarePosY + 67}px`;

        setTimeout(() => {
            if (myAreaIndex[enemyShotPos] == 0) {
                enemyExplosion.innerHTML = `<img src="./res/img/splash.gif" draggable="false">`;
                gifLength = 1200;
            } else {
                enemyExplosion.innerHTML = `<img src="./res/img/explosion.gif" draggable="false">`;
                gifLength = 1400;
            }

            setTimeout(() => {
                enemyBullet.style.transition = "";
                enemyBullet.style.left = "1259px";
                enemyBullet.style.top = "4px";
                enemyBullet.style.transform = "rotate(286deg)";
                enemyBullet.style.zIndex = "1";
            }, 50);
            setTimeout(() => {
                enemyExplosion.innerHTML = "";
            }, gifLength);
        }, 500);
    }, 500);

    setTimeout(() => {
        playersTurnArrow.style.transform = "rotate(270deg)";
    }, 400);
    setTimeout(() => {
        mySquaresCanBeHit[enemyShotPos] = false;

        //water
        if (myAreaIndex[enemyShotPos] == 0) {
            mySquares[enemyShotPos].style.backgroundImage =
                "url(./res/img/water.png)";

            if (secondHit === true) {
                saveShotSide = 3 - saveShotSide;
            }
        }
        //ship
        else if (myAreaIndex[enemyShotPos] == 1) {
            let shipHitted;
            let shipHittedBxPos;
            for (let i = 0; i < 5; i++) {
                for (let j = 0; j < shipLenght[i]; j++) {
                    if (enemyShotPos == myShipsFullPos[i][j]) {
                        shipHitted = i;
                        myShipsFullPos[i][j] = undefined;
                        shipHittedBxPos = j;
                        break;
                    }
                }
            }
            if (shipFire === true) {
                secondHit = true;
            }

            if (rotateIndex[shipHitted] === true) {
                shipHittedBxPos = shipLenght[shipHitted] - shipHittedBxPos - 1;
            }

            for (let i = 0; i < shipHitted; i++) {
                shipHittedBxPos += myShipsFullPos[i].length;
            }

            myShipsBx[shipHittedBxPos].style.zIndex = "100";

            let shipSunk = true;
            for (let i = 0; i < shipLenght[shipHitted]; i++) {
                if (myShipsFullPos[shipHitted][i] != undefined) {
                    shipSunk = false;
                }
            }

            //ship sunk
            if (shipSunk === true) {
                myShips[shipHitted].style.filter = "brightness(35%)";
                shipFire = false;
                secondHit = false;

                enemySunkCount++;

                myShipPosition[shipHitted] =
                    myShipPositionY[shipHitted] * 10 +
                    myShipPositionX[shipHitted];
                let savePosition = myShipPosition;

                //not rotated
                if (rotateIndex[shipHitted] === false) {
                    if (myShipPositionX[shipHitted] == 0) {
                        savePosition = myShipPosition[shipHitted] - 10;

                        for (let i = 0; i < shipLenght[shipHitted] + 2; i++) {
                            for (let j = 0; j < 2; j++) {
                                mySquaresCanBeHit[savePosition] = false;
                                savePosition++;
                            }
                            savePosition += 8;
                        }
                    } else if (myShipPositionX[shipHitted] == 9) {
                        savePosition = myShipPosition[shipHitted] - 11;

                        for (let i = 0; i < shipLenght[shipHitted] + 2; i++) {
                            for (let j = 0; j < 2; j++) {
                                mySquaresCanBeHit[savePosition] = false;
                                savePosition++;
                            }
                            savePosition += 8;
                        }
                    } else {
                        savePosition = myShipPosition[shipHitted] - 11;

                        for (let i = 0; i < shipLenght[shipHitted] + 2; i++) {
                            for (let j = 0; j < 3; j++) {
                                mySquaresCanBeHit[savePosition] = false;
                                savePosition++;
                            }
                            savePosition += 7;
                        }
                    }
                }
                //rotated
                else {
                    if (myShipPositionX[shipHitted] == 0) {
                        savePosition = myShipPosition[shipHitted] - 10;

                        for (let i = 0; i < 3; i++) {
                            for (
                                let j = 0;
                                j < shipLenght[shipHitted] + 1;
                                j++
                            ) {
                                mySquaresCanBeHit[savePosition] = false;
                                savePosition++;
                            }
                            savePosition += 9 - shipLenght[shipHitted];
                        }
                    } else if (
                        myShipPositionX[shipHitted] ==
                        10 - shipLenght[shipHitted]
                    ) {
                        savePosition = myShipPosition[shipHitted] - 11;

                        for (let i = 0; i < 3; i++) {
                            for (
                                let j = 0;
                                j < shipLenght[shipHitted] + 1;
                                j++
                            ) {
                                mySquaresCanBeHit[savePosition] = false;
                                savePosition++;
                            }
                            savePosition += 9 - shipLenght[shipHitted];
                        }
                    } else {
                        savePosition = myShipPosition[shipHitted] - 11;

                        for (let i = 0; i < 3; i++) {
                            for (
                                let j = 0;
                                j < shipLenght[shipHitted] + 2;
                                j++
                            ) {
                                mySquaresCanBeHit[savePosition] = false;
                                savePosition++;
                            }
                            savePosition += 8 - shipLenght[shipHitted];
                        }
                    }
                }
                for (let i = 0; i < 100; i++) {
                    if (mySquaresCanBeHit[i] === false) {
                        mySquares[i].style.backgroundImage =
                            "url(./res/img/water.png)";
                    }
                }

                for (let i = 0; i < 5; i++) {
                    savePosition = myShipPosition[i];
                    if (rotateIndex[i] === false) {
                        for (
                            let j = savePosition;
                            j < savePosition + shipLenght[i] * 10;
                            j += 10
                        ) {
                            mySquares[j].style.backgroundImage = "";
                        }
                    } else {
                        for (
                            let j = savePosition;
                            j < savePosition + shipLenght[i];
                            j++
                        ) {
                            mySquares[j].style.backgroundImage = "";
                        }
                    }
                }
            } else {
                shipFire = true;

                saveShotPosition = enemyShotPos;
                saveShotPositionX = saveShotPosition % 10;
                saveShotPositionY = Math.floor(saveShotPosition / 10);
            }

            if (enemySunkCount == 5) {
                totalScore[1]++;
                endSection.style.display = "flex";
                winnerInfo.innerText = `Computer Won`;
                scorePlayerName.innerText = `${userNickname}`;
                myScore.innerText = `${totalScore[0]}`;
                enemyScore.innerText = `${totalScore[1]}`;
            }
        }
        playerTurn = 0;
    }, 1800);
}
