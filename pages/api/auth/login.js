import { createToken } from "../../../helpers/jwt-utils";
import UserService from "../../../services/user-service";

export default async function login(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    try {
      const validationResult = await UserService.validatePassword(email, password);
      return validationResult.isSuccess
        ? res.status(200).json({ token: createToken(validationResult.user) })
        : res.status(validationResult.statusCode).json({ message: validationResult.message });

    }
    catch (err) {
      console.log(err);
      return res.status(500).json(JSON.stringity(err));
    }
  }

  return res.status(405);
}