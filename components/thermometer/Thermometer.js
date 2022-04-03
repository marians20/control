import { useCallback, useEffect, useState, useContext, Fragment } from 'react';
import Spinner from '../ui/Spinner';
import useHttp from '../../hooks/useHttp';
import OpenWeatherAdapter from '../../adapters/open-weather-adapter';
import classes from './Thermometer.module.css';

export default function Thermometer() {
    const [temperature, setTemperature] = useState({ temperature: 0, humidity: 0, isDay: true });
    const {
        isLoading,
        error,
        sendRequest
    } = useHttp();

    const readWeatherConditions = useCallback(async () => {
        const weatherConditions = await OpenWeatherAdapter.getCurrentConditions();
        console.log(weatherConditions);
    })

    const readDht = useCallback(async () => {
        await sendRequest({
            url: '/api/dht',
            headers: {
                'Content-Type': 'application/json',
                'latitude': location.latitude,
                'longitude': location.longitude
            }
        }, data => {
            if (!data.errors) {
                setTemperature({ temperature: data.temperature, humidity: data.humidity, isDay: data.isDay });
            }
        });
    });

    useEffect(() => {
        readDht();
        readWeatherConditions();
        const interval = setInterval(readDht, 60000);

        return (() => {
            interval && clearInterval(interval);
        })
    }, []);

    return (<div className={`${classes.thermometer} ${error ? classes.error : ''}`}>
        {isLoading && <Spinner />}
        {!isLoading && (
            <Fragment>
                <div className={classes.item}>
                    {temperature.isDay && <img src='/Pictures/day-sunny.svg' alt='T' className={classes.icon} />}
                    {!temperature.isDay && <img src='/Pictures/night.svg' alt='T' className={classes.icon} />}
                </div>
                <div className="container">
                    <div className={classes.item}>
                        <img src='/Pictures/temperature.svg' alt='T' className={classes.icon} />
                        {temperature.temperature}℃
                    </div>
                    <div className={classes.item}>
                        <img src='/Pictures/humidity.svg' alt='T' className={classes.icon} />
                        {temperature.humidity}%
                    </div>
                </div>
            </Fragment>
        )}
    </div>);
}


export async function getStaticProps() {
}

export async function getStaticPaths() {
}