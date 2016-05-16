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

	Asteroids.Util = __webpack_require__(2);
	Asteroids.MovingObject = __webpack_require__(3);
	Asteroids.Game = __webpack_require__(4);
	Asteroids.GameView = __webpack_require__(7);

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
/* 1 */,
/* 2 */
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

	Util.vecAddition = function(vec1, vec2) {
	  return [vec1[0] + vec2[0], vec1[1] + vec2[1]];
	};

	Util.vecAddition = function(vec1, vec2) {
	  return [vec1[0] - vec2[0], vec1[1] - vec2[1]];
	};

	Util.vecPerpendicular = function(vec) {
	  return [-vec[1], vec[0]];
	};

	Util.vecScalar = function(vec, scalar) {
	  return [vec[0] * scalar, vec[1] * scalar];
	};

	Util.vecDistance = function(pos1, pos2) {
	  return Math.sqrt(Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2));
	};

	Util.rotateVec = function (vec, angle) {
	  x = vec[0] * Math.cos(angle) - vec[1] * Math.sin(angle);
	  y = vec[0] * Math.sin(angle) + vec[1] * Math.cos(angle);

	  return [x, y];
	};

	module.exports = Util;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(2);

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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(2);
	var Asteroid = __webpack_require__(5);
	var Ship = __webpack_require__(6);
	var Bullet = __webpack_require__(8);

	function Game() {
	  this._asteroids = [];
	  this._bullets = [];
	  this.addAsteroids();
	  this.ship = new Ship({ game: this, pos: this.randomPosition() });
	}

	// TODO: set these constants
	Game.DIM_X = 800 ;
	Game.DIM_Y = 600 ;
	Game.NUM_ASTEROIDS = 3 ;

	Game.prototype.randomPosition = function() {
	  return Util.randomVec(0, Game.DIM_X, 0, Game.DIM_Y);
	};

	Game.prototype.addAsteroids = function() {
	  for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
	    this._asteroids.push(new Asteroid({ game: this, pos: this.randomPosition() }));
	  }
	};

	Game.prototype.draw = function(ctx) {
	  var objects = this.allObjects();
	  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	  for (var i = 0; i < objects.length; i++) {
	    objects[i].draw(ctx);
	  }
	};

	Game.prototype.moveObjects = function() {
	  var objects = this.allObjects();
	  for (var i = 0; i < objects.length; i++) {
	    objects[i].move();
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
	  var objects = this.allObjects();
	  for (var i = 0; i < objects.length - 1; i++) {
	    for (var j = i + 1; j < objects.length; j++) {
	      if (objects[i].isCollidedWith(objects[j])) {
	        this.handleCollision(objects[i], objects[j]);
	      }
	    }
	  }
	};

	Game.prototype.handleCollision = function(object1, object2) {
	  if (object1 instanceof Asteroid && object2 instanceof Ship) {
	    object2.relocate();
	  }
	  else if (object1 instanceof Bullet && object2 instanceof Asteroid){
	    this.remove(object1);
	    this.remove(object2);
	  }
	};

	Game.prototype.allObjects = function () {
	  var objects = this._bullets.slice().concat(this._asteroids.slice());
	  objects.push(this.ship);
	  return objects;
	};

	Game.prototype.step = function () {
	  this.moveObjects();
	  this.checkCollisions();
	};

	Game.prototype.isOutOfBounds = function(pos) {
	  return ( pos[0] < 0 || pos[0] > Game.DIM_X || pos[1] < 0 || pos[1] > Game.DIM_Y);
	};

	module.exports = Game;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(2);
	var MovingObject = __webpack_require__(3);
	// var Ship = require("./ship.js");

	function Asteroid(params) {

	  params.color = Asteroid.COLOR;
	  params.radius = Asteroid.RADIUS;
	  params.vel = Util.randomVec(-5, 5, -5, 5);

	  MovingObject.call(this, params);
	}
	Util.inherits(Asteroid, MovingObject);

	Asteroid.COLOR = 'grey';
	Asteroid.RADIUS = 40;

	// Asteroid.prototype.collideWith = function(otherObject) {
	//   if (otherObject instanceof Ship) {
	//     otherObject.relocate();
	//   }
	// };
	// debugger
	module.exports = Asteroid;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(2);
	var MovingObject = __webpack_require__(3);
	var Bullet = __webpack_require__(8);

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

	  var backward = Util.vecScalar(this.direction, 10);
	  var forward = Util.vecScalar(this.direction, -10);
	  var left = Util.vecScalar(Util.vecPerpendicular(this.direction), -7);
	  var right = Util.vecScalar(Util.vecPerpendicular(this.direction), 7);

	  var p1 = Util.vecAddition(this.pos, forward);
	  var p2 = Util.vecAddition(Util.vecAddition(this.pos, backward), left);
	  var p3 = Util.vecAddition(Util.vecAddition(this.pos, backward), right);

	  ctx.moveTo(p1[0], p1[1]);
	  ctx.lineTo(p2[0], p2[1]);
	  ctx.lineTo(p3[0], p3[1]);
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


/***/ },
/* 7 */
/***/ function(module, exports) {

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
	  key("up", ship.power.bind(ship, 1));
	  key("left", ship.steer.bind(ship, -0.3));
	  key("right", ship.steer.bind(ship, 0.3));
	  key("space", ship.fireBullet.bind(ship));
	};

	module.exports = GameView;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(2);
	var MovingObject = __webpack_require__(3);
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


/***/ }
/******/ ]);