var Util = require("./util.js");
var MovingObject = require("./MovingObject");

function Asteroid(params) {

  params.color = Asteroid.COLOR;
  params.radius = Asteroid.RADIUS;
  params.vel = Util.randomVec(-5, 5, -5, 5);

  MovingObject.call(this, params);
}
Util.inherits(Asteroid, MovingObject);

Asteroid.COLOR = 'grey';
Asteroid.RADIUS = 40;

module.exports = Asteroid;
