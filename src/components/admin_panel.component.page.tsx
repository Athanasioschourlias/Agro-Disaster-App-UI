import React, {useEffect, useState} from 'react';

import {get_all_users} from "../services/admin.service";
import UserComponent from "./user.component";
import {User} from "../types/user";
import Box from "@mui/material/Box";


function AdminPanelComponentPage(props: any) {

    // State to store your list data
    const [listData, setListData] = useState<User[]>([]);

    const populateList = () => {
        // Perform data fetching or any other logic to populate the list
        // For example, you might fetch data from an API
        // Replace the following with your actual data fetching logic
        get_all_users()
            .then((res: User[]) => {
                setListData(res)
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    // useEffect to call the function when the component is loaded
    useEffect(() => {
        populateList();
        // The empty dependency array ensures that this effect runs only once on component mount
    }, []);

    return (
        <Box sx={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'space-evenly'}}>

            {listData.map((user, i) => <UserComponent userObj={user}  key={i} />)}

        </Box>


    );
}

export default AdminPanelComponentPage;