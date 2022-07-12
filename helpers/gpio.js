const Gpio = require('onoff').Gpio;

/**
 *
 * @param {*} pin (GIPO pin number)
 * @param {*} direction ('in' or 'out')
 * @returns a GPIO Pin
 */

const _pins = {};

const getPins = () => _pins;

const setPin = (pin, direction) => {
    if(direction.toUpperCase() === 'HIGH') {
        _pins[pin] = 1;
    }

    if(direction.toUpperCase() === 'LOW') {
        _pins[pin] = 0;
    }

    return new Gpio(pin, direction);
}

const turnOn = async (pin) => {
    _pins[pin._gpio] = 1;
    await pin.write(Gpio.HIGH);
    return _pins;
}

const turnOff = async (pin) => {
    await pin.write(Gpio.LOW);
    _pins[pin._gpio] = 0;
    return _pins;
}

const toggle = async (pin) => {
    const oldValue = _pins[pin._gpio] ?? Gpio.LOW;
    console.log(_pins[pin._gpio], oldValue);
    return oldValue === Gpio.LOW ? await turnOn(pin) : await turnOff(pin);
}

export { setPin, turnOff, turnOn, toggle, getPins }
