import { getSunrise, getSunset } from 'sunrise-sunset-js';
import DateTimeUtils from '../helpers/data-time-utils';
import getConfig from 'next/config';

const getDaylightInfo = () => {
    const { coordinates } = getConfig().serverRuntimeConfig;
    return {
        sunrise: getSunrise(coordinates.latitude, coordinates.longitude),
        sunset: getSunset(coordinates.latitude, coordinates.longitude),
        currentTime: new Date()
    };
}

export const isDay = () => {
    const dayInfo = getDaylightInfo();
    return (dayInfo.sunrise < dayInfo.currentTime && dayInfo.currentTime < dayInfo.sunset);
}

export default getDaylightInfo;