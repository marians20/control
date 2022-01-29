import read from '../../helpers/dht';
export default function dht(req, res) {
    const value = read(22, 4);
    res.status(200).json(value);
}