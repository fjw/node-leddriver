var spi = require( "simplespi");

/*
 Led-Driver over SPI-Interface

 @copyright 2013 Frederic Worm (MIT-License)


 Example For Adafruit 24-Channel 12bit - PWM / Led-Driver:

 var LEDDRIVER = require("leddriver");
 var ld = new LEDDRIVER(24, 12);

 ld.set(0, 4095);
 ld.set(1, 1000);
 ld.send();
 */
exports = module.exports = function(channelcount, bitperchannel, spidevice) {
    var obj = {

        _chanlen: 0,
        _values: [],
        inverted: false,
        rgbleds: [],

        _init: function(channelcount, bitperchannel) {

            this._chanlen = parseInt(bitperchannel / 4);

            for( var i = 0; i < channelcount; i++) {
                this._values[i] = 0;
            }

        },

        _getRegister: function() {

            var reg = "";
            for( var i = channelcount - 1; i >= 0; i--) {

                var val = this._values[i].toString(16);

                while(val.length < this._chanlen) {
                    val = "0" + val;
                }

                reg += val;

            }

            return reg;
        },

        invert: function() {

            this.inverted = !this.inverted;
            
        },

        set: function(channelnum, value) {

            if(channelnum > channelcount || channelnum < 0) {
                return false;
            }
            if(value < 0) {
                value = 0;
            }

            var limit = Math.pow(16, this._chanlen);
            if(value >= limit) {
                value = limit - 1;
            }

            this._values[channelnum] = value;
            return true;
        },

        send: function() {
            if(typeof(spidevice) != "undefined") {
                return spi.send(this._getRegister(), spidevice);
            } else {
                return spi.send(this._getRegister());
            }
        },

        pset: function(channelnum, pvalue) {

            if(channelnum > channelcount || channelnum < 0) {
                return false;
            }
            if(pvalue < 0) {
                pvalue = 0;
            }
            if(pvalue > 1) {
                pvalue = 1;
            }

            this._values[channelnum] = Math.floor((Math.pow(16, this._chanlen) - 1) * pvalue);
            return true;
        },

        setRGB: function(hexcolor, redchannel, greenchannel, bluechannel, bluechannel2) {

            var rgb = this._getRGBfromHex(hexcolor);

            if(this.inverted) {
              rgb.r = 1 - rgb.r;
              rgb.g = 1 - rgb.g;
              rgb.b = 1 - rgb.b;
            }
            
            if(Array.isArray(redchannel)) {
              redchannel.forEach(function(chan) {
                this.pset(chan, rgb.r);
              });
            } else {
              this.pset(redchannel, rgb.r);
            }
            
            if(Array.isArray(greenchannel)) {
              greenchannel.forEach(function(chan) {
                this.pset(chan, rgb.g);
              });
            } else {
              this.pset(greenchannel, rgb.g);
            }
            
            if(Array.isArray(bluechannel)) {
              bluechannel.forEach(function(chan) {
                this.pset(chan, rgb.b);
              });
            } else {
              this.pset(bluechannel, rgb.b);
            }

        },

        _getRGBfromHex: function(color) {
            var r, g, b;
            if (color.length == 4) {
                r = parseInt(color.replace("#", "").substr(0,1)+color.replace("#", "").substr(0,1),16) / 255;
                g = parseInt(color.replace("#", "").substr(1,1)+color.replace("#", "").substr(1,1),16) / 255;
                b = parseInt(color.replace("#", "").substr(2,1)+color.replace("#", "").substr(2,1),16) / 255;
            }
            if (color.length == 7) {
                r = parseInt(color.replace("#", "").substr(0,2),16) / 255;
                g = parseInt(color.replace("#", "").substr(2,2),16) / 255;
                b = parseInt(color.replace("#", "").substr(4,2),16) / 255;
            }

            if (r>=0 && r<=1 && g>=0 && g<=1 && b>=0 && b<=1) {
                return {r:r,g:g,b:b};
            } else {
                return {r:0,g:0,b:0};
            }

        }


    };

    obj._init(channelcount, bitperchannel);
    return obj;
};
