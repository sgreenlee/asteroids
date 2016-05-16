var Util = require("./util");
var Asteroid = require("./asteroid");
var Ship = require("./ship");
var Bullet = require("./bullet");

function Game() {
  this._asteroids = [];
  this._bullets = [];
  this.addAsteroids();
  this.ship = new Ship({ game: this, pos: this.randomPosition() });
}

// TODO: set these constants
Game.DIM_X = 800 ;
Game.DIM_Y = 600 ;
Game.NUM_ASTEROIDS = 3 ;

Game.prototype.randomPosition = function() {
  return Util.randomVec(0, Game.DIM_X, 0, Game.DIM_Y);
};

Game.prototype.addAsteroids = function() {
  for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
    this._asteroids.push(new Asteroid({ game: this, pos: this.randomPosition() }));
  }
};

Game.prototype.draw = function(ctx) {
  var objects = this.allObjects();
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  for (var i = 0; i < objects.length; i++) {
    objects[i].draw(ctx);
  }
};

Game.prototype.moveObjects = function() {
  var objects = this.allObjects();
  for (var i = 0; i < objects.length; i++) {
    objects[i].move();
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
  var objects = this.allObjects();
  for (var i = 0; i < objects.length - 1; i++) {
    for (var j = i + 1; j < objects.length; j++) {
      if (objects[i].isCollidedWith(objects[j])) {
        this.handleCollision(objects[i], objects[j]);
      }
    }
  }
};

Game.prototype.handleCollision = function(object1, object2) {
  if (object1 instanceof Asteroid && object2 instanceof Ship) {
    object2.relocate();
  }
  else if (object1 instanceof Bullet && object2 instanceof Asteroid){
    this.remove(object1);
    this.remove(object2);
  }
};

Game.prototype.allObjects = function () {
  var objects = this._bullets.slice().concat(this._asteroids.slice());
  objects.push(this.ship);
  return objects;
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.isOutOfBounds = function(pos) {
  return ( pos[0] < 0 || pos[0] > Game.DIM_X || pos[1] < 0 || pos[1] > Game.DIM_Y);
};

module.exports = Game;
