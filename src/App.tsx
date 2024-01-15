import React, {useState} from 'react';
import './App.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import LogInComp from "./components/login.component"

import Box, { BoxProps } from '@mui/material/Box'
import NavbarCoponent from "./components/navbar.coponent";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import AdminPanelComponentPage from "./components/admin_panel.component.page";
import HomeCoponentPage from "./components/home.coponent.page";
import EmployeePanelComponentPage from "./components/employee_panel.component.page";
import FarmerPanelComponentPage from "./components/farmer_panel.component.page";

function Item(props: BoxProps) {
    const { sx, ...other } = props;
    return (
        <Box
            sx={{
                p: 1,
                m: 1,
                bgcolor: (theme) => '#42a5f5',
                color: (theme) => '#212121' ,
                border: 'false',
                borderRadius: 2,
                fontSize: '0.875rem',
                fontWeight: '700',
                ...sx,
            }}
            {...other}
        />
    );
}

function App() {

    const username = localStorage.getItem('username');

    return (

        <div className="App">
            <BrowserRouter>
                {!username && (
                    <Routes>
                        <Route path={"/"} element={ <HomeCoponentPage /> }/>
                    </Routes>
                )}

                {username && (
                    <NavbarCoponent>
                        <Routes>
                            <Route path={"/admin_panel"} element={ <AdminPanelComponentPage /> }/>
                            <Route path={"/forms/farmer"} element={ <FarmerPanelComponentPage /> }/>
                            <Route path={"/forms/employee/all"} element={ <EmployeePanelComponentPage /> }/>
                            <Route path={"/"} element={ <HomeCoponentPage /> }/>
                        </Routes>
                    </NavbarCoponent>
                    )}
            </BrowserRouter>
        </div>
    );
}


export default App;
