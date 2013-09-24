/*
 cycle.js

 @author Justin J. Novack <jnovack@gmail.com>
 @copyright 2013
 @license MIT

 Simple color cycling demonstration.

 */
var driver = new require("leddriver")(24, 12, "/dev/spidev0.0");

(function changeColor() {
  console.log('On');
  driver.setRGB("#ffffff", 0, 1, 2);
  driver.send();

  setTimeout(function() { console.log('Red'); driver.setRGB("#ff0000", 0, 1, 2); driver.send(); }, 2000);
  setTimeout(function() { console.log('Green'); driver.setRGB("#00ff00", 0, 1, 2); driver.send(); }, 4000);
  setTimeout(function() { console.log('Blue'); driver.setRGB("#0000ff", 0, 1, 2); driver.send(); }, 6000);
  setTimeout(function() { console.log('Off'); driver.setRGB("#000000", 0, 1, 2); driver.send(); }, 8000);
  setTimeout(function() { changeColor();}, 10000);
})();

