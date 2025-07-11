// the init method will be called after the page loads;
function init()
{
    /*------------------------ Cached Element References ------------------------*/
    const gridEl = document.querySelector(".grid");
    const resetBtnEl = document.querySelector("#reset");

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
    let snakeLength = 7;
    let snakeDir = 0;
    let snakeHistory = [14, 24, 34, 44, 54, 64, 74];
    snakePosition = snakeHistory[snakeHistory.length - 1];
    let tempPos = snakePosition;

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
        }
    }

    // this method will be called once every half a second to force the player to move
    function play()
    {
        gameStart = true;

        setInterval(() => 
        {
            tempPos += snakeDir;
            checkSnake();
            checkBoundary();
            placeSnake();

        }, 500);
    }

    function checkSnake()
    {
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
            //restart();
        }
        else if(tempPos % 10 == 0 && snakeDir == 1)
        {
            gameEnd = true;
            //restart();
            tempPos = snakePosition;
        }
        else if((tempPos % 10) == 9 && snakeDir == -1)
        {
            gameEnd = true;
            snakeDir = 0;
            //restart();
            tempPos = snakePosition;
        }
        else
        {
            if(snakeHistory[snakeHistory.length - 1] != tempPos)
            {
                snakePosition = tempPos;
                snakeHistory.push(snakePosition);
                //console.log(snakeHistory);
            }
        }
    }

    function restart()
    {
        removeSnake();
        snakeDir = 0;
        gameEnd = false;
        snakeLength = 7;
        snakeHistory = [14, 24, 34, 44, 54, 64, 74];
        tempPos = snakeHistory[snakeHistory.length - 1];
        snakePosition = tempPos;
        placeSnake();

        for(let i = 0; i < numberOfCells; i++)
        {
            cells[i].classList.remove("fruit");
        }
        placeFruit();
    }
    
    function startPlaying()
    {
        if(gameStart == false)
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