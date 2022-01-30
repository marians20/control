import UserService from '../../../services/user-service';

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        try {
            const result = await UserService.changePassword(req.body);
            return result.isSuccess
                ? res.status(201)
                : res.status(result.statusCode).json({ message: result.message });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json(JSON.stringify(err));
        }
    }

    return res.status(405);
}