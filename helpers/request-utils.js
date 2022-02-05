import { verifyToken } from "../helpers/jwt-utils";

const RequestUtils = (() => {
    const getToken = (req) => {
        let authorizationHeader;
        try {
            authorizationHeader = req.headers.get('authorization');
        } catch {
            authorizationHeader = req.headers.authorization;
        }

        if (!authorizationHeader) {
            return '';
        }

        try {
            const token = authorizationHeader.replace('Bearer ', '');
            const decoded = verifyToken(token);
            return decoded;
        } catch (err) {
            console.error(err);
            return '';
        }
    };

    return {
        getToken
    };
})();

export default RequestUtils;