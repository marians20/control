import { NextResponse } from "next/server"
import { verifyToken } from "../helpers/jwt-utils";

// const notAuthorizedResponse = () =>
//     new Response('Auth required', {
//         status: 401,
//         headers: {
//             'WWW-Authenticate': 'Basic realm="Secure Area"',
//         },
//     });

const notAuthorizedResponse = () =>
    new Response(null, {
        status: 401
    });

const middleware = (req, ev) => {
    if (req.page.name
        && req.page.name.indexOf('/api/') >= 0
        && req.page.name.indexOf('/auth/login') < 0) {
        try {
            const authorizationHeader = req.headers.get('authorization');
            if (!authorizationHeader) {
                return notAuthorizedResponse();
            }
            const token = authorizationHeader.replace('Bearer ', '');
            const decoded = verifyToken(token);

            if (!decoded) {
                return notAuthorizedResponse();
            }
        }
        catch {
            return notAuthorizedResponse();
        }
    }

    return NextResponse.next();
};

export default middleware;