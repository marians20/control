var sensor = require("node-dht-sensor");

export default read = async (sensorType, pin) => {
    const { err, temperature, humidity } = await sensor.read(sensorType, pin);
    return {err, temperature, humidity };
};

// sensor.read(11, 4, function (err, temperature, humidity) {
//     if (!err) {
//         console.log(`temp: ${temperature}°C, humidity: ${humidity}%`);
//     }
// });