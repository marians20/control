import read from '../../helpers/dht';
import { isDay } from '../../services/daylight-service';

export default async function dht(req, res) {
    try {
        const value = await read(22, 4);
        res.status(200).json({
            time: value.time,
            temperature: value.temperature.toFixed(2),
            humidity: value.humidity.toFixed(2),
            isDay: isDay()
        });
    } catch (error) {
        console.error('ERROR:', error);
        return res.status(500).json(error);
    }
}