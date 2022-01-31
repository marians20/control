import { useContext, useState, Fragment } from 'react';
import { useRouter } from 'next/router';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import Link from 'next/link';
import AuthContext from '../../store/auth-context';
import Thermometer from '../thermometer/Thermometer';

function MainNavigation() {
    const router = useRouter();
    const context = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleUserMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    function clickLogoutHandler() {
        handleClose();
        context.logout();
    }

    function clickChangePasswordHandler() {
        handleClose();
        router.push('/auth/changepassword');
    }

    const userMenu = (
        <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
            'aria-labelledby': 'basic-button',
        }}
    >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={clickChangePasswordHandler}>Change Password</MenuItem>
        <MenuItem onClick={clickLogoutHandler}>Logout</MenuItem>
    </Menu>
    );

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
                                    onClick={handleUserMenuClick}>
                                    {context.getName().firstName}
                                </Button>
                            </Link>
                            {userMenu}
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
