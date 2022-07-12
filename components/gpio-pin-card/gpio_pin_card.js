import styles from './GpioPinCard.module.css';

const GpioPinCard = ({title, pin, onClick}) => {
  return (<div onClick={() => onClick(pin)}
  className={`disable-text-selection, ${styles['gpio-card']}`}>
    <h1>{title}</h1>
  </div>)
};

export default GpioPinCard;