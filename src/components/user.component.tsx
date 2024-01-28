import React, { useState } from 'react';
import { AspectRatio, CardOverflow, Chip } from "@mui/joy";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import Typography from "@mui/joy/Typography";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import { TransitionProps } from '@mui/material/transitions';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Select, Slide, TextField, useMediaQuery } from "@mui/material";
import { delete_user_by_tin } from "../services/admin.service";
import { useTheme } from '@mui/material/styles';
import { edit_user } from "../services/admin.service";


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function UserComponent(props: any) {


    const [open, setOpen] = React.useState(false)
    const [openEdit, setOpenEdit] = React.useState(false)

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [firstName, setFirstName] = React.useState('')
    const [LastName, setLastName] = React.useState('')
    const [tinNumber, setTinNumber] = React.useState('')
    const [role, setRole] = React.useState('')

    const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
    const [isSubmissionErrorDialogOpen, setIsSubmissionErrorDialogOpen] = useState(false);
    const [submissionErrorMessage, setSubmissionErrorMessage] = useState('');

    const handleChangeEmail = (event: any) => {

        setEmail(event.target.value);

    };
    const handleChangeFirstName = (event: any) => {

        setFirstName(event.target.value);

    };
    const handleChangeLastName = (event: any) => {

        setLastName(event.target.value);

    };
    const handleChangePassword = (event: any) => {

        setPassword(event.target.value);

    };
    const handleChangeTinNumber = (event: any) => {

        setTinNumber(event.target.value);

    };
    const handleChangeRole = (event: any) => {

        setRole(event.target.value);

    };
    const handleClickOpenEdit = () => {
        setOpenEdit(true)
    };
    const handleCloseEdit = () => {

        setOpenEdit(false);
    };

    const handleClickOpen = () => {
        setOpen(true)
    };

    const handleCloseYes = (tin: string) => {
        delete_user_by_tin(tin).then(() => {
            setOpen(false);
            window.location.reload();
        }).catch((e) => {
            console.log(e);
            setSubmissionErrorMessage('Failed to delete user. Please try again.');
            setIsErrorDialogOpen(true);
        });
    };

    const theme = useTheme();
    const isXs = useMediaQuery(theme.breakpoints.down('sm'));

    const handleCloseNo = () => {
        setOpen(false)
    };

    return (
        <Card
            data-resizable
            sx={{
                textAlign: 'center',
                alignItems: 'center',
                width: isXs ? '100%' : '30%',
                my: 4,
                mx: isXs ? 0 : 2,
                overflow: 'auto',
                resize: 'horizontal',
                '--icon-size': '100px',
            }}
        >
            <CardOverflow variant="solid" color="primary">
                <AspectRatio
                    variant="outlined"
                    color="warning"
                    ratio="1"
                    sx={{
                        m: 'auto',
                        transform: 'translateY(50%)',
                        borderRadius: '50%',
                        width: 'var(--icon-size)',
                        boxShadow: 'sm',
                        bgcolor: 'primary.500',
                        position: 'relative',
                    }}
                >
                    <div>
                        <PersonRoundedIcon sx={{ fontSize: '4rem', color: '#F09898' }} />
                    </div>
                </AspectRatio>
            </CardOverflow>
            <Typography level="title-lg" sx={{ mt: 'calc(var(--icon-size) / 2)' }}>
                {props.userObj.tinNumber}
            </Typography>
            <CardContent sx={{ width: '100%' }}>
                <Chip
                    variant="outlined"
                    color="primary"
                    size="sm"
                    sx={{ pointerEvents: 'none', m: 0.5, height: 'auto', display: 'block', whiteSpace: 'normal' }}
                >
                    The Users id is: {props.userObj.id}
                </Chip>

                <Chip
                    variant="outlined"
                    color="primary"
                    size="sm"
                    sx={{ pointerEvents: 'none', m: 0.5, height: 'auto', display: 'block', whiteSpace: 'normal' }}
                >
                    The users e-mail is: {props.userObj.email}
                </Chip>

                <Chip
                    variant="outlined"
                    color="primary"
                    size="sm"
                    sx={{ pointerEvents: 'none', m: 0.5, height: 'auto', display: 'block', whiteSpace: 'normal' }}
                >
                    The user fullname is: {props.userObj.firstName}  {props.userObj.lastName}
                </Chip>

                <Chip
                    variant="outlined"
                    color="primary"
                    size="sm"
                    sx={{ pointerEvents: 'none', m: 0.5, height: 'auto', display: 'block', whiteSpace: 'normal' }}
                >
                    Assigned Roles: {props.userObj.roles[0].name}
                </Chip>

            </CardContent>
            <CardActions
                orientation="vertical"
                buttonFlex={1}
                sx={{
                    '--Button-radius': '40px',
                    width: 'clamp(min(100%, 160px), 50%, min(100%, 200px))',
                }}
            >
                {/*Edit User dialogue and button*/}
                <Button variant="solid" color="primary" onClick={() => {
                    setOpenEdit(true)
                    setTinNumber(props.userObj.tinNumber)
                    setRole(props.userObj.roles[0].name)
                }}>
                    Edit
                </Button>
                <Dialog
                    open={openEdit}
                    onClose={handleCloseEdit}
                >
                    <DialogTitle>Edit User</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="email"
                            name="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            variant="standard"
                            onChange={handleChangeEmail}
                        />

                        <TextField
                            required
                            margin="dense"
                            id="firstName"
                            name="firstname"
                            label="First name"
                            type="string"
                            fullWidth
                            variant="standard"
                            onChange={handleChangeFirstName}
                        />

                        <TextField
                            required
                            margin="dense"
                            id="lastName"
                            name="lastname"
                            label="Last name"
                            type="string"
                            fullWidth
                            variant="standard"
                            onChange={handleChangeLastName}
                        />

                        <TextField
                            required
                            margin="dense"
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            fullWidth
                            variant="standard"
                            onChange={handleChangePassword}
                        />

                        <TextField
                            required
                            margin="dense"
                            id="tinNumber"
                            name="tin"
                            defaultValue={tinNumber}
                            label="Tin Number"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={(e) => setTinNumber(e.target.value)}
                        />
                        <Select
                            value={role}
                            label="Role"
                            defaultValue={props.userObj.roles[0].name}
                            sx={{ width: 'auto', height: 40, border: "1px solid", color: "#000" }}
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <MenuItem value={'ROLE_ADMIN'}>ADMIN</MenuItem>
                            <MenuItem value={'ROLE_EMPLOYEE'}>EMPLOYEE</MenuItem>
                            <MenuItem value={'ROLE_FARMER'}>FARMER</MenuItem>
                        </Select>


                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseEdit}>Cancel</Button>
                        <Button onClick={() => {
                            if (!tinNumber.trim()) {
                                setIsErrorDialogOpen(true);
                                return;
                            }

                            edit_user(props.userObj.tinNumber, tinNumber, firstName, LastName, password, email, role)
                                .then((res) => {
                                    console.log(res);
                                    // You might want to handle successful submission here
                                })
                                .catch((e) => {
                                    console.log(e);
                                    setSubmissionErrorMessage('Failed to edit user. Please try again.'); // Set a custom error message
                                    setIsSubmissionErrorDialogOpen(true);
                                });
                            setOpenEdit(false)
                        }}>Update User</Button>
                    </DialogActions>
                </Dialog>


                {/*Delete User dialogue and button*/}
                <Button variant="outlined" color="danger" onClick={handleClickOpen}>
                    Delete
                </Button>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCloseNo}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>{"Delete User?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            Are you sure that you would like to detele the user with tin: {props.userObj.tinNumber}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ display: 'flex', justifyContent: "flex-end" }}>
                        <Button onClick={() => handleCloseYes(props.userObj.tinNumber)}>Yes</Button>
                        <Button onClick={handleCloseNo}>No</Button>
                    </DialogActions>
                </Dialog>

            </CardActions>
            <Dialog open={isSubmissionErrorDialogOpen} onClose={() => setIsSubmissionErrorDialogOpen(false)}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent>
                    <Typography>{submissionErrorMessage}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsSubmissionErrorDialogOpen(false)}>OK</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={isErrorDialogOpen} onClose={() => setIsErrorDialogOpen(false)}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent>
                    <Typography>TIN number is required.</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsErrorDialogOpen(false)}>OK</Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}

export default UserComponent;