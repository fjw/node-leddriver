node-leddriver
==============

This is a **node.js** library to control a SPI led driver.

I wrote this to control my [Adafruit 24-Channel 12-bit PWM LED Driver](https://www.adafruit.com/products/1429) using the **TLC5947** with my **Raspberry Pi**.
This should also work with different SPI devices or host systems but my examples referr to this configuration.
It could also be used for other PWM modules like motor controls etc.

### Installation

```sh
npm install leddriver
```

### Initialization

```js
var LEDDRIVER = require("leddriver");
var driver = new LEDDRIVER(24, 12);
```

parameters:
* the `number of channels` your leddriver has
* the `bits per channel` of your leddriver
* (optional) the name of the SPI device (if omitted `/dev/spidev0.0` as defined in [https://github.com/fjw/node-simplespi](node-simplespi))

### Directly setting values

```js
driver.set(5, 819);
```
parameters:
* the channelnumber to set (0 to `number of channels` - 1)
* the direct value to set in the channel

This example sets the value of channel 5 to 500. The maximum allowed value depends on the `bits per channel` of your device. Since I am using a 12bit SPI device it has 3 hexadecimal digits per channel ("000" to "FFF"). In decimal this is a value between 0 and 4095.

### Percentage value setting
```js
driver.pset(5, 0.2);
```

* the channelnumber to set (0 to `number of channels` - 1)
* the percentage to set in the channel (0 - 1)

This example sets the value of channel 5 to 0.2 * maximum value. In my 12bit example this has exactly the same result like the first example (0.2 * 4095 = 819) but it is far easier to use like this.

### Sending the values to your driver
```js
driver.send();
```
This updates your led driver by sending the values.

### Example
```js
var LEDDRIVER = require("leddriver");
var driver = new LEDDRIVER(24, 12);

driver.pset(0, 1);
driver.pset(1, 0);
driver.pset(2, 1);
driver.send();

setTimeout(function() {

    driver.pset(0, 0.5);
    driver.pset(1, 0.5);
    driver.pset(2, 0.5);
    driver.send();

}, 5000);
```

When running this example the LEDs connected to channel 0 and 2 should be fully turned on while channel 1 is off. After 5 seconds all the LEDs go to half brightness.

### setting RGB-LEDs

The library also includes a helper for setting RGB-LEDs to a color defined in csslike hex style:
```js
driver.setRGB("#e010ff", 0, 1, 2);
```

parameters:
* the color to set as hexcode
* the channel of the red LED
* the channel of the green LED
* the channel of the blue LED
* (optional) the channel of the second blue LED


### Wiring the Raspberry Pi (example with adafruit led driver)

Connect your Pi like this to the LED driver:

|Raspberr Pi|led driver|
|GND|GND|
|5V or 3.3V (or external)|input V+|
|SCLK|input CLK|
|MOSI|input DIN|
|CE0|input LAT|

Connect `/OE` on the LED driver to `GND` or to a GPIO of your choice (you can quickly turn off all LEDs by using a GPIO).

**I am not responsible for any damages to your hardware. Use this at your own risk.**

