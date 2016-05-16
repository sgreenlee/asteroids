var Util = require("./util.js");
var MovingObject = require("./movingObject");
// var Ship = require("./ship.js");

function Asteroid(params) {

  params.color = Asteroid.COLOR;
  if (params.radius === undefined) {
    params.radius = Asteroid.RADIUS;
  }
  params.vel = Util.randomVec(-0.3, 0.3, -0.3, 0.3);

  MovingObject.call(this, params);
}
Util.inherits(Asteroid, MovingObject);

Asteroid.COLOR = 'grey';
Asteroid.RADIUS = 30;

Asteroid.prototype.explode = function() {
  this.game.remove(this);
  var rad = this.radius - 10;
  if (rad === 0) return;
  for (var i = 0; i < 3; i++) {
    this.game._asteroids.push( new Asteroid({
      pos: this.pos,
      vel: Util.randomVec(-0.3, 0.3, -0.3, 0.3),
      radius: rad,
      game: this.game
    }));
  }
};

module.exports = Asteroid;
