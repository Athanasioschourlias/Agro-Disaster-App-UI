import React, { useState } from 'react';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import Divider from '@mui/material/Divider';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'; // For first name and last name
import VpnKeyIcon from '@mui/icons-material/VpnKey'; // For password
import EmailIcon from '@mui/icons-material/Email'; // For email
import AccountBoxIcon from '@mui/icons-material/AccountBox'; // For role
import { create_user } from "../services/admin.service";
import { Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

function AdminRegisterUser(props: any) {
    const [tinNumber, setTinNumber] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
    const [isSubmissionErrorDialogOpen, setIsSubmissionErrorDialogOpen] = useState(false);
    const [submissionErrorMessage, setSubmissionErrorMessage] = useState('');


    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));

    const handleFormSubmit = () => {
        if (!tinNumber.trim()) {
            setIsErrorDialogOpen(true);
            return;
        }
        if (!role) {
            setRole('ROLE_FARMER')
        }

        create_user(tinNumber, firstName, lastName, password, email, role)
            .then((res) => {
                console.log(res);
                // You might want to handle successful submission here
            })
            .catch((e) => {
                console.log(e);
                setSubmissionErrorMessage('Failed to create user. Please try again.'); // Set a custom error message
                setIsSubmissionErrorDialogOpen(true);
            });
    };

    return (
        <Card
            variant="outlined"
            sx={{
                maxHeight: 'max-content',
                maxWidth: '100%',
                mx: 'auto',
                overflow: 'auto',
                resize: 'horizontal',
                p: 2,
            }}
        >
            <Typography level="title-lg" startDecorator={<InfoOutlined />}>
                Create New User
            </Typography>
            <Divider />
            <CardContent
                sx={{
                    display: 'grid',
                    gridTemplateColumns: isXs ? '1fr' : 'repeat(2, 1fr)',
                    gap: 1.5,
                }}
            >
                <FormControl sx={{ gridColumn: isXs ? '1' : '1/-1' }}>
                    <FormLabel>TIN Number</FormLabel>
                    <Input endDecorator={<AccountBoxIcon />} value={tinNumber} onChange={(e) => setTinNumber(e.target.value)} />
                </FormControl>
                <FormControl>
                    <FormLabel>First Name</FormLabel>
                    <Input endDecorator={<PersonOutlineIcon />} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </FormControl>
                <FormControl>
                    <FormLabel>Last Name</FormLabel>
                    <Input endDecorator={<PersonOutlineIcon />} value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input endDecorator={<VpnKeyIcon />} value={password} onChange={(e) => setPassword(e.target.value)} />
                </FormControl>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input endDecorator={<EmailIcon />} value={email} onChange={(e) => setEmail(e.target.value)} />
                </FormControl>
                <FormControl>
                    <FormLabel>Role</FormLabel>
                    <Select
                        value={role}
                        label="Role"
                        sx={{ width: 'auto', height: 40, border: "1px solid", color: "#000" }}
                        defaultValue='ROLE_FARMER'
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <MenuItem value={'ROLE_ADMIN'}>ADMIN</MenuItem>
                        <MenuItem value={'ROLE_EMPLOYEE'}>EMPLOYEE</MenuItem>
                        <MenuItem value={'ROLE_FARMER'}>FARMER</MenuItem>
                    </Select>
                </FormControl>
                <CardActions sx={{ gridColumn: isXs ? '1' : '1/-1' }}>
                    <Button variant="solid" color="primary" fullWidth={isXs} onClick={handleFormSubmit}>
                        Register User
                    </Button>
                </CardActions>
                <Dialog open={isErrorDialogOpen} onClose={() => setIsErrorDialogOpen(false)}>
                    <DialogTitle>Error</DialogTitle>
                    <DialogContent>
                        <Typography>TIN number is required.</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setIsErrorDialogOpen(false)}>OK</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={isSubmissionErrorDialogOpen} onClose={() => setIsSubmissionErrorDialogOpen(false)}>
                    <DialogTitle>Error</DialogTitle>
                    <DialogContent>
                        <Typography>{submissionErrorMessage}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setIsSubmissionErrorDialogOpen(false)}>OK</Button>
                    </DialogActions>
                </Dialog>
            </CardContent>
        </Card>
    );
}

export default AdminRegisterUser;
