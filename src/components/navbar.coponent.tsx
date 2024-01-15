import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';

import List from '@mui/material/List';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ContactsRoundedIcon from '@mui/icons-material/ContactsRounded';

import MenuIcon from '@mui/icons-material/Menu';
import AddchartRoundedIcon from '@mui/icons-material/AddchartRounded';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import {BrowserRouter, Link} from "react-router-dom"
import CottageRoundedIcon from '@mui/icons-material/CottageRounded';

// Type rsf for creating a ready to populate component
const drawerWidth = 190;

function NavbarCoponent({ children }: any) {

    const role = localStorage.getItem('role');

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [isClosing, setIsClosing] = React.useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) {
            setMobileOpen(!mobileOpen);
        }
    };

    const drawer = (
        <div>
            <Toolbar />
            <Divider />
            {localStorage.getItem('role') == 'ROLE_ADMIN' && (
                <List>
                    <Link to={"/"} style={{ textDecoration: "none", color: "#555E68" }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <CottageRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Home"}/>
                        </ListItemButton>
                    </Link>

                </List>
            )}

            {localStorage.getItem('role') == 'ROLE_EMPLOYEE' && (
            <List>


                <Link to={"/"} style={{ textDecoration: "none", color: "#555E68" }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <CottageRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Home"}/>
                    </ListItemButton>
                </Link>

                <Divider />

                <Link to={"/forms/employee/all"} style={{ textDecoration: "none", color: "#555E68" }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <CottageRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary={"All Forms in the systemm"}/>
                    </ListItemButton>
                </Link>

                <Link to={"/forms/employee/unprocessed"} style={{ textDecoration: "none", color: "#555E68" }}>
                    <ListItemButton>
                        <ListItemIcon>
                            <CottageRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Unprocessed Forms"}/>
                    </ListItemButton>
                </Link>


            </List>
                )}

            {localStorage.getItem('role') == 'ROLE_FARMER' && (
                <List>

                    <Link to={"/"} style={{ textDecoration: "none", color: "#555E68" }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <CottageRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Home"}/>
                        </ListItemButton>
                    </Link>

                    <Divider />

                    <Link to={"/forms/farmer"} style={{ textDecoration: "none", color: "#555E68" }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <CottageRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Your Forms"}/>
                        </ListItemButton>
                    </Link>

                    <Link to={"/forms/create"} style={{ textDecoration: "none", color: "#555E68" }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <CottageRoundedIcon />
                            </ListItemIcon>
                            <ListItemText primary={"Create New Form"}/>
                        </ListItemButton>
                    </Link>

                </List>
            )}
            <Divider />
        </div>
    );

    // Remove this const when copying and pasting into your project.
    const container = window !== undefined ? () =>  window.document.body : undefined;


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Hello {localStorage.getItem("username")}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />


                { children }


            </Box>
        </Box>
    );
}

export default NavbarCoponent;
