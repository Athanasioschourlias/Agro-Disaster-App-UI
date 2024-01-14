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
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Box, {BoxProps} from "@mui/material/Box";
import Button from '@mui/material/Button';

export default function LogInComp() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = () => {
        login(username, password).then(res => {

            console.log('Username:', username);
            console.log('Password:', password);
            // Check if the response has a token
            if (res.data && res.data.token && res.data.username) {

                const newToken = res.data.token;

                localStorage.setItem('AuthToken', newToken);
                localStorage.setItem('username', res.data.username);

                // Save the token to the local variable and state
                console.log('Token:', newToken);
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