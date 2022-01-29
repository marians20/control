const Gpio = require('onoff').Gpio;

/**
 * 
 * @param {*} pin (GIPO pin number)
 * @param {*} direction ('in' or 'out')
 * @returns a GPIO Pin
 */
const setPin = (pin, direction) => {
    return new Gpio(pin, direction);
}

const turnOn = (pin) => {
    pin.writeSync(Gpio.HIGH);
    return pin.readSync();
}

const turnOff = (pin) => {
    pin.writeSync(Gpio.LOW);
    return pin.readSync();
}

export {setPin, turnOff, turnOn}
