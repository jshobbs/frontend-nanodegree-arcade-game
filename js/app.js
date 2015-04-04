// Superclass
var GameCharacter = function(x,y,imageSprite){
    this.x = x;
    this.y = y;
    this.sprite = imageSprite;
};

// Create an array of Y positions representing rows for enemies to cross
var yPosition = [60,144,228];

// Enemies our player must avoid
var Enemy = function(x,y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    GameCharacter.call(this, x, y, 'images/enemy-bug.png');
    this.speed = speed;
};

Enemy.prototype = Object.create(GameCharacter.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // Code to check if enemy has crossed screen, if so, place it
    // back on the left-side and randomly choose the row.
    if (this.x > 600) {
        this.y = yPosition[Math.floor(Math.random() * yPosition.length)];
        this.speed = (Math.ceil(Math.random() * 3) * 100);
        this.x = -120;
    }

    this.checkCollisions();
};

// Check for collision between enemy and player
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

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
    GameCharacter.call(this, x, y, 'images/char-boy.png');
};

Player.prototype = Object.create(GameCharacter.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(dt) {
    if(this.y < 20) {
        player.render();
        player.reset();
    }
};

// Draw the enemy or player on the screen, required method for game
GameCharacter.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Handle keyboard entry with the string passed
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

// If collision or player reaches water, reset player to start.
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 400;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(-120,60,300);
var enemy2 = new Enemy(-120,144,100);
var enemy3 = new Enemy(-120,228,200);
var player = new Player(200,400);
var allEnemies = [enemy1, enemy2, enemy3];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});