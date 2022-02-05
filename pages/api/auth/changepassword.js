import UserService from '../../../services/user-service';
import RequestUtils from '../../../helpers/request-utils';

export default async function handler(req, res) {
    const token = RequestUtils.getToken(req);
    if (req.method === 'PUT') {
        try {
            if(token?.email !== req.body.email) {
                return res.status(400).json(JSON.stringify({message: 'Email from token is diferrent!'}));
            }
            
            const result = await UserService.changePassword(req.body);
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