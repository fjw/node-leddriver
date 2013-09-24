/*
 pulse.js

 @author Justin J. Novack <jnovack@gmail.com>
 @copyright 2013
 @license MIT

 Pulsing demonstration.

 */
var driver = require('leddriver')(24, 12, "/dev/spidev0.0");

var step = 0.025;

(function fade(color, direction, delay) {
  driver.pset(0, color);
  driver.pset(1, color);
  driver.pset(2, color);
  driver.send();
  direction ? color += step : color -= step;
  if (color <= 0 || color >= 1) { direction = !direction; }
  setTimeout(function() { fade(color, direction, 1)}, delay);
})(0, true, 1);
