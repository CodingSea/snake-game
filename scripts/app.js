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
    let snakePosition = 44;
    let snakeLength = 3;
    let snakeDir = 0;
    let snakeHistory = [24, 34, 44];
    let tempPos = snakePosition;

    // this method will create a grid to act as the board
    function createGrid()
    {
        for(let i = 0; i < numberOfCells; i++)
        {
            const cell = document.createElement("div");
            cells.push(cell);
            gridEl.appendChild(cell);
        }
    }

    function placeSnake()
    {
        for(let i = 0; i < snakeLength; i++)
        {
            const index = (snakeHistory.length - 1) - i;
            cells[snakeHistory[index]].classList.add("snake");
        }
    }

    function removeSnake()
    {
        for(let i = 0; i < numberOfCells; i++)
        {
            cells[i].classList.remove("snake");
        }

        cells[snakePosition].classList.remove("snake");
    }

    // this method will be called once every half a second to force the player to move
    function play()
    {
        gameStart = true;

        setInterval(() => 
        {
            removeSnake();
            tempPos += snakeDir;
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
            placeSnake();

        }, 500);
    }

    function restart()
    {
        removeSnake();
        tempPos = 44;
        snakePosition = tempPos;
        snakeDir = 0;
        gameEnd = false;
        snakeHistory = [24, 34, 44];
        placeSnake();
    }
    
    function startPlaying()
    {
        if(gameStart == false)
        {
            play();
        }
    }

    // this section will call all the methods to run the game
    createGrid();
    placeSnake();
    
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