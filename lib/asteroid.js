var Util = require("./util.js");

function Asteroid(params) {

  params.color = Asteroid.COLOR;
  params.radius = Asteroid.RADIUS;
  params.vel = Util.randomVec(-5, 5, -5, 5);

  MovingObject.call(this, params);
}

Asteroid.COLOR = 'grey';
Asteroid.RADIUS = 'grey';
