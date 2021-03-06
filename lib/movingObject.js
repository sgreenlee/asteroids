var Util = require("./util.js");

function MovingObject(params) {
  this.game = params.game;
  this.pos = params.pos;
  this.color = params.color;
  this.vel = params.vel;
  this.radius = params.radius;
}

MovingObject.prototype.move = function(delta) {
  this.pos[0] += this.vel[0] * delta;
  this.pos[1] += this.vel[1] * delta;
  if (this.game.isOutOfBounds(this.pos)){
    if (this.isWrappable) {
      this.pos = this.game.wrap(this.pos);
    } else {
      this.game.remove(this);
    }
  }
};

MovingObject.prototype.draw = function(ctx) {
  var xCoord = this.pos[0];
  var yCoord = this.pos[1];
  ctx.beginPath();
  ctx.arc(xCoord, yCoord, this.radius, 0, 2 * Math.PI, false);
  ctx.fillStyle = this.color;
  ctx.fill();
  ctx.linewidth = 3;
  ctx.strokeStyle = '#003300';
  ctx.stroke();
};

MovingObject.prototype.isCollidedWith = function(otherObject) {
  var distance = Util.vecDistance(this.pos, otherObject.pos);
  return (distance < this.radius + otherObject.radius);
};

MovingObject.prototype.collideWith = function(otherObject) {

};

MovingObject.prototype.isWrappable = true;

module.exports = MovingObject;
