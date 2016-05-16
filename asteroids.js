window.Asteroids = {};

Asteroids.Util = require("./lib/util.js");
Asteroids.MovingObject = require("./lib/MovingObject");
Asteroids.Game = require("./lib/game");
Asteroids.GameView = require("./lib/gameView");

var canvas = document.getElementById('game-canvas');
var ctx = canvas.getContext("2d");

var game = new Asteroids.Game();
//
window.gameView = new Asteroids.GameView(game, ctx);
gameView.start();

// var centerX = canvas.width / 2;
// var centerY = canvas.height / 2;
// var radius = 70;
//
// ctx.beginPath();
// ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
// ctx.fillStyle = 'green';
// ctx.fill();
// ctx.lineWidth = 5;
// ctx.strokeStyle = '#003300';
// ctx.stroke();
