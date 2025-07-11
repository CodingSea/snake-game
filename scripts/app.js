// the init method will be called after the page loads;
function init()
{
    /*------------------------ Cached Element References ------------------------*/
    const gridEl = document.querySelector(".grid");
    const resetBtnEl = document.querySelector("#reset");
    const scoreEl = document.querySelector("#score");
    const snakeLengthEl = document.querySelector("#snakeLength");
    const messageEl = document.querySelector("#message");

    /*-------------------------------- Constants --------------------------------*/
    // grid data
    const cells = [];
    const gridWidth = 10;
    const numberOfCells = gridWidth * gridWidth;

    let gameStart = false;
    let gameEnd = false;

    /*-------------------------------- Constants --------------------------------*/
    // these variables will be responsible for keeping track of the player position and info
    let snakePosition;
    let snakeLength = 1;
    let snakeDir = 0;
    let snakeHistory = [44];
    snakePosition = snakeHistory[snakeHistory.length - 1];
    let tempPos = snakePosition;

    let myTimer;
    let score = 0;

    // this method will create a grid to act as the board
    function createGrid()
    {
        for(let i = 0; i < numberOfCells; i++)
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
        for(let i = 0; i < snakeLength; i++)
        {
            const index = (snakeHistory.length - 1) - i;
            // this will delete the oldest number in the array if the array has more th
            if(snakeHistory.length > 100)
            {
                snakeHistory.shift();
            }
            const snakePosIndex = snakeHistory[index];
            cells[snakePosIndex].classList.add("snake");
        }

        eatFruit();
    }

    function removeSnake()
    {
        for(let i = 0; i < numberOfCells; i++)
        {
            cells[i].classList.remove("snake");
        }
    }

    function eatFruit()
    {
        if(cells[snakePosition].classList.contains("fruit"))
        {
            cells[snakePosition].classList.remove("fruit");
            snakeLength++;
            score += 100;
            placeFruit();
        }
    }

    // this method will be called once every half a second to force the player to move
    function play()
    {
        gameStart = true;

        myTimer = setInterval(() => 
        {
            if(gameEnd)
            {
                clearInterval(myTimer);
            }

            tempPos += snakeDir;
            checkSnake();
            checkBoundary();
            placeSnake();
            updateInfo();
        }, 500);

        
    }

    function checkSnake()
    {
        if(tempPos < 0 || tempPos >= 100) return;
        
        if(cells[tempPos].classList.contains("snake"))
        {
            gameEnd = true;
            snakeDir = 0;
            tempPos = snakePosition;
        }
    }

    function checkBoundary()
    {
        if(tempPos < 0 || tempPos >= numberOfCells)
        {
            gameEnd = true;
        }
        else if(tempPos % 10 == 0 && snakeDir == 1)
        {
            gameEnd = true;
            tempPos = snakePosition;
        }
        else if((tempPos % 10) == 9 && snakeDir == -1)
        {
            gameEnd = true;
            snakeDir = 0;
            tempPos = snakePosition;
        }
        else
        {
            if(snakeHistory[snakeHistory.length - 1] != tempPos)
            {
                snakePosition = tempPos;
                snakeHistory.push(snakePosition);
            }
        }
    }

    function restart()
    {
        if(myTimer !== undefined)
        {
            clearInterval(myTimer);
        }

        snakeDir = 0;
        gameEnd = false;
        gameStart = false;
        snakeLength = 1;
        snakeHistory = [44];
        tempPos = snakeHistory[snakeHistory.length - 1];
        snakePosition = tempPos;
        score = 0;
        for(let i = 0; i < numberOfCells; i++)
        {
            cells[i].classList.remove("fruit");
        }
        placeSnake();
        placeFruit();
        updateInfo();
    }
    
    function startPlaying()
    {
        if(gameStart === false)
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
        scoreEl.textContent = `Score: ${score}`;
        snakeLengthEl.textContent = `Snake Length: ${snakeLength}`;
        if(gameEnd)
        {
            gameStart = false;
        }

        if(gameStart)
        {
            messageEl.textContent = "Playing...";
        }
        else if(gameEnd)
        {
            messageEl.textContent = "Game Over!";
        }
        else
        {
            messageEl.textContent = "Press WASD to Start Playing";
        }
    }

    // this section will call all the methods to run the game
    createGrid();
    placeSnake();
    placeFruit();
    
    // this section will handle player input and set the snakeDir to the corresponding direction
    document.addEventListener('keydown', function(event)
    {
        if(gameEnd == false)
        {
            if(event.key == "w")
            {
                snakeDir = -10;
                startPlaying();
            }
            if(event.key == "s")
            {
                snakeDir = 10;
                startPlaying();
            }
            if(event.key == "d")
            {
                snakeDir = 1;
                startPlaying();
            }
            if(event.key == "a")
            {
                snakeDir = -1;
                startPlaying();
            }
        }
    });
    resetBtnEl.addEventListener('click', restart)
}



document.addEventListener('DOMContentLoaded', init);

// playerPos / 10 if divisable then restart