var Util = require("./util.js");
var MovingObject = require("./movingObject");
var Bullet = require("./bullet");

function Ship(params) {
  params.color = Ship.COLOR;
  params.radius = Ship.RADIUS;
  params.vel = [0, 0];

  MovingObject.call(this, params);
  this.direction = [1,0];
}
Util.inherits(Ship, MovingObject);

Ship.COLOR = 'green';
Ship.RADIUS = 10;

Ship.prototype.relocate = function() {
  this.pos = this.game.randomPosition();
  this.vel = [0, 0];
};

Ship.prototype.power = function(impulse) {
  this.vel[0] += impulse * this.direction[0];
  this.vel[1] += impulse * this.direction[1];
};

Ship.prototype.steer = function(angle) {
  this.direction = Util.rotateVec(this.direction, angle);
};

Ship.prototype.draw = function(ctx) {
  ctx.beginPath();

  var backward = Util.vecScalar(this.direction, -10);
  var forward = Util.vecScalar(this.direction, 10);
  var left = Util.vecScalar(Util.vecPerpendicular(this.direction), -7);
  var right = Util.vecScalar(Util.vecPerpendicular(this.direction), 7);

  var p1 = Util.vecAddition(this.pos, forward);
  var p2 = Util.vecAddition(Util.vecAddition(this.pos, backward), left);
  var p3 = Util.vecAddition(Util.vecScalar(this.direction, -6), this.pos);
  var p4 = Util.vecAddition(Util.vecAddition(this.pos, backward), right);
  ctx.moveTo(p1[0], p1[1]);
  ctx.lineTo(p2[0], p2[1]);
  ctx.lineTo(p3[0], p3[1]);
  ctx.lineTo(p4[0], p4[1]);
  ctx.closePath();

  ctx.fillStyle = this.color;
  ctx.fill();
  ctx.stroke();
};

Ship.prototype.fireBullet = function() {
  this.game._bullets.push( new Bullet({
    game: this.game,
    pos : this.pos.slice(),
    vel : this.direction.slice()
  }));
};

module.exports = Ship;
