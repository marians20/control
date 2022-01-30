import { useContext, Fragment } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import Link from 'next/link';
import AuthContext from '../../store/auth-context';
import Thermometer from '../thermometer/Thermometer';

function MainNavigation() {
    const context = useContext(AuthContext);

    function clickLogoutHandler() {
        context.logout();
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    {context.isLoggedIn &&
                        <Fragment>
                            <Link href='/fishtank'>
                                <Button color="inherit" >
                                    FishTank
                                </Button>
                            </Link>
                            <Link href='/lights'>
                                <Button color="inherit" >
                                    Lights
                                </Button>
                            </Link>
                            <Thermometer />
                            <Link href='/'>
                                <Button color="inherit"
                                    onClick={clickLogoutHandler}>
                                    {context.email}
                                </Button>
                            </Link>
                        </Fragment>
                    }
                    {!context.isLoggedIn &&
                        <Link href='/auth/login'>
                            <Button color="inherit">Login</Button>
                        </Link>
                    }
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default MainNavigation;
