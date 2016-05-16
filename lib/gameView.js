function GameView(game, ctx) {
  this.game = game;
  this.ctx = ctx;
}

GameView.prototype.start = function() {
  var game = this.game;
  var ctx = this.ctx;
  this.bindKeyHandlers();
  var oldTime = performance.now();

  function animate(timestamp) {
    if (game.isOver()) {
      ctx.font = "48px sans-serif";
      ctx.fillStyle = "black";
      ctx.fillText("YOU WIN", 300, 300);
    } else {
      var delta = timestamp - oldTime;
      oldTime = timestamp;
      game.step(delta);
      game.draw(ctx);
      requestAnimationFrame(animate);
    }
  }

  animate(1);
};

GameView.prototype.bindKeyHandlers = function(){
  var ship = this.game.ship;
  key("up", ship.power.bind(ship, 0.1));
  key("left", ship.steer.bind(ship, -0.5));
  key("right", ship.steer.bind(ship, 0.5));
  key("space", ship.fireBullet.bind(ship));
};

module.exports = GameView;
