import React, {useEffect, useState} from 'react';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import {User} from "../types/user";
import {delete_form_by_id, get_all_farmer_forms} from "../services/farmer.service";
import {Form} from "../types/Form";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide} from "@mui/material";
import {TransitionProps} from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function FarmerPanelComponentPage(props: any) {



    const [rows, setRows] = useState<Form[]>([]);

    const populateList = () => {
        // Perform data fetching or any other logic to populate the list
        // For example, you might fetch data from an API
        // Replace the following with your actual data fetching logic
        get_all_farmer_forms()
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
                <caption>Here are all your forms along with their status</caption>
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
                            <td>{form.status}</td>
                            <td style={{overflowWrap: 'break-word'}}>{form.damageDescription}</td>
                            <td>
                                <Box sx={{display: 'flex', gap: 1}}>
                                    <Button variant="outlined" color="primary" >
                                        Edit
                                    </Button>
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

export default FarmerPanelComponentPage;