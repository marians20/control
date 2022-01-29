import {setPin, turnOff, turnOn} from '../../../helpers/gpio';

export default async function relay(req, res) {
    console.log(req.query);
    const params = req.query.relayPin;
    const pinNumber = Number(params[0]);
    const direction = 'out';
    const value = Number(params[1]);
    console.log({pin: pinNumber, direction, value});
    const pin = setPin(pinNumber, direction);
    const response = value > 0 ? turnOn(pin): turnOff(pin);
    res.status(200).json({ pinNumber, direction, value, response });
}