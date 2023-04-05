const buildShip = document.getElementById("buildShip");
const shipsInGarage = document.getElementsByClassName("shipsInGarage");
const shipsGarageBx = document.getElementsByClassName("shipsGarageBx");
const saveShipPosition = document.getElementById("saveShipPosition");

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

let myAreaIndex = [];

let shipOffSetX = 561;
let shipOffSetY = 61;
let shipBxinShip;
let shipInGaragePosition = [];
let shipInGaragePositionX = [];
let shipInGaragePositionY = [];



for (let i = 0; i < 100; i++) {
    shipGarageIndex[i] = false;
    myAreaIndex[i] = 0;
}

console.log(myAreaIndex);

[...shipsInGarage].forEach((shipInGarage, shipGarageIndex) => {
    
    
    shipInGarage.addEventListener("click", shipInGarageClick);
    
    function shipInGarageClick() {
        console.log("ship index:" + shipGarageIndex);
        
        shipInGarage.style.position = "absolute";
        shipInGarage.style.zIndex = "1000";
        
        let i = 0;
        for ( i ; i < shipGarageIndex.length; i++) {
            if (shipGarageIndex[i] === false) {
                shipGarageIndex[i] = true;
                break;
            }
        }
        shipInGaragePosition[index] = i;
        shipBxinShip = shipInGarage.getElementsByClassName("shipsGarageBx").length;
        console.log(shipBxinShip);
        
        shipInGaragePositionX[index] = Math.floor(shipInGaragePosition[index]/10);
        shipInGaragePositionY[index] = (shipInGaragePosition[index]%10);
        shipInGarage.style.left = `${shipInGaragePositionX[index]*60 + shipOffSetX}px`;
        shipInGarage.style.top = `${shipInGaragePositionY[index]*60 + shipOffSetY}px`;

        // for ( i ; i < (shipBxinShip)*10; i += 10) {
        //     shipGarageIndex[i] = true;
        // }

        shipInGarage.removeEventListener("click", shipInGarageClick)
    }
        

        
   
    document.addEventListener("keydown", ({ keyCode }) => {
        console.log("index : " + index);
        console.log(shipInGaragePositionX[index]);
        console.log(shipInGaragePositionY[index]);

        if (keycodes.UP[keyCode]) {
            if (shipInGaragePositionY[index] > 0) {
                shipInGaragePositionY[index]--;
            }
            shipInGarage.style.left = `${shipInGaragePositionX[index]*60 + shipOffSetX}px`;
            shipInGarage.style.top = `${shipInGaragePositionY[index]*60 + shipOffSetY}px`;
        }

        if (keycodes.DOWN[keyCode]) {
            if (shipInGaragePositionY[index] <= 9-shipBxinShip) {
                shipInGaragePositionY[index]++;
            }
            shipInGarage.style.left = `${shipInGaragePositionX[index]*60 + shipOffSetX}px`;
            shipInGarage.style.top = `${shipInGaragePositionY[index]*60 + shipOffSetY}px`;
        }

        if (keycodes.LEFT[keyCode]) {
            if (shipInGaragePositionX[index] > 0) {
                shipInGaragePositionX[index]--;
            }
            shipInGarage.style.left = `${shipInGaragePositionX[index]*60 + shipOffSetX}px`;
            shipInGarage.style.top = `${shipInGaragePositionY[index]*60 + shipOffSetY}px`;
        }

        if (keycodes.RIGHT[keyCode]) {
            if (shipInGaragePositionX[index] < 9) {
                shipInGaragePositionX[index]++;
            }
            shipInGarage.style.left = `${shipInGaragePositionX[index]*60 + shipOffSetX}px`;
            shipInGarage.style.top = `${shipInGaragePositionY[index]*60 + shipOffSetY}px`;
        }
    });

    saveShipPosition.onclick = () => {

        shipInGaragePosition[index] = shipInGaragePositionY[index]*10 + shipInGaragePositionX[index];
        console.log("index" + index);
        console.log(shipInGaragePositionX[index]);
        console.log(shipInGaragePositionY[index]);
        console.log(shipInGaragePosition[index]);
        for (let i = shipInGaragePosition[index]; i < shipBxinShip*10; i += 10) {
            myAreaIndex[i] = 1;
            console.log(i);
        }

        console.log(myAreaIndex);
    }
//     shipInGarage.addEventListener("mouseup", (e) => {
//         if (e.pageX > 900 && e.pageX < 1352 && e.pageY > 100 && e.pageY < 550) {
//         } else {
//             shipInGarage.style.position = "static";
//         }
//     });
});



[...enemySquares].forEach((enemySquare) => {
    enemySquare.onclick = () => {
        enemySquare.style.backgroundColor = "red";
    };
});
