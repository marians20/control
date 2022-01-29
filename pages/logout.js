import {Fragment, useContext} from 'react';
import { useRouter } from 'next/router'
import AuthContext from '../store/auth-context';

export default function handler() {
    const authContext = useContext(AuthContext);
    const router = useRouter();
    authContext.logout();
    router.push('/login');

    return(<Fragment>
        <p>Logout</p>
    </Fragment>);
}