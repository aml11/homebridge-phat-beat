const package = require('./package.json');
const colorsys = require('colorsys');
const phatbeat = require('phatbeat');
var Service, Characteristic;

module.exports = function(homebridge) {
	Service = homebridge.hap.Service;
	Characteristic = homebridge.hap.Characteristic;
	homebridge.registerAccessory(package.name, 'pHAT-BEAT', RgbAccessory);
};

function RgbAccessory(log, config) {
	this.log = log;
	this.config = config;
	this.name = config.name;
	this.power = 0;
	this.brightness = 100;
	this.saturation = 0;
	this.hue = 0;
}

RgbAccessory.prototype.setColor = function() {
	var color = colorsys.hsv_to_rgb({
		h: this.hue,
		s: this.saturation,
		v: this.brightness
	});

	if (this.power) {
		if (this.brightness < 10) {
			phatbeat.turnOffAllLEDs(true);
		} else {
			phatbeat.changeAllLEDs(color.r, color.g, color.b, true, this.brightness / 100);
		}
	}
};

RgbAccessory.prototype.getServices = function() {
	var lightbulbService = new Service.Lightbulb(this.name);
	var bulb = this;
	phatbeat.init_led(0.1);
	phatbeat.turnOffAllLEDs(true);

	lightbulbService
		.getCharacteristic(Characteristic.On)
		.on('get', function(callback) {
			callback(null, bulb.power);
		})
		.on('set', function(value, callback) {
			bulb.power = value;
			if (!value) {
				phatbeat.turnOffAllLEDs(true);
			}
			bulb.setColor();
			callback();
		});

	lightbulbService
		.addCharacteristic(Characteristic.Brightness)
		.on('get', function(callback) {
			callback(null, bulb.brightness);
		})
		.on('set', function(value, callback) {
			bulb.brightness = value;
			bulb.setColor();
			callback();
		});

	lightbulbService
		.addCharacteristic(Characteristic.Hue)
		.on('get', function(callback) {
			callback(null, bulb.hue);
		})
		.on('set', function(value, callback) {
			bulb.hue = value;
			bulb.setColor();
			callback();
		});

	lightbulbService
		.addCharacteristic(Characteristic.Saturation)
		.on('get', function(callback) {
			callback(null, bulb.saturation);
		})
		.on('set', function(value, callback) {
			bulb.saturation = value;
			bulb.setColor();
			callback();
		});

	return [lightbulbService];
};
