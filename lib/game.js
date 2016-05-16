var Util = require("./util.js");
var Asteroid = require("./asteroid.js");

function Game() {
  this.addAsteroids();
}

// TODO: set these constants
Game.DIM_X = 800 ;
Game.DIM_Y = 600 ;
Game.NUM_ASTEROIDS = 3 ;

Game.prototype.randomPosition = function() {
  return Util.randomVec(0, Game.DIM_X, 0, Game.DIM_Y);
};

Game.prototype.addAsteroids = function() {
  if (this._asteroids === undefined) this._asteroids = [];
  for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
    this._asteroids.push(new Asteroid({ game: this, pos: this.randomPosition() }));
  }
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  for (var i = 0; i < this._asteroids.length; i++) {
    this._asteroids[i].draw(ctx);
  }
};

Game.prototype.moveObjects = function() {
  for (var i = 0; i < this._asteroids.length; i++) {
    this._asteroids[i].move();
  }
};

Game.prototype.wrap = function(pos) {
  var x = (pos[0] + (Game.DIM_X)) % Game.DIM_X;
  var y = (pos[1] + (Game.DIM_Y)) % Game.DIM_Y;
  return [x,y];
};

Game.prototype.remove = function(asteroid) {
  var asteroidIdx = this._asteroids.indexOf(asteroid);
  if (asteroidIdx !== -1) this._asteroids.splice(asteroidIdx, 1);
};

Game.prototype.checkCollisions = function () {
  for (var i = 0; i < this._asteroids.length - 1; i++) {
    for (var j = i + 1; j < this._asteroids.length; j++) {
      if (this._asteroids[i].isCollidedWith(this._asteroids[j])) {
        var asteroid1 = this._asteroids[i];
        var asteroid2 = this._asteroids[j];
        this.remove(asteroid1);
        this.remove(asteroid2);
      }
    }
  }
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
};

module.exports = Game;
