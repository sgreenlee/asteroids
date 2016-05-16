var Util = require("./util.js");

function Game() {
  this.addAsteroids();
}

// TODO: set these constants
Game.DIM_X = 800 ;
Game.DIM_Y = 600 ;
Game.NUM_ASTEROIDS = 15 ;

Game.prototype.randomPosition = function() {
  return Util.randomVec(0, Game.DIM_X, 0, Game.DIM_Y);
};

Game.prototype.addAsteroids = function() {
  if (this._asteroids === undefined) this._asteroids = [];
  for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
    this._asteroids.push(new Asteroid({ pos: this.randomPosition() }));
  }
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect();
  for (var i = 0; i < this._asteroids.length; i++) {
    this._asteroids[i].draw(ctx);
  }
};

Game.prototype.moveObjects = function() {
  for (var i = 0; i < this._asteroids.length; i++) {
    this._asteroids[i].move();
  }
};

module.exports = Game;
