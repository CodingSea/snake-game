// the init method will be called after the page loads;
function init() 
{
    /*------------------------ Cached Element References ------------------------*/
    const gridEl = document.querySelector(".grid");
    const resetBtnEl = document.querySelector("#reset");
    const scoreEl = document.querySelector("#score");
    const highScoreEl = document.querySelector("#highScore");
    const snakeLengthEl = document.querySelector("#snakeLength");
    const messageEl = document.querySelector("#message");
    const fruitSFXEl = document.querySelector("#coinSFX");
    const gameOverSFXEl = document.querySelector("#gameOverSFX");
    const difficultyEl = document.querySelector("#difficulty");

    /*-------------------------------- Constants --------------------------------*/
    // grid data
    const cells = [];
    const gridWidth = 20;
    const gridHeight = 10;
    const numberOfCells = gridWidth * gridHeight;
    let snakeTimer = 1000;

    /*-------------------------------- Variables --------------------------------*/
    // these variables will be responsible for keeping track of the player position and info
    let snakePosition;
    let snakeLength = 1;
    let snakeDir = 1;
    let snakeHistory = [Math.floor(numberOfCells / 2) - Math.floor((gridWidth / 2)) - 1];
    let snakeDirHistory = [10];
    snakePosition = snakeHistory[snakeHistory.length - 1];
    let tempPos = snakePosition;

    let gameStart = false;
    let gameEnd = false;
    let myTimer;
    let score = 0;

    // this method will create a grid to act as the board
    function createGrid() 
    {
        for (let i = 0; i < numberOfCells; i++) 
        {
            const cell = document.createElement("div");
            cell.id = i;
            cells.push(cell);
            //cell.textContent = i;
            gridEl.appendChild(cell);
        }
    }

    function placeSnake() 
    {
        removeSnake();
        for (let i = 0; i < snakeLength; i++) 
        {
            const index = (snakeHistory.length - 1) - i;
            // this will delete the oldest number in the array if the array has more th
            if (snakeHistory.length > numberOfCells) 
            {
                snakeHistory.shift();
            }
            const snakePosIndex = snakeHistory[index];

            cells[snakePosIndex].classList.add("snake");
            
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
        }

        eatFruit();
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
            cells[i].style.transform = "rotate(0deg)";
        }
    }

    function eatFruit() 
    {
        if (cells[snakePosition].classList.contains("fruit")) 
        {
            cells[snakePosition].classList.remove("fruit");
            snakeLength++;

            if(difficultyEl.value == "Easy")
            {
                score += 50;
            }
            else if(difficultyEl.value == "Normal")
            {
                score += 100;
            }
            else if(difficultyEl.value == "Hard")
            {
                score += 200;
            }

            placeFruit();
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

        if(score > localStorage.getItem("highScore"))
        {
            localStorage.setItem("highScore", score);
        }
    }

    function checkSnake() 
    {
        if (tempPos < 0 || tempPos >= numberOfCells) return;

        if (cells[tempPos].classList.contains("snake")) 
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

        snakeDir = 1;
        gameEnd = false;
        gameStart = false;
        snakeLength = 1;
        snakeHistory = [Math.floor(numberOfCells / 2) - Math.floor((gridWidth / 2)) - 1];
        snakeDirHistory = [10];
        tempPos = snakeHistory[snakeHistory.length - 1];
        snakePosition = tempPos;
        score = 0;
        for (let i = 0; i < numberOfCells; i++) 
        {
            cells[i].classList.remove("fruit");
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
        let indexNum;
        do 
        {
            indexNum = Math.floor(Math.random() * numberOfCells);
        }
        while (cells[indexNum].classList.contains("snake") || cells[indexNum].classList.contains("fruit"));

        cells[indexNum].classList.add("fruit");
    }

    function updateInfo() 
    {
        scoreEl.textContent = `Score: ${ score }`;
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

        if(localStorage.getItem("highScore") !== null)
        {
            highScoreEl.textContent = `High Score: ${localStorage.getItem("highScore")}`;
        }
        else
        {
            localStorage.setItem("highScore", 0);
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