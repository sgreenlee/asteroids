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
