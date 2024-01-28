import React, {useEffect, useState} from 'react';
import Typography from "@mui/joy/Typography";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import Divider from "@mui/joy/Divider";
import CardContent from "@mui/joy/CardContent";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import AddLocationAltRoundedIcon from "@mui/icons-material/AddLocationAltRounded";
import AgricultureRoundedIcon from "@mui/icons-material/AgricultureRounded";
import {TextField} from "@mui/material";
import CardActions from "@mui/joy/CardActions";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import {DatePicker} from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment";
import dayjs from "dayjs";

function ScheduleApointmentEmployeePage(props: any) {


    const [acres, setAcres] = useState(0);

    let [apointment, setApointment] = useState(null);
    let [damageDesc, setDamageDesc] = useState('');
    let [famrerMail, setFarmerMail] = useState('');

    const handleFormSubmit= () => {
        if (apointment && damageDesc && famrerMail){
            console.log(apointment + damageDesc + famrerMail)
        }

        //TODO - Add a service file that will send and email to the given adress
        // create_form(location, acres, cropType, damageDesc).then((res) => {
        //     console.log(res)
        // }).catch((e) => {
        //     console.log(e)
        // })

    };

    //Fetch user email from local memory to send email
    // useEffect to call the function when the component is loaded
    useEffect(() => {

        const farmer_mail: string | null = localStorage.getItem('farmerMail')

        if(farmer_mail !== null) {

            setFarmerMail(farmer_mail)
        }
        // The empty dependency array ensures that this effect runs only once on component mount
    }, []);


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
                Schedule New Appointment
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
                    <FormLabel>Farmer Email</FormLabel>
                    <Input endDecorator={<EmailRoundedIcon />} value={famrerMail} onChange={(e) => setFarmerMail(e.target.value)}/>
                </FormControl>
                <FormControl>
                    <FormLabel>Date of the appointment to be set</FormLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Controlled picker"
                            value={apointment}
                            format="DD/MM/YYYY"
                            onChange={(newValue) => {
                                if (newValue !== null) {

                                    // @ts-ignore
                                    console.log(dayjs(newValue.$d).format('YYYY-MM-DD'))
                                    // @ts-ignore
                                    setApointment(dayjs(newValue.$d).format('YYYY-MM-DD'))

                                }

                            }}
                        />
                    </LocalizationProvider>
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
                        Arange Apointment & Notify User
                    </Button>
                </CardActions>
            </CardContent>
        </Card>

    );
}

export default ScheduleApointmentEmployeePage;