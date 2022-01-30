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
        console.log(`getUser (${email})`);
        return (await users.find({
            selector: {
                email: { "$eq": email.trim().toLowerCase() }
            }
        }))?.docs[0];
    }

    const exists = async (email) => !!(await getUser(mail));

    const changePassword = async (data) => {
        const existingUser = await getUser(data.email);
        console.log(existingUser);
        
        if (data.newPassword !== data.confirmPassword) {
            return {
                isSuccess: false,
                statusCode: 404,
                message: 'New password not confirmed.'
            };
        }

        if (!existingUser) {
            return {
                isSuccess: false,
                statusCode: 404,
                message: 'User Does not exist'
            };
        }
        console.log(existingUser);
        if (!bcrypt.compareSync(data.currentPassword, existingUser.password)) {
            return {
                isSuccess: false,
                statusCode: 401,
                message: 'Wrong password.'
            };
        }

        existingUser.password = await encryptPassword(data.newPassword);

        const response = await users.insert(existingUser);

        return {
            isSuccess: response.ok,
            message: response.message
        }
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

        return { isSuccess: true, user : {...existingUser, password: '*******'} };
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