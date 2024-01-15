import {login} from "../services/login.service"
import React, {useState} from "react";
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';

import Button from '@mui/material/Button';
import {jwtDecode} from "jwt-decode";
import {JwtDecoded} from "../types/login.types";
import {redirect, useNavigate} from "react-router-dom";

export default function LogInComp(props: any) {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = () => {

        login(username, password).then(res => {
            // Check if the response has a token
            if (res.data && res.data.token && res.data.username) {

                const decoded: JwtDecoded = jwtDecode(res.data.token);

                localStorage.setItem('AuthToken', res.data.token);
                localStorage.setItem('username', res.data.username);
                localStorage.setItem('role', decoded.roles);


                // Redirect based on the user's role
                switch (decoded.roles) {
                    case 'ROLE_FARMER':
                        navigate('/forms/farmer')
                        window.location.reload()
                        break;
                    case 'ROLE_EMPLOYEE':
                        navigate('/forms/employee/all')
                        window.location.reload()
                        break;
                    case 'ROLE_ADMIN':
                        navigate('/admin_panel')
                        window.location.reload()
                        break;
                    default:
                        // Handle other roles or cases
                        break;
                }

            } else {
                // Handle the case when there is no token in the response
                console.log('No token in the response');
            }

        }).catch(err => {
            console.log(err.message)
        })

    };


    return (
        <div className="login">

            <Card
                variant="outlined"
                sx={{
                    flexGrow: 1,
                    maxHeight: 'max-content',
                    width: '100%',
                }}
            >
                <Typography level="title-lg"
                            sx={{
                                textAlign: 'center'
                            }}>
                    LogIn Window
                </Typography>

                <CardContent
                    sx={{
                        display: 'flex',
                        p:1,
                        alignContent: 'center',
                        justifyContent: 'space-evenly',
                        borderRadius: 1
                    }}
                >
                    <FormControl sx={{}}>
                        <FormLabel>UserName</FormLabel>
                        <Input placeholder="Enter Username"
                               value={username}
                               onChange={(e) => setUsername(e.target.value)}
                        />
                    </FormControl>
                    <FormControl sx={{ }}>
                        <FormLabel>Password</FormLabel>
                        <Input placeholder="Enter Password"
                               value={password}
                               type="password"
                               required={true}
                               onChange={(e) => setPassword(e.target.value)}/>
                    </FormControl>
                    <CardActions sx={{}}>
                        <Button variant="contained" onClick={handleChange}>LogIn</Button>
                    </CardActions>
                </CardContent>
            </Card>
        </div>
    );
}