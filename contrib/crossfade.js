/*
 crossfade.js

 @author Justin J. Novack <jnovack@gmail.com>
 @copyright 2013
 @license MIT

 Crossfading between colors demonstration.

 */
var driver = require('leddriver')(24, 12, "/dev/spidev0.0");
var Chromath = require('chromath')

var colors = Chromath.gradient('red', 'blue', 60).toString().split(',');

(function cross(colors, delay) {
  var color = colors.shift();
  if (typeof color !== 'undefined') {
    driver.setRGB(color, 0, 1, 2);
    driver.send();
    setTimeout(function() { cross(colors, delay)}, delay);
  }
})(colors, 50);
