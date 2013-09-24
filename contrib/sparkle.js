/*
 sparkle.js

 @author Justin J. Novack <jnovack@gmail.com>
 @copyright 2013
 @license MIT

 Random sparkling demonstration.

 */
var driver = require("leddriver")(24, 12, "/dev/spidev0.0");

colors = [
  '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#00FFFF',
  '#FF00FF', '#FFFFFF', '#FFA500', '#9B30FF', '#F660AB'
];

(function sparkle(colors) {
  var num = Math.floor((Math.random()*colors.length));
  driver.setRGB(colors[num], 0, 1, 2);
  driver.send();
  setTimeout(function() { sparkle(colors) }, 10);
})(colors);
