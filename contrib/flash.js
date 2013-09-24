/*
 flash.js

 @author Justin J. Novack <jnovack@gmail.com>
 @copyright 2013
 @license MIT

 Random flashing demonstration.

 */
var driver = require("leddriver")(24, 12, "/dev/spidev0.0");

(function flash() {
  var num = Math.floor(Math.random()*25);
  if (num === 1) {
    driver.setRGB('#FFFFFF', 0, 1, 2);
  } else {
    driver.setRGB('#000000', 0, 1, 2);
  }
  driver.send();
  setTimeout(function() { flash() }, 10);
})();
