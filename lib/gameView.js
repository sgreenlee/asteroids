function GameView(game, ctx) {
  this.game = game;
  this.ctx = ctx;
}

GameView.prototype.start = function() {
  var game = this.game;
  var ctx = this.ctx;
  setInterval(function(){
    game.step();
    game.draw(ctx);
  }, 20);
};

module.exports = GameView;
