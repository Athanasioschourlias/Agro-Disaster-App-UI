import React from 'react';
import Box from "@mui/material/Box";
import LogInComp from "./login.component";

function HomeCoponentPage(props: any) {
    return (
        <div>
            <div style={{width: '100%'}}>
                <Box
                    sx={{
                        display: 'flex',
                        m: 3,
                        p: 1,
                        bgcolor: 'background.paper',
                        alignContent: 'center',
                        justifyContent: 'space-evenly',
                        borderRadius: 1
                    }}
                >
                    <LogInComp/>
                </Box>
            </div>
        </div>
    );
}

export default HomeCoponentPage;