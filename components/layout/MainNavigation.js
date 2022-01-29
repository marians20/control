import { useContext, Fragment } from 'react';
import Link from 'next/link';
import AuthContext from '../../store/auth-context';
import classes from './MainNavigation.module.css';

function MainNavigation() {
    const context = useContext(AuthContext);
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
