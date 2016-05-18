var Util = require("./util.js");
var MovingObject = require("./movingObject");
// var Ship = require("./ship.js");

var trump = document.getElementById("trump");
var cruz = document.getElementById("cruz");
var carson = document.getElementById("carson");
var rubio = document.getElementById("rubio");
var bush = document.getElementById("bush");
var paul = document.getElementById("paul");
var fiorina = document.getElementById("fiorina");
var christie = document.getElementById("christie");
var huckabee = document.getElementById("huckabee");

function Asteroid(params) {

  params.color = Asteroid.COLOR;
  if (params.radius === undefined) {
    params.radius = Asteroid.RADIUS;
  }
  params.vel = Util.randomVec(-0.3, 0.3, -0.3, 0.3);
  MovingObject.call(this, params);
  if (this.radius > 49) {
    this.image = trump;
  }
  else if (this.radius > 39) {
    this.image = [cruz, kasich, rubio, carson][Math.floor(Math.random() * 4)];
  } else {
    this.image = [paul, bush, fiorina, huckabee, christie][Math.floor(Math.random() * 5)];
  }
}

Util.inherits(Asteroid, MovingObject);

Asteroid.COLOR = 'grey';
Asteroid.RADIUS = 50;

"hello";

Asteroid.prototype.explode = function() {
  this.game.remove(this);
  this.radius -= 10;
  var newAsteroids = [];
  if (this.radius < 29) return [];
  for (var i = 0; i < 3; i++) {
    newAsteroids.push( new Asteroid({
      vel: Util.randomVec(-0.3, 0.3, -0.3, 0.3),
      pos: Util.vecAddition(this.pos, Util.vecScalar(this.vel, 0.3)),
      radius: this.radius,
      game: this.game
    }));
  }
  return newAsteroids;
};

Asteroid.prototype.draw = function (ctx) {
  var size = this.radius * 2;
  var xCoord = this.pos[0] - size / 2;
  var yCoord = this.pos[1] - size / 2;
  ctx.drawImage(this.image, xCoord, yCoord, size, size);
}

module.exports = Asteroid;
