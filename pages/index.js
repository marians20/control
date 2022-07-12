import Head from 'next/head';
import Card from '../components/ui/Card';
import styles from '../styles/Home.module.css';
import Thermometer from '../components/thermometer/Thermometer';

export default function Home() {
  return (<>
    <h1>Welcome to Manunu!</h1>
    <Thermometer />
  </>);
}
