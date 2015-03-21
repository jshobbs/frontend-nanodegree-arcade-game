// Enemies our player must avoid
var Enemy = function(x,y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.yPosition = [60,144,228];
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if (this.x > 600) {
        this.y = this.yPosition[Math.floor(Math.random() * this.yPosition.length)];
        this.speed = (Math.ceil(Math.random() * 3) * 100);
        this.x = -120;
    }
   // console.log(this.yPosition);
    this.checkCollisions();
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Enemy.prototype.checkCollisions = function() {
    allEnemies.forEach(function(enemy) {
        if(enemy.x < player.x + 50 &&
           enemy.x + 70 > player.x &&
           enemy.y < player.y + 50 &&
           enemy.y + 70 > player.y) {
                player.reset();
        }
    });
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// ** My Code
var Player = function(x,y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
}

Player.prototype.update = function(dt) {
    if(this.y < 20) {
        player.render();
        player.reset();
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function(direction){
    if(direction === 'left' && this.x > 25){
        this.x -=100;
    }
    if(direction === 'up' && this.y > 50){
        this.y -= 82.5;
    }
    if(direction === 'right' && this.x < 400){
        this.x += 100;
        console.log(this.x);
    }
    if(direction === 'down' && this.y < 400){
        this.y +=82.5;
    }
}

Player.prototype.reset = function() {
   // player.render();
    console.log("In Reset");
    this.x = 200;
    this.y = 400;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
// ** My Code

var enemy1 = new Enemy(-120,60,300);
var enemy2 = new Enemy(-120,144,100);
var enemy3 = new Enemy(-120,228,200);
var player = new Player(200,400);
var allEnemies = [enemy1, enemy2, enemy3];

// ** My Code

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
