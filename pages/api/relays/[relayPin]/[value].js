import { setPin, turnOff, turnOn } from '../../../../helpers/gpio';

export default async function relay(req, res) {
    console.log(req.query);
    const pinNumber = Number(req.query.relayPin);
    const response = Number(req.query.value) > 0 ? turnRelayOn(pinNumber) : turnRelayOff(pinNumber);
    res.status(200).json({ ...req.query, response });
}

function turnRelayOn(pinNumber) {
    const pin = setPin(pinNumber, 'out');
    return turnOn(pin);
}

function turnRelayOff(pinNumber) {
    const pin = setPin(pinNumber, 'out');
    return turnOff(pin);
}