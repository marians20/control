import UserService from '../../../services/user-service';

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        try {
            const result = await UserService.changePassword(req.body);
            console.log('result', result);
            console.log('Returning response 201');
            return result.isSuccess
                ? res.status(201).json({ message: result.message })
                : res.status(result.statusCode).json({ message: result.message });
        }
        catch (err) {
            console.log(err);
            return res.status(500).json(JSON.stringify(err));
        }
    }

    return res.status(405);
}