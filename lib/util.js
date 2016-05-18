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
