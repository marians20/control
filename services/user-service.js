import db from '../helpers/couch-db';
import bcrypt from 'bcryptjs';

const UserService = (() => {
    const users = db.use('users');

    const encryptPassword = async (password) => await bcrypt.hash(password, 10);

    const create = async (user) => {
        const existingUser = await getUser(user.email);
        if (existingUser) {
            return {
                isSuccess: false,
                message: 'Email already registered.'
            };
        }

        const newUser = {
            ...user,
            email: user.email.trim().toLowerCase(),
            password: await encryptPassword(user.password)
        }
        
        users.insert(newUser);

        return { isSuccess: true };
    }

    const getUser = async (email) => {
        return (await users.find({
            selector: {
                email: { "$eq": email.trim().toLowerCase() }
            }
        }))?.docs[0];
    }

    const exists = async (email) => !!(await getUser(email));

    const changePassword = async (data) => {
        const existingUser = await getUser(data.email);

        if (data.newPassword !== data.confirmPassword) {
            return {
                isSuccess: false,
                statusCode: 400,
                message: 'New password not confirmed.'
            };
        }

        if (!existingUser) {
            return {
                isSuccess: false,
                statusCode: 400,
                message: 'User Does not exist.'
            };
        }

        if (!bcrypt.compareSync(data.currentPassword, existingUser.password)) {
            return {
                isSuccess: false,
                statusCode: 400,
                message: 'The current password you entered does not match.'
            };
        }

        existingUser.password = await encryptPassword(data.newPassword);

        const response = await users.insert(existingUser);
        const result = {
            isSuccess: response.ok,
            statusCode: response.ok ? 201: 400,
            message: response.ok ? 'Password changed' : response.message
        };

        console.log(result);
        return result;
    };

    const validatePassword = async (email, password) => {
        const existingUser = await getUser(email);

        if (!existingUser) {
            return {
                isSuccess: false,
                statusCode: 404,
                message: 'User does not exist'
            };
        }

        if (!bcrypt.compareSync(password, existingUser.password)) {
            return {
                isSuccess: false,
                statusCode: 401,
                message: 'Wrong password.'
            };
        }

        return { isSuccess: true, user: { ...existingUser, password: '*******' } };
    }

    return {
        create,
        getUser,
        exists,
        validatePassword,
        changePassword
    };
})();

export default UserService;