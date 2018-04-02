# homebridge-phat-beat

An homebridge plugin for controlling pHAT BEAT LEDs as RGB Bulb HomeKit accessory.
Based on [homebridge-fake-rgb](https://github.com/EdJoPaTo/homebridge-fake-rgb).

# Installation

Follow the instruction in [homebridge](https://www.npmjs.com/package/homebridge) for the homebridge server installation. The plugin is published through [NPM](https://www.npmjs.com/package/homebridge-phat-beat) and should be installed "globally" by typing:

```bash
npm install -g homebridge-phat-beat
```

# Configuration

Remember to configure the plugin in config.json in your home directory inside the .homebridge directory.

```json
"accessories": [{
    "accessory": "pHAT-BEAT",
    "name": "RGB Bulb"
}]
```

Configuration parameters:

- "accessory": "pHAT-BEAT",
- "name": "PUT THE NAME OF YOUR BULB HERE",

Look for a sample config in [config.json example](https://github.com/roblan/homebridge-phat-beat/blob/master/config-sample.json)
