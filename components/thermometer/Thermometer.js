import { useCallback, useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '../../store/auth-context';
import classes from './Thermometer.module.css';

export default function Thermometer() {
    const router = useRouter();
    const context = useContext(AuthContext);
    const [temperature, setTemperature] = useState({ temperature: 0, humidity: 0 });

    const readDht = useCallback(async function () {
        const response = await fetch('/api/dht', {
            headers: {
                'authorization': `Bearer ${context.token}`
            }
        });
        if(response.status === 401) {
            router.replace('/auth/login');
        }
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