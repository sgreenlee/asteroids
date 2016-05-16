/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	window.Asteroids = {};

	Asteroids.Util = __webpack_require__(1);
	Asteroids.MovingObject = __webpack_require__(2);
	Asteroids.Game = __webpack_require__(3);
	Asteroids.GameView = __webpack_require__(5);

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


/***/ },
/* 1 */
/***/ function(module, exports) {

	var Util = {};

	Util.inherits = function(childClass, parentClass) {
	  function Surrogate(){}
	  Surrogate.prototype = parentClass.prototype;
	  childClass.prototype = new Surrogate();
	  childClass.prototype.constructor = childClass;
	};

	Util.randomVec = function (xMin, xMax, yMin, yMax) {
	  var xRange = xMax - xMin;
	  var yRange = yMax - yMin;
	  var xCenter = (xMax + xMin)/2;
	  var yCenter = (yMax + yMin)/2;

	  var x = Math.random() * xRange + (xCenter - xRange/2);
	  var y = Math.random() * yRange + (yCenter - yRange/2);

	  return [x, y];
	};

	Util.vecDistance = function(pos1, pos2) {
	  return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2));
	};

	module.exports = Util;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(1);

	function MovingObject(params) {
	  this.game = params.game;
	  this.pos = params.pos;
	  this.color = params.color;
	  this.vel = params.vel;
	  this.radius = params.radius;
	}

	MovingObject.prototype.move = function() {
	  this.pos[0] += this.vel[0];
	  this.pos[1] += this.vel[1];
	  this.pos = this.game.wrap(this.pos);
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

	module.exports = MovingObject;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(1);
	var Asteroid = __webpack_require__(4);

	function Game() {
	  this.addAsteroids();
	}

	// TODO: set these constants
	Game.DIM_X = 800 ;
	Game.DIM_Y = 600 ;
	Game.NUM_ASTEROIDS = 3 ;

	Game.prototype.randomPosition = function() {
	  return Util.randomVec(0, Game.DIM_X, 0, Game.DIM_Y);
	};

	Game.prototype.addAsteroids = function() {
	  if (this._asteroids === undefined) this._asteroids = [];
	  for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
	    this._asteroids.push(new Asteroid({ game: this, pos: this.randomPosition() }));
	  }
	};

	Game.prototype.draw = function(ctx) {
	  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	  for (var i = 0; i < this._asteroids.length; i++) {
	    this._asteroids[i].draw(ctx);
	  }
	};

	Game.prototype.moveObjects = function() {
	  for (var i = 0; i < this._asteroids.length; i++) {
	    this._asteroids[i].move();
	  }
	};

	Game.prototype.wrap = function(pos) {
	  var x = (pos[0] + (Game.DIM_X)) % Game.DIM_X;
	  var y = (pos[1] + (Game.DIM_Y)) % Game.DIM_Y;
	  return [x,y];
	};

	Game.prototype.remove = function(asteroid) {
	  var asteroidIdx = this._asteroids.indexOf(asteroid);
	  if (asteroidIdx !== -1) this._asteroids.splice(asteroidIdx, 1);
	};

	Game.prototype.checkCollisions = function () {
	  for (var i = 0; i < this._asteroids.length - 1; i++) {
	    for (var j = i + 1; j < this._asteroids.length; j++) {
	      if (this._asteroids[i].isCollidedWith(this._asteroids[j])) {
	        var asteroid1 = this._asteroids[i];
	        var asteroid2 = this._asteroids[j];
	        this.remove(asteroid1);
	        this.remove(asteroid2);
	      }
	    }
	  }
	};

	Game.prototype.step = function () {
	  this.moveObjects();
	  this.checkCollisions();
	};

	module.exports = Game;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(1);
	var MovingObject = __webpack_require__(2);

	function Asteroid(params) {

	  params.color = Asteroid.COLOR;
	  params.radius = Asteroid.RADIUS;
	  params.vel = Util.randomVec(-5, 5, -5, 5);

	  MovingObject.call(this, params);
	}
	Util.inherits(Asteroid, MovingObject);

	Asteroid.COLOR = 'grey';
	Asteroid.RADIUS = 40;

	module.exports = Asteroid;


/***/ },
/* 5 */
/***/ function(module, exports) {

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


/***/ }
/******/ ]);