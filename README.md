frontend-nanodegree-arcade-game
===============================

Students should use this rubric: https://www.udacity.com/course/viewer#!/c-ud015/l-3072058665/m-3072588797

for self-checking their submission.

Frogger game
------------

Overview
--------
In this game you have a Player and Enemies (Bugs). The goal of the player is
to reach the water, without colliding into any one of the enemies. The player
can move left, right, up and down. The enemies move in varying speeds on the
paved block portion of the scene. Once a the player collides with an enemy, 
the game is reset and the player moves back to the start square. Once the 
player reaches the water the game is won.

How To Play
-----------
To start the game, double click the index.html file. This will start up the
game with the player in the lower center position and the enemies/bugs racing 
across the screen.

Use the up, down, left, and right keys to move accordingly across the screen. 
You will not be allowed to move off of the screen. Avoid the bugs and help the 
player get to the water tiles.

For the game to work, copy all files and folders to any location on your 
computer. The location is not important, only the relative paths between the 
files is important.

There are no known bugs in this game code.

Code Overview
-------------
This project consists of the following files:
- index.html
- Sources.txt
- README.js
- README.md
- PNG images
- style.css
- app.js
- engine.js
- resources.js

app.js
------
This JS file is where all of my work was done to get the project running.

In this file, I started by creating a superclass called GameCharacter that
set the position for the player and enemies.
var GameCharacter = function(x,y){
    this.x = x;
    this.y = y;
};

I created a constructor for the Enemy objects that called GameCharacter
to set the postion and saved the enemy image and speed.
var Enemy = function(x,y, speed) {
    GameCharacter.call(this, x, y);
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
};

I created a constructor for the Player objects that called GameCharacter
to set the position and saved the player image.
var Player = function(x,y) {
    GameCharacter.call(this, x, y);
    this.sprite = 'images/char-boy.png';
};

I create an array of Y positions representing rows for enemies to cross.
These Y positions are where the enemies are placed at the beginning of the
game and after they have crossed the screen.
var yPosition = [60,144,228];

I added the speed variable to the update method as well as checked to speed
if the enemy has moved completely across the screen. If so, randomly select
the row and speed for the next enemy crossing.
Enemy.prototype.update = function(dt) {
    this.x += this.speed * dt;

    if (this.x > 600) {
        this.y = yPosition[Math.floor(Math.random() * yPosition.length)];
        this.speed = (Math.ceil(Math.random() * 3) * 100);
        this.x = -120;
    }

    this.checkCollisions();
};

I added the drawImage function call with the correct arguments.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

I added the checkCollisions function to check if player collided with enemy.
Enemy.prototype.checkCollisions = function() {
    allEnemies.forEach(function(enemy) {
        if(enemy.x < player.x + 50 &&
           enemy.x + 70 > player.x &&
           enemy.y < player.y + 50 &&
           enemy.y + 70 > player.y) {
                player.reset();
        }
    });
};

I added the Player update function to call render player and also reset to the
original position if the player makes it to the water.
Player.prototype.update = function(dt) {
    if(this.y < 20) {
        player.render();
        player.reset();
    }
};

I added the drawImage function call with the correct arguments.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

I added the handleInput function to handle keyboard entry using the string 
passed and checked to make sure the player does not move off of the screen.
Player.prototype.handleInput = function(direction){
    if(direction === 'left' && this.x > 25){
        this.x -=100;
    }
    if(direction === 'up' && this.y > 50){
        this.y -= 82.5;
    }
    if(direction === 'right' && this.x < 400){
        this.x += 100;
    }
    if(direction === 'down' && this.y < 400){
        this.y +=82.5;
    }
};

I added reset function to move player back to start.
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

I instantiated 3 enemies and 1 player. I placed all 3 enemies in the allEnemies
array. allEnemies array is used to check for a collision by using a forEach 
loop.
var enemy1 = new Enemy(-120,60,300);
var enemy2 = new Enemy(-120,144,100);
var enemy3 = new Enemy(-120,228,200);
var player = new Player(200,400);
var allEnemies = [enemy1, enemy2, enemy3];

I added addEventListener to receive user input and call handleInput function.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


style.css
---------
Is the only CSS file for the game. It is extremely simple and provided by Udacity.

engine.js
---------
Is the game engine that continually runs the game. It was provided by Udacity.

resources.js
------------
Is a helper JS file that was provided by Udacity.