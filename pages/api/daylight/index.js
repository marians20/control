import { getSunrise, getSunset } from 'sunrise-sunset-js';

export default function action(req, res) {
    return res.status(200).json({
        sunrise: getSunrise(47.1620214, 27.5629012042697),
        sunset: getSunset(47.1620214, 27.5629012042697)
    });
}