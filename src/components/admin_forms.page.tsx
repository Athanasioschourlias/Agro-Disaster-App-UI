import React, {useEffect, useState} from 'react';
import {editFormType, Form} from "../types/Form";
import {delete_form_by_id, get_all_farmer_forms} from "../services/farmer.service";
import {edit_form_by_id, get_all_forms} from "../services/employee.forms";
import Table from "@mui/joy/Table";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import Sheet from "@mui/joy/Sheet";
import {Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, TextField} from "@mui/material";
import {useNavigate} from "react-router-dom";
import FormatListBulletedRoundedIcon from '@mui/icons-material/FormatListBulletedRounded';

function AdminPanelComponentPageForms(props: any) {

    const [rows, setRows] = useState<Form[]>([]);

    const [status, setStatus] = React.useState('')
    const [openEdit, setOpenEdit] = React.useState(false)
    const [editFormId, setEditFormId] = React.useState(-1)

    const populateList = () => {
        // Perform data fetching or any other logic to populate the list
        // For example, you might fetch data from an API
        // Replace the following with your actual data fetching logic
        get_all_forms()
            .then((res: Form[]) => {
                setRows(res)
                console.log(res)
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    // useEffect to call the function when the component is loaded
    useEffect(() => {
        populateList();
        // The empty dependency array ensures that this effect runs only once on component mount
    }, []);

    const handleStatusUpdate = (event: any) => {

        // setStatus(event.target.value);
        console.log(event.target.value)
    };

    const handleOpenEdit = (formId: number) => {
        setEditFormId(formId)
        setOpenEdit(true)
    };

    const navigate = useNavigate();

    return (
        <Sheet
            variant="solid"
            color="primary"
            invertedColors
            sx={{
                pt: 1,
                borderRadius: 'sm',
                transition: '0.3s',
                overflow: 'auto',
                // the number is the amount of the header rows.
                '--TableHeader-height': 'calc(1 * var(--TableCell-height))',
                '--Table-firstColumnWidth': '80px',
                '--Table-lastColumnWidth': '170px',
                backgroundSize:
                    '50px calc(100% - var(--TableCell-height)), 50px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height)), 14px calc(100% - var(--TableCell-height))',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'local, local, scroll, scroll',
                backgroundPosition:
                    'var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height), var(--Table-firstColumnWidth) var(--TableCell-height), calc(100% - var(--Table-lastColumnWidth)) var(--TableCell-height)',
                background: (theme) =>
                    `linear-gradient(45deg, ${theme.vars.palette.primary[500]}, ${theme.vars.palette.primary[400]})`,
                '& tr:last-child': {
                    '& td:first-child': {
                        borderBottomLeftRadius: '8px',
                    },
                    '& td:last-child': {
                        borderBottomRightRadius: '8px',
                    },
                },
            }}
        >
            <Table
                stripe="odd"
                hoverRow>
                <caption>Here are the forms from all the users that have processed or need to be processed</caption>
                <thead>
                <tr>
                    <th style={{width: 'var(--Table-firstColumnWidth)'}}>Form Id</th>
                    <th>Location</th>
                    <th>Acres&nbsp;</th>
                    <th>Crop Type&nbsp;</th>
                    <th>Status&nbsp;</th>
                    <th style={{overflowWrap: 'break-word'}} >Damage Description&nbsp;</th>
                    <th style={{width: 'var(--Table-lastColumnWidth)'}}>Actions&nbsp;</th>
                </tr>
                </thead>
                <tbody>
                {rows.map((form: Form, rowIndex) => {
                    return (
                        <tr key={form.id}>
                            <td>{form.id}</td>
                            <td>{form.location}</td>
                            <td>{form.acres}</td>
                            <td>{form.cropType}</td>
                            <td>
                                <Select

                                    value={form.status}
                                    label="Age"
                                    sx={{
                                        width: 'auto',
                                        height: 40,
                                        marginRight: 15,
                                        border: "1px solid",
                                        color: "#fff",
                                    }}
                                    onChange={(event) => {


                                        if (event.target.value === form.status)
                                            console.log("The change of status: " + event.target.value + "to status: " + form.status + "is pointless")

                                        let newStatusForm: editFormType = {
                                            location: form.location,
                                            damageDescription: form.damageDescription,
                                            acres: form.acres,
                                            cropType: form.cropType,
                                            status: form.status
                                        };

                                        newStatusForm.status = event.target.value

                                        if(event.target.value === 'APPOINTMENT'){
                                            // store farmer mail to local memory
                                            localStorage.setItem('farmerMail', form.user.email)
                                            navigate('/forms/employee/schedule/appointment')
                                            edit_form_by_id(form.id, newStatusForm).then(() => {

                                                console.log("The status of the form changed successfully")

                                                navigate('/forms/employee/schedule/appointment')

                                            }).catch((e) => {
                                                console.log("The was an error while updating the form" + e)
                                            })
                                        } else {

                                            edit_form_by_id(form.id, newStatusForm).then(() => {
                                                console.log("The status of the form changed successfully")
                                            }).catch((e) => {
                                                console.log("The was an error while updating the form" + e)
                                            })

                                        }

                                    }}
                                >
                                    <MenuItem value={'PENDING'}>PENDING</MenuItem>
                                    <MenuItem value={'APPROVED'}>APPROVED</MenuItem>
                                    <MenuItem value={'REJECTED'}>REJECTED</MenuItem>
                                    <MenuItem value={'APPOINTMENT'}>Schedule Appointment</MenuItem>
                                </Select>
                            </td>
                            <td style={{overflowWrap: 'break-word'}}>{form.damageDescription}</td>
                            <td>
                                <Box sx={{display: 'flex', gap: 1}}>
                                    <Button variant="solid" color="danger" onClick={() => {
                                        delete_form_by_id(form.id).then((res) => {
                                            console.log(res)
                                            window.location.reload()
                                        })
                                    }}>
                                        Delete
                                    </Button>

                                </Box>
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </Table>
        </Sheet>
    );
}

export default AdminPanelComponentPageForms;