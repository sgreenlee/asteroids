var Util = require("./util.js");
var MovingObject = require("./movingObject");
// var Ship = require("./ship.js");

function Asteroid(params) {

  params.color = Asteroid.COLOR;
  params.radius = Asteroid.RADIUS;
  params.vel = Util.randomVec(-0.3, 0.3, -0.3, 0.3);

  MovingObject.call(this, params);
}
Util.inherits(Asteroid, MovingObject);

Asteroid.COLOR = 'grey';
Asteroid.RADIUS = 40;

// Asteroid.prototype.collideWith = function(otherObject) {
//   if (otherObject instanceof Ship) {
//     otherObject.relocate();
//   }
// };
// debugger
module.exports = Asteroid;
