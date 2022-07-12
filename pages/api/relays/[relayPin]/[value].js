import { setPin, turnOff, turnOn, toggle } from '../../../../helpers/gpio';

export default async function relay(req, res) {
    const pinNumber = Number(req.query.relayPin);
    let response;
    switch (Number(req.query.value)) {
        case 0:
            response = await turnRelayOff(pinNumber);
            break;
        case 1:
            response = await turnRelayOn(pinNumber);
            break;
        default:
            response = await toggleRelay(pinNumber);
            break
    }
    res.status(200).json({ ...req.query, response });
}

async function turnRelayOn(pinNumber) {
    const pin = setPin(pinNumber, 'out');
    return await turnOn(pin);
}

async function turnRelayOff(pinNumber) {
    let pin = setPin(pinNumber, 'out');
    return await turnOff(pin);
}

async function toggleRelay(pinNumber) {
    let pin = setPin(pinNumber, 'out');
    return await toggle(pin);
}