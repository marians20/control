import {setPin, turnOff, turnOn} from '../../../../helpers/gpio';

export default async function relay(req, res) {
    console.log(req.query);
    const pin = setPin(Number(req.query.relayPin), 'out');
    const response = Number(req.query.value) > 0 ? turnOn(pin): turnOff(pin);
    res.status(200).json({ ...req.query, response });
}