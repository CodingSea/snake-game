// the init method will be called after the page loads;
function init() 
{
    /*------------------------ Cached Element References ------------------------*/
    const gridEl = document.querySelector(".grid");

    const resetBtnEl = document.querySelector("#reset");
    const snakeLengthEl = document.querySelector("#snakeLength");
    const messageEl = document.querySelector("#message");
    const fruitSFXEl = document.querySelector("#coinSFX");
    const gameOverSFXEl = document.querySelector("#gameOverSFX");
    const difficultyEl = document.querySelector("#difficulty");
    const popupEl = document.querySelector(".popup");

    /*-------------------------------- Constants --------------------------------*/
    // grid data
    const cells = [];
    const gridWidth = 10;
    const gridHeight = 10;
    //const gridScale = 62;
    const cellSize = 50;
    const numberOfCells = gridWidth * gridHeight;
    let snakeTimer = 800;

    const map = 
    [
        "","","","","","","","","","",
        "","","","","","","","","","",
        "","0","","","","","","","0","",
        "","","","","","","","","","",
        "","","","","","","","","","",
        "","","","","","","","","","",
        "","","","","","","","","","",
        "","0","","","","","","","0","",
        "","","","","","","","","","",
        "","","","","","","","","","",
    ]

    gridEl.style.width = `${gridWidth * (cellSize + 2)}px`;
    gridEl.style.height = `${gridHeight * (cellSize + 2)}px`;

    /*-------------------------------- Variables --------------------------------*/
    // these variables will be responsible for keeping track of the player position and info
    let snakePosition;
    let snakeLength = 1;
    let snakeDir = gridWidth;

    let snakeHistory = [Math.floor(numberOfCells / 2) - Math.floor((gridWidth / 2)) - 1];

    let snakeDirHistory = [snakeDir];
    snakePosition = snakeHistory[snakeHistory.length - 1];
    let tempPos = snakePosition;

    let gameStart = false;
    let gameEnd = false;
    let myTimer;
    const targetLength = 10;
    let win = false;

    // this method will create a grid to act as the board
    function createGrid() 
    {
        for (let i = 0; i < numberOfCells; i++) 
        {
            const cell = document.createElement("div");
            cell.id = i;
            cells.push(cell);
            cell.style.width = `${cellSize}px`;
            cell.style.height = `${cellSize}px`;
            //cell.textContent = i;
            if(map[i] == "0")
            {
                cell.classList.add("rock");
            }
            gridEl.appendChild(cell);
        }
    }

    function placeSnake() 
    {
        removeSnake();
        for (let i = 0; i < snakeLength; i++) 
        {
            // last to first index
            const index = (snakeHistory.length - 1) - i;
            // this will delete the oldest number in the array if the array has more th
            if (snakeHistory.length > numberOfCells) 
            {
                snakeHistory.shift();
            }
            // index to cell position
            const snakePosIndex = snakeHistory[index];

            cells[snakePosIndex].classList.add("snake");
            
            // cell type
            if(i == 0)
            {
                cells[snakePosIndex].classList.add("snakeHead");
            }
            else if(i == snakeLength - 1)
            {
                cells[snakePosIndex].classList.add("snakeTail");
            }
            else
            {
                cells[snakePosIndex].classList.add("snakeBody");
            }
            
            // cell rotation
            if(snakeDirHistory[index] == (gridWidth * -1))
            {
                cells[snakePosIndex].style.transform = "rotate(0deg)";
            }
            else if(snakeDirHistory[index] == gridWidth)   
            {
                cells[snakePosIndex].style.transform = "rotate(180deg)";
            }
            else if(snakeDirHistory[index] == 1)
            {
                cells[snakePosIndex].style.transform = "rotate(90deg)";
            }
            else if(snakeDirHistory[index] == -1)
            {
                cells[snakePosIndex].style.transform = "rotate(270deg)";
            }

            // cell turning right
            if(snakeDirHistory[snakeDirHistory.length - i] !== snakeDirHistory[snakeDirHistory.length - i - 1])
            {
                if(i !== snakeLength - 1)
                {
                    // right turn
                    if(snakeDirHistory[snakeDirHistory.length - i] == 1 && snakeDirHistory[snakeDirHistory.length - i - 1] == (gridWidth * -1))
                    {
                        cells[snakePosIndex].classList.add("snakeTurnRight");
                    }
                    else if(snakeDirHistory[snakeDirHistory.length - i] == gridWidth && snakeDirHistory[snakeDirHistory.length - i - 1] == 1)
                    {
                        cells[snakePosIndex].classList.add("snakeTurnRight");
                    }
                    else if(snakeDirHistory[snakeDirHistory.length - i] == -1 && snakeDirHistory[snakeDirHistory.length - i - 1] == gridWidth)
                    {
                        cells[snakePosIndex].classList.add("snakeTurnRight");
                    }
                    else if(snakeDirHistory[snakeDirHistory.length - i] == (gridWidth * -1) && snakeDirHistory[snakeDirHistory.length - i - 1] == -1)
                    {
                        cells[snakePosIndex].classList.add("snakeTurnRight");
                    }


                    // left turn
                    if(snakeDirHistory[snakeDirHistory.length - i] == -1 && snakeDirHistory[snakeDirHistory.length - i - 1] == (gridWidth * -1))
                    {
                        cells[snakePosIndex].classList.add("snakeTurnLeft");
                    }
                    else if(snakeDirHistory[snakeDirHistory.length - i] == gridWidth && snakeDirHistory[snakeDirHistory.length - i - 1] == -1)
                    {
                        cells[snakePosIndex].classList.add("snakeTurnLeft");
                    }
                    else if(snakeDirHistory[snakeDirHistory.length - i] == 1 && snakeDirHistory[snakeDirHistory.length - i - 1] == gridWidth)
                    {
                        cells[snakePosIndex].classList.add("snakeTurnLeft");
                    }
                    else if(snakeDirHistory[snakeDirHistory.length - i] == (gridWidth * -1) && snakeDirHistory[snakeDirHistory.length - i - 1] == 1)
                    {
                        cells[snakePosIndex].classList.add("snakeTurnLeft");
                    }
                }
                else
                {
                    if(snakeDirHistory[index + 1] == (gridWidth * -1))
                    {
                        cells[snakePosIndex].style.transform = "rotate(0deg)";
                    }
                    else if(snakeDirHistory[index + 1] == gridWidth)   
                    {
                        cells[snakePosIndex].style.transform = "rotate(180deg)";
                    }
                    else if(snakeDirHistory[index + 1] == 1)
                    {
                        cells[snakePosIndex].style.transform = "rotate(90deg)";
                    }
                    else if(snakeDirHistory[index + 1] == -1)
                    {
                        cells[snakePosIndex].style.transform = "rotate(270deg)";
                    }
                }
            }
        }

        eatFruit();
        takeCrown();
        rotateSnake();
    }

    function removeSnake() 
    {
        for (let i = 0; i < numberOfCells; i++) 
        {
            cells[i].classList.remove("snake");
            cells[i].classList.remove("snakeHead");
            cells[i].classList.remove("snakeBody");
            cells[i].classList.remove("snakeTail");
            cells[i].classList.remove("snakeTurnRight");
            cells[i].classList.remove("snakeTurnLeft");
            cells[i].style.transform = "rotate(0deg)";
        }
    }

    function eatFruit() 
    {
        if (cells[snakePosition].classList.contains("fruit")) 
        {
            cells[snakePosition].classList.remove("fruit");
            snakeLength++;

            placeFruit();
            playCoinSound();
        }
    }

    function takeCrown()
    {
        if (cells[snakePosition].classList.contains("crown")) 
        {
            cells[snakePosition].classList.remove("crown");

            gameWin();
            playCoinSound();
        }
    }

    // this method will be called once every half a second to force the player to move
    function play() 
    {
        gameStart = true;

        if(difficultyEl.value == "Easy")
        {
            snakeTimer = 800;
        }
        else if(difficultyEl.value == "Normal")
        {
            snakeTimer = 500;
        }
        else if(difficultyEl.value == "Hard")
        {
            snakeTimer = 250;
        }

        difficultyEl.disabled = true;

        myTimer = setInterval(() => 
        {
            if (gameEnd) 
            {
                clearInterval(myTimer);
            }

            tempPos += snakeDir;
            checkSnake();
            checkBoundary();
            placeSnake();
            updateInfo();
        }, snakeTimer);


    }

    function gameOver()
    {
        playGameOverSound();
        gameEnd = true;
        gameStart = false;
        snakeDir = 0;
        tempPos = snakePosition;
        difficultyEl.disabled = false;
    }

    function checkSnake() 
    {
        if (tempPos < 0 || tempPos >= numberOfCells) return;

        if (cells[tempPos].classList.contains("snake") || cells[tempPos].classList.contains("rock")) 
        {
            gameOver();
        }
    }

    function checkBoundary() 
    {
        if (tempPos < 0 || tempPos >= numberOfCells) 
        {
            gameOver();
        }
        else if (tempPos % gridWidth == 0 && snakeDir == 1) 
        {
            gameOver();
        }
        else if ((tempPos % gridWidth) == (gridWidth - 1) && snakeDir == -1) 
        {
            gameOver();
        }
        else 
        {
            if (snakeHistory[snakeHistory.length - 1] != tempPos) 
            {
                snakeDirHistory.push(tempPos - snakePosition);
                snakePosition = tempPos;
                snakeHistory.push(snakePosition);
            }
        }
    }

    function restart() 
    {
        if (myTimer !== undefined) 
        {
            clearInterval(myTimer);
        }

        snakeDir = gridWidth;
        gameEnd = false;
        gameStart = false;
        snakeLength = 1;
        snakeHistory = [Math.floor(numberOfCells / 2) - Math.floor((gridWidth / 2)) - 1];
        snakeDirHistory = [gridWidth];
        tempPos = snakeHistory[snakeHistory.length - 1];
        snakePosition = tempPos;
        for (let i = 0; i < numberOfCells; i++) 
        {
            cells[i].classList.remove("fruit");
            cells[i].classList.remove("crown");
        }
        difficultyEl.disabled = false;
        placeSnake();
        placeFruit();
        updateInfo();
    }

    function startPlaying() 
    {
        if (gameStart === false) 
        {
            play();
        }
    }

    function placeFruit() 
    {
        if(snakeLength <= targetLength)
        {
            let indexNum;
            do 
            {
                indexNum = Math.floor(Math.random() * numberOfCells);
            }
            while (cells[indexNum].classList.contains("snake") || cells[indexNum].classList.contains("fruit") || cells[indexNum].classList.contains("rock"));

            cells[indexNum].classList.add("fruit");
        }
        else
        {
            let indexNum;
            do 
            {
                indexNum = Math.floor(Math.random() * numberOfCells);
            }
            while (cells[indexNum].classList.contains("snake") || cells[indexNum].classList.contains("fruit") || cells[indexNum].classList.contains("rock"));

            cells[indexNum].classList.add("crown");
        }
    }

    function updateInfo() 
    {
        snakeLengthEl.textContent = `Snake Length: ${ snakeLength }`;

        if (gameStart) 
        {
            messageEl.textContent = "Playing...";
        }
        else if (gameEnd) 
        {
            messageEl.textContent = "Game Over!";
        }
        else 
        {
            messageEl.textContent = "Press WASD to Start Playing";
        }
    }

    function playCoinSound() 
    {
        fruitSFXEl.pause();
        fruitSFXEl.currentTime = 0;

        fruitSFXEl.play();
    }

    function playGameOverSound() 
    {
        gameOverSFXEl.play();
    }

    function rotateSnake()
    {
        if(snakeDir == (gridWidth * -1))
        {
            cells[snakePosition].style.transform = "rotate(0deg)";
        }
        else if(snakeDir == gridWidth)
        {
            cells[snakePosition].style.transform = "rotate(180deg)";
        }
        else if(snakeDir == 1)
        {
            cells[snakePosition].style.transform = "rotate(90deg)";
        }
        else if(snakeDir == -1)
        {
            cells[snakePosition].style.transform = "rotate(270deg)";
        }
    }

    function checkSnakeBody(sd)
    {
        if(cells[snakePosition + sd].classList.contains("snake"))
        {
            return false;
        }
        else
        {
            return true;
        }
    }

    function gameWin()
    {
        win = true;
        popupEl.classList.remove("hidden");
        clearInterval(myTimer);
    }

    // this section will call all the methods to run the game
    createGrid();
    placeSnake();
    placeFruit();
    updateInfo();

    // audios
    fruitSFXEl.load();
    fruitSFXEl.currentTime = 0;
    gameOverSFXEl.load();
    gameOverSFXEl.currentTime = 0;

    // this section will handle player input and set the snakeDir to the corresponding direction
    document.addEventListener('keydown', function (event)
    {
        if (gameEnd == false)
        {
            if (event.key == "w" && checkSnakeBody(gridWidth * -1)) 
            {
                snakeDir = gridWidth * -1;
                startPlaying();
            }
            if (event.key == "s" && checkSnakeBody(gridWidth)) 
            {
                snakeDir = gridWidth;
                startPlaying();
            }
            if (event.key == "d" && checkSnakeBody(1))
            {
                snakeDir = 1;
                startPlaying();
            }
            if (event.key == "a" && checkSnakeBody(-1)) 
            {
                snakeDir = -1;
                startPlaying();
            }

            rotateSnake();
        }
    });
    resetBtnEl.addEventListener('click', restart)
}


document.addEventListener('DOMContentLoaded', init);