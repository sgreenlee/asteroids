var Util = require("./util");
var MovingObject = require("./movingObject");
// debugger

function Bullet (params) {
  params.color = Bullet.COLOR;
  params.radius = Bullet.RADIUS;
  params.vel[0] *= Bullet.VELOCITY_MULTIPLIER;
  params.vel[1] *= Bullet.VELOCITY_MULTIPLIER;

  MovingObject.call(this, params);

  this.isWrappable = false;
}
Util.inherits(Bullet, MovingObject);

Bullet.COLOR = 'yellow';
Bullet.RADIUS = 2;
Bullet.VELOCITY_MULTIPLIER = 5;

// Bullet.prototype.collideWith = function(otherObject) {
//   if (otherObject.type === "ASTEROID") {
//     this.game.remove(otherObject);
//   }
// };


module.exports = Bullet;
