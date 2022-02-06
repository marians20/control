const OpenWeatherAdapter = (() => {
    const serverLocation = { latitude: 47.1654851, longitude: 27.574496 };
    const apiKey = '276cb277d34e5abf41075c85cb420414';
    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

    const farenheitToCelsius = (value) => (5 * ( value - 32 ) / 9).toFixed(2);
    const kelvinToCelsius = (value) => (value - 272.15).toFixed(2);
    const getCurrentConditions = async (latitude, longitude) => {
        const url = `${baseUrl}?lat=${serverLocation.latitude}&lon=${serverLocation.longitude}&appid=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        //feels_like: 273.57, temp_min: 270.55, temp_max: 274.5
        return {
            ...data.main,
            temp: kelvinToCelsius(data.main.temp),
            feels_like: kelvinToCelsius(data.main.feels_like),
            temp_min: kelvinToCelsius(data.main.temp_min),
            temp_max: kelvinToCelsius(data.main.temp_max)
        };
    }
    return {
        getCurrentConditions
    };
})();

export default OpenWeatherAdapter;