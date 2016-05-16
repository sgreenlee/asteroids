function GameView(game, ctx) {
  this.game = game;
  this.ctx = ctx;
}

GameView.prototype.start = function() {
  var game = this.game;
  var ctx = this.ctx;
  this.bindKeyHandlers();
  setInterval(function(){
    game.step();
    game.draw(ctx);
  }, 20);
};

GameView.prototype.bindKeyHandlers = function(){
  var ship = this.game.ship;
  key("up", ship.power.bind(ship, [1, 1]));
  key("left", ship.steer.bind(ship, -0.4));
  key("right", ship.steer.bind(ship, 0.4));
};

module.exports = GameView;
