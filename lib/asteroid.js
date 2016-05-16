var Util = require("./util.js");

function Asteroid(params) {

  params.color = Asteroid.COLOR;
  params.radius = Asteroid.RADIUS;
  params.pos = randomVec( ?????? ); // TODO Figure this argument passing situation out

  MovingObject.call(this, params);
}

Asteroid.COLOR = 'grey';
Asteroid.RADIUS = 'grey';
