import React, { useEffect } from "react";
import {
    Navbar, Container, Nav
} from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

const Navbars = () => {

    const history = useHistory();
    const role = localStorage.getItem("role");

    const location = (address) => {
        history.push(`/${address}`);
    }

    useEffect(() => {

        let url = window.location;
        let pathname = String(url.pathname);

        if (role != 'Admin') {
            if (pathname == '/add-user') {
                history.push("/Home");
            }
        }

        if (role == 'Admin' || role == 'Pforte') {

        } else {
            if (pathname == '/view-user') {
                history.push("/Home");
            }
        }

        if (role == undefined) {
            history.push("/");
        }

    }, []);

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container display={'flex'} justifyContent={'space-between'}>
                    <Box display={'flex'}>
                        <Navbar.Brand >LSP Admin</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link onClick={() => location('Home')}> Home </Nav.Link>
                            {/* {
                                role == 'Admin' ? <>  <Nav.Link onClick={() => location('add-user')}>Benutzer hinzufügen </Nav.Link> </> : null
                            } */}
                            <Nav.Link onClick={() => location('view-user')}> Benutzer anzeigen </Nav.Link>
                           
                        </Nav>
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="My Profile">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem key="myprofile" >
                                <Typography textAlign="center" onClick={() => history.push("my-profile")}>Mein Profil</Typography>
                            </MenuItem>
                            <MenuItem key="logout" >
                                <Typography textAlign="center" onClick={() => history.push("logout")}>Abmelden</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Container>
            </Navbar>
        </>
    )
}
export default Navbars;