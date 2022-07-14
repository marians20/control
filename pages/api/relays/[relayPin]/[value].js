import * as gpio from '../../../../helpers/gpio';

export default async function relay(req, res) {
    const pinNumber = Number(req.query.relayPin);
    let response;
    switch (Number(req.query.value)) {
        case 0:
            response = await turnOff(pinNumber);
            break;
        case 1:
            response = await turnOn(pinNumber);
            break;
        default:
            response = await toggle(pinNumber);
            break
    }
    res.status(200).json({ ...req.query, response });
}

async function turnOn(pinNumber) {
    const pin = gpio.setPin(pinNumber, 'out');
    return await gpio.turnOn(pin);
}

async function turnOff(pinNumber) {
    let pin = gpio.setPin(pinNumber, 'out');
    return await gpio.turnOff(pin);
}

async function toggle(pinNumber) {
    let pin = gpio.setPin(pinNumber, 'out');
    return await gpio.toggle(pin);
}