const GeoLocationAdapter = (() => {
    const getCurrentLocation = () => {
        return new Promise((resolve, reject) => {
            if (!('geolocation' in navigator)) {
                reject('Geolocation is not available in your browser.');
            }

            navigator.geolocation.getCurrentPosition((position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            }, error => {
                reject(error);
            });
        })
    }

    const getServerAddress = async () => {
        const response = await fetch('http://api.ipify.org');
        const data = await response.text();
        return data;
    };

    return {
        getCurrentLocation,
        getServerAddress
    }
})();

export default GeoLocationAdapter;