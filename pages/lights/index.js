import MoonPhase from "../../components/moon-phase";
import GpioPinCard from "../../components/gpio-pin-card/gpio_pin_card";
import useHttp from '../../hooks/useHttp';
import styles from './index.module.css';
export default function Lights(props) {
    const gpioCards = [
        { title: 21, pin: 21 },
        { title: 22, pin: 22 },
        { title: 23, pin: 23 },
    ];

    const {
        isLoading,
        error,
        sendRequest
    } = useHttp();

    const cardClickHandler = async (pin) => {
        await sendRequest({
            url: `/api/relays/${pin}/3`,
        });
    };

    return (<>
        <h1>Lights Control</h1>
        <MoonPhase />
        <div className={`${styles['cards-container']}`}>
            {gpioCards.map(card => <GpioPinCard
                id={card.id}
                title={card.title}
                pin={card.pin}
                onClick={cardClickHandler} />)}
        </div>
    </>);
}