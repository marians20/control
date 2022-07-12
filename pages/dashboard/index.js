import GpioPinCard from "../../components/gpio-pin-card/gpio_pin_card";

export default function Dashboard(props) {
  const cardClickHandler = (pin) => {
    console.log(`Card with pin ${pin} clicked`);
  }

  return (<>
    <h1>Dashboard</h1>
    <GpioPinCard title="21" pin={21} onClick={cardClickHandler} />
  </>);
}