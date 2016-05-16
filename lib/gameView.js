function GameView(game, ctx) {
  this.game = game;
  this.ctx = ctx;
}

GameView.prototype.start = function() {
  var game = this.game;
  var ctx = this.ctx;
  this.bindKeyHandlers();

  function animate() {
    game.step();
    game.draw(ctx);
    requestAnimationFrame(animate);
  }

  animate();
};

GameView.prototype.bindKeyHandlers = function(){
  var ship = this.game.ship;
  key("up", ship.power.bind(ship, 1));
  key("left", ship.steer.bind(ship, -0.3));
  key("right", ship.steer.bind(ship, 0.3));
  key("space", ship.fireBullet.bind(ship));
};

module.exports = GameView;
