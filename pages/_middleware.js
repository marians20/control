import { NextResponse } from "next/server"
import { verifyToken } from "../helpers/jwt-utils";

import middlewareStore from '../store/middleware-store';

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
                middlewareStore.dispatch({ type: 'RESET_EMAIL' });
                return notAuthorizedResponse();
            }
            const token = authorizationHeader.replace('Bearer ', '');
            const decoded = verifyToken(token);

            if (!decoded) {
                middlewareStore.dispatch({ type: 'RESET_EMAIL' });
                return notAuthorizedResponse();
            }
            
            middlewareStore.dispatch({type: 'SET_EMAIL', email: decoded.email});
        }
        catch {
            middlewareStore.dispatch({ type: 'RESET_EMAIL'});
            return notAuthorizedResponse();
        }
    }

    return NextResponse.next();
};

export default middleware;