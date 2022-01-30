import UserService from '../../services/user-service';

const changePassword = async (data) => {
    const { email, oldPassword, newPassword, confirmPassword } = data;
    return await UserService.changePassword(data);
}

export default async function handler(req, res) {
    if(req.method === 'PUT') {
        const result = await changePassword(req.body);

        return result.isSuccess
            ? res.status(201)
            : res.status(result.statusCode).json({message: result.message});

    }

    return res.status(405);
}