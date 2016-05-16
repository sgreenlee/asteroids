var Util = require("./util.js");
var MovingObject = require("./movingObject");

function Ship(params) {
  params.color = Ship.COLOR;
  params.radius = Ship.RADIUS;
  params.vel = [0, 0];

  MovingObject.call(this, params);
}
Util.inherits(Ship, MovingObject);

Ship.COLOR = 'green';
Ship.RADIUS = 10;

Ship.prototype.relocate = function() {
  this.pos = this.game.randomPosition();
  this.vel = [0, 0];
};

module.exports = Ship;
