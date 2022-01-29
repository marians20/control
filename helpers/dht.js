var sensor = require("node-dht-sensor");
sensor.setMaxRetries(3);

let lastReadValue = {};

export default async function read (sensorType, pin) {
    console.log(`Reading sensor DHT${sensorType.toString()} at pin ${pin}`);
    var response = await sensor.read(sensorType, pin);
    if(response.errors) {
        throw {errors: response.errors, lastReadValue};
    }
    lastReadValue = {
        ...response,
        time: new Date()
    }
    return lastReadValue;
};

// sensor.read(11, 4, function (err, temperature, humidity) {
//     if (!err) {
//         console.log(`temp: ${temperature}°C, humidity: ${humidity}%`);
//     }
// });