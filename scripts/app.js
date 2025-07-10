// the init method will be called after the page loads;
function init()
{
    // this section holds the html elements
    const gridEl = document.querySelector(".grid");

    // grid data
    const cells = [];
    const gridWidth = 10;
    const numberOfCells = gridWidth * gridWidth;
    let gameStart = false;
    let gameEnd = false;

    // these variables will be responsible for keeping track of the player position and info
    let snakePosition = 25;
    let snakeLength = 1;
    let snakeDir = 1;

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
        cells[snakePosition].classList.add("snake");
    }

    function removeSnake()
    {
        cells[snakePosition].classList.remove("snake");
    }

    // this method will be called once every frame to force the player to move
    function play()
    {
        

        setInterval(() => 
        {
            if(gameStart)
            {
                removeSnake();
                snakePosition += snakeDir;
                placeSnake();
            }

        }, 1000);
    }
    

    // this section will call all the methods to run the game
    createGrid();
    play();
    
    // this section will handle player input
    document.addEventListener('keydown', function(event)
    {
        gameStart = true;
        
        if(event.key == "w")
        {
            snakeDir = -10;
        }
        if(event.key == "s")
        {
            snakeDir = 10;
        }
        if(event.key == "d")
        {
            snakeDir = 1;
        }
        if(event.key == "a")
        {
            snakeDir = -1;
        }
    });
}



document.addEventListener('DOMContentLoaded', init);