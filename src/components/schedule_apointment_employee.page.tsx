import React, { useEffect, useState } from 'react';
import Typography from "@mui/joy/Typography";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import Divider from "@mui/joy/Divider";
import CardContent from "@mui/joy/CardContent";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import AddLocationAltRoundedIcon from "@mui/icons-material/AddLocationAltRounded";
import AgricultureRoundedIcon from "@mui/icons-material/AgricultureRounded";
import { TextField } from "@mui/material";
import CardActions from "@mui/joy/CardActions";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import moment from "moment";
import dayjs from "dayjs";
import emailjs from "@emailjs/browser";

function ScheduleApointmentEmployeePage(props: any) {


    const [appointment, setAppointment] = useState<dayjs.Dayjs | null>(null);
    const [damageDesc, setDamageDesc] = useState('');
    const [farmerMail, setFarmerMail] = useState('');

    useEffect(() => {
        const farmerMailFromLocalStorage: string | null = localStorage.getItem('farmerMail');
        if (farmerMailFromLocalStorage !== null) {
            setFarmerMail(farmerMailFromLocalStorage);
        }
    }, []);

    const handleFormSubmit = async () => {
        if (appointment && damageDesc && farmerMail) {
            // Send email using EmailJS
            try {
                const templateParams = {
                    to_email: farmerMail,
                    appointment_date: appointment.format('YYYY-MM-DD'),
                };

                await emailjs.send('argo_dit', 'argo_disaster_dit', templateParams, EMAIL_JS_PUBKEY);
                console.log('Email sent successfully');
            } catch (error) {
                console.error('Error sending email:', error);
            }
        } else {
            console.error('Invalid input');
        }
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
                    <Input endDecorator={<EmailRoundedIcon />} value={farmerMail} onChange={(e) => setFarmerMail(e.target.value)} />
                </FormControl>
                <FormControl>
                    <FormLabel>Date of the appointment to be set</FormLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Controlled picker"
                            value={appointment}
                            format="DD/MM/YYYY"
                            onChange={(newValue) => {
                                if (newValue !== null) {
                                    setAppointment(dayjs(newValue.toDate())); // Convert Date object to Dayjs
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
                    <Button variant="solid" color="primary" onClick={handleFormSubmit}>
                        Arange Apointment & Notify User
                    </Button>
                </CardActions>
            </CardContent>
        </Card>

    );
}

export default ScheduleApointmentEmployeePage;
