# Snake Game

![snake game logo](assets/logo.png)

This is a web-based implementation of the Snake game. Developed using HTML for structure, CSS for visual presentation, and JavaScript for game logic, it functions by allowing a player to control a snake that moves across a grid. The objective is to guide the snake to consume fruits, which causes the snake to grow longer. The game ends if the snake collides with its own body, rocks or the boundaries of the game area.

## Project Brief

the idea of the snake game is to eat fruits and grow longer till the player reaches a highscore or take the crown in order to go to the next level.
* Create a grid-based game suitable for desktop browsers.
* Design a way for players to win or lose the game and feed this back.
* Use HTML, CSS, and Vanilla JavaScript.
* The game should be playable for one player.
* the game should have enemies.
* Deploy the game online for the world to enjoy.


## Technologies

* HTML5
* CSS3
* JavaScript ES6
* Git

### Grid Design

I started with a grid of divs as this would allow me to accurately place the sprite and obstacles on the game board. I decided to use this method over using a canvas so that I could practice using 2D arrays.

I made a grid spawner that will spawn the cells of the grid based on the width an height variables, and in some scripts there is an array that allows me to visualize and spawn some objects like rocks, keys, doors, and the player.

![grid image](assets/grid.png)

## Game Mechanics

### Snake Movement
The snake moves based on the numbers on the grid

### Snake Sprite
This is achieved by making each picture of the snake divided into a state(Head,Body,Tail, etc...), and by making the pictures into backgrounds of classes, these classes will be added to cells and in each interval before placing the classes the grid will remove all the snake classes.

## Getting Started

### Installation

1. Clone the repo\
`git clone https://github.com/CodingSea/snake-game.git`
2. Open snake-game folder
3. Run index.html

## Additional features

* More Levels
* More Enemies
* World-Wide Highscore

## Attributions
* snake sprites url: [snake](https://rembound.com/articles/creating-a-snake-game-tutorial-with-html5)
* door sprite url: [door](https://www.pngkey.com/detail/u2q8y3a9e6r5i1t4_lpc-doors-animated-1-2d-door-sprite/)
* Sound Effect by [Pixabay](https://pixabay.com/users/driken5482-45721595/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=236677)

## In Conclusion

All in all, this was a fun project with plenty of creative scope, I'm pleased with the styling and think that I have the basis of a fun and playable game.
