import React, {SetStateAction, useState} from 'react';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import {TextField} from "@mui/material";
import AddLocationAltRoundedIcon from '@mui/icons-material/AddLocationAltRounded';
import AgricultureRoundedIcon from '@mui/icons-material/AgricultureRounded';
import YardRoundedIcon from '@mui/icons-material/YardRounded';
import {create_form} from "../services/farmer.service";

function NewFormPage(props: any) {

    const [acres, setAcres] = useState(0);
    const [cropType, setCropType] = useState('');
    const [damageDesc, setDamageDesc] = useState('');
    const [location, setLocation] = useState('');

    const handleFormSubmit= () => {

        create_form(location, acres, cropType, damageDesc).then((res) => {
            console.log(res)
        }).catch((e) => {
            console.log(e)
        })
    };

    return (
        <Card
            variant="outlined"
            sx={{
                maxHeight: 'max-content',
                maxWidth: '100%',
                mx: 'auto',
                // to make the demo resizable
                overflow: 'auto',
                resize: 'horizontal',
            }}
        >
            <Typography level="title-lg" startDecorator={<InfoOutlined />}>
                Create New User
            </Typography>
            <Divider inset="none" />
            <CardContent
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
                    gap: 1.5,
                }}
            >
                <FormControl sx={{ gridColumn: '1/-1' }}>
                    <FormLabel>Location</FormLabel>
                    <Input endDecorator={<AddLocationAltRoundedIcon />} value={location} onChange={(e) => setLocation(e.target.value)}/>
                </FormControl>
                <FormControl>
                    <FormLabel>Crop Type</FormLabel>
                    <Input endDecorator={<AgricultureRoundedIcon/>} value={cropType} onChange={(e) => setCropType(e.target.value)}/>
                </FormControl>
                <FormControl>
                    <FormLabel>Acres</FormLabel>
                    <Input endDecorator={<AgricultureRoundedIcon/>} value={acres} onChange={(e) => setAcres(e.target.value as unknown as number)}/>
                </FormControl>
                <FormControl sx={{ gridColumn: '1/-1' }}>
                    <FormLabel>Damage Description</FormLabel>
                    <TextField
                        placeholder="Enter cardholder's full name"
                        multiline
                        rows={3}
                        value={damageDesc}
                        onChange={(e) => setDamageDesc(e.target.value)}
                    />
                </FormControl>
                <CardActions sx={{ gridColumn: '1/-1' }}>
                    <Button variant="solid" color="primary" onClick={handleFormSubmit }>
                        Create New Form
                    </Button>
                </CardActions>
            </CardContent>
        </Card>
    );
}

export default NewFormPage;