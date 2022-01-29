import { useContext, Fragment } from 'react';
import Link from 'next/link';
import AuthContext from '../../store/auth-context';
import Thermometer from '../thermometer/Thermometer';

import classes from './MainNavigation.module.css';

function MainNavigation() {
    const context = useContext(AuthContext);

    function clickLogoutHandler() {
        context.logout();
    }

    return (
        <header className={classes.header}>
            <div className={classes.logo}>
                <Link href='/'>IoT</Link>
            </div>
            <nav>
                <ul>
                    {context.isLoggedIn &&
                        <Fragment>
                            <li>
                                <Link href='/fishtank'>FishTank</Link>
                            </li>
                            <li>
                                <Link href='/lights'>Lights</Link>
                            </li>
                            <li>
                                <Thermometer />
                            </li>
                            <li>
                                <div className={classes.link} onClick={clickLogoutHandler}>{context.email}</div>
                            </li>
                        </Fragment>
                    }
                    {!context.isLoggedIn &&
                        <li>
                            <Link href='/login'>Login</Link>
                        </li>
                    }
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;
