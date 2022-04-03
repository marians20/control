const DateTimeUtils = (() => {
    const toLocalTime = (value) => {
        //return value.toLocaleString('ro-RO', { hour: '2-digit',minutes:'long', hour12: false, timeZone: 'Europe/Bucharest' });
        return `${value.getHours().toString().padStart(2, '0')}:${value.getMinutes().toString().padStart(2, '0')}:${value.getSeconds().toString().padStart(2, '0')}`;
    }

    return {
        toLocalTime
    };
})();

export default DateTimeUtils;