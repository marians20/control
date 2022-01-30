import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';

import classes from './Thermometer.module.css';
//import thermometer from '../../public/Pictures/temperature.png';
export default function Thermometer() {
    const [temperature, setTemperature] = useState({ temperature: 0, humidity: 0 });

    const readDht = useCallback(async function () {
        const response = await fetch('/api/dht');
        const data = await response.json();
        if (!data.errors) {
            setTemperature({ temperature: data.temperature, humidity: data.humidity });
        }
    }, []);
    
    useEffect(() => {
        readDht();
        setInterval(readDht, 60000);
    }, []);

    return (<div className={classes.thermometer}>
        <div className={classes.item}>
            <img src='/Pictures/temperature.svg' alt='T' className={classes.icon} />
            <div>
                {temperature.temperature}℃
            </div>
        </div>
        <div className={classes.item}>
            <img src='/Pictures/humidity.svg' alt='T' className={classes.icon} />
            {temperature.humidity}%
        </div>
    </div>);
}


export async function getStaticProps() {
}

export async function getStaticPaths() {
}