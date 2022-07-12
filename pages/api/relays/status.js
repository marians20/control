import { getPins } from '../../../helpers/gpio';
export default function status(req, res) {

  res.status(200).json(getPins());
}