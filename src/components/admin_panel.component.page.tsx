import React, { useEffect, useState } from 'react';
import { get_all_users } from "../services/admin.service";
import UserComponent from "./user.component";
import { User } from "../types/user";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function AdminPanelComponentPage() {
    const [listData, setListData] = useState<User[]>([]);
    const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const populateList = () => {
        get_all_users()
            .then((res: User[]) => {
                setListData(res);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setErrorMessage('Failed to fetch users. Please try again.');
                setIsErrorDialogOpen(true);
            });
    };

    useEffect(() => {
        populateList();
    }, []);

    return (
        <>
            <Box sx={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>
                {listData.map((user, i) => <UserComponent userObj={user} key={i} />)}
            </Box>

            <Dialog open={isErrorDialogOpen} onClose={() => setIsErrorDialogOpen(false)}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent>
                    <Typography>{errorMessage}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsErrorDialogOpen(false)}>OK</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default AdminPanelComponentPage;
