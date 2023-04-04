const buildShip = document.getElementById("buildShip");
const shipsInGarage = document.getElementsByClassName("shipsInGarage");
const shipsGarageBx = document.getElementsByClassName("shipsGarageBx");
// let shipsGarageBx = shipsInGarage.getElementsByClassName('shipsGarageBx');

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
let shipGarageIndex = [];


for (let i = 0; i < 100; i++) {
    shipGarageIndex[i] = false;
}


[...shipsInGarage].forEach((shipInGarage) => {
    shipInGarage.onclick = () => {
        shipInGarage.style.position = "absolute";
        shipInGarage.style.zIndex = "1000";
        shipInGarage.style.top = "160px";
        shipInGarage.style.left = "900px";
        let i = 0;
        for ( i ; i < shipGarageIndex.length; i++) {
            if (shipGarageIndex[i] === false) {
                shipGarageIndex[i] = true;
                break;
            }
        }
        let shipBxinShip = shipInGarage.getElementsByClassName("shipsGarageBx");
        console.log(shipBxinShip.length);

        for ( i ; i < (shipBxinShip.length)*10; i += 10) {
            shipGarageIndex[i] = true;
        }
    };
    document.addEventListener("keydown", ({ keyCode }) => {
        if (keycodes.UP[keyCode]) {

        }
    });
    shipInGarage.addEventListener("mouseup", (e) => {
        if (e.pageX > 900 && e.pageX < 1352 && e.pageY > 100 && e.pageY < 550) {
        } else {
            shipInGarage.style.position = "static";
        }
    });
});

[...enemySquares].forEach((enemySquare) => {
    enemySquare.onclick = () => {
        enemySquare.style.backgroundColor = "red";
    };
});
