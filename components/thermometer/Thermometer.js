import { useCallback, useEffect, useState, useContext, Fragment } from 'react';
import Spinner from '../ui/Spinner';
import useHttp from '../../hooks/useHttp';

import classes from './Thermometer.module.css';

export default function Thermometer() {
    const [temperature, setTemperature] = useState({ temperature: 0, humidity: 0 });
    const {
        isLoading,
        error,
        sendRequest
    } = useHttp();

    const readDht = useCallback(async () => {
        await sendRequest({ url: '/api/dht' }, data => {
            if (!data.errors) {
                setTemperature({ temperature: data.temperature, humidity: data.humidity });
            }
        });
    });

    useEffect(() => {
        readDht();
        setInterval(readDht, 60000);
    }, []);

    return (<div className={`${classes.thermometer} ${error ? classes.error : ''}`}>
        {isLoading && <Spinner/>}
        {!isLoading && (
            <Fragment>
                <div className={classes.item}>
                    <img src='/Pictures/temperature.svg' alt='T' className={classes.icon} />
                    {temperature.temperature}℃
                </div>
                <div className={classes.item}>
                    <img src='/Pictures/humidity.svg' alt='T' className={classes.icon} />
                    {temperature.humidity}%
                </div>
            </Fragment>
        )}
    </div>);
}


export async function getStaticProps() {
}

export async function getStaticPaths() {
}