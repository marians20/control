const Gpio = require('onoff').Gpio;

/**
 *
 * @param {*} pin (GIPO pin number)
 * @param {*} direction ('in' or 'out')
 * @returns a GPIO Pin
 */

const _pins = {};

const getPins = () => _pins;

/**
 *
 * @param {*} pin GPIO pin number
 * @param {*} direction can be 'in', 'out', 'high' or 'low'
 * @returns an instance of Gpio
 */
const setPin = (pin, direction) => {
    if(direction.toUpperCase() === 'HIGH') {
        _pins[pin] = 1;
    }

    if(direction.toUpperCase() === 'LOW') {
        _pins[pin] = 0;
    }

    return new Gpio(pin, direction);
}

/**
 * sets GPIO pin output to HIGH
 * @param {*} pin an instance of Gpio retrieved by using setPin method
 * @returns an array with known Gpio pins and their latest output values
 */
const turnOn = async (pin) => {
    _pins[pin._gpio] = 1;
    await pin.write(Gpio.HIGH);
    return _pins;
}

/**
 * sets GPIO pin output to LOW
 * @param {*} pin an instance of Gpio retrieved by using setPin method
 * @returns an array with known Gpio pins and their latest output values
 */
const turnOff = async (pin) => {
    await pin.write(Gpio.LOW);
    _pins[pin._gpio] = 0;
    return _pins;
}

/**
 * toggles the GPIO pin output value
 * @param {*} pin an instance of Gpio retrieved by using setPin method
 * @returns an array with known Gpio pins and their latest output values
 */
const toggle = async (pin) => {
    const oldValue = _pins[pin._gpio] ?? Gpio.LOW;
    console.log(_pins[pin._gpio], oldValue);
    return oldValue === Gpio.LOW ? await turnOn(pin) : await turnOff(pin);
}

export { setPin, turnOff, turnOn, toggle, getPins }
