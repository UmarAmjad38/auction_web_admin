import React, { useState } from 'react';
import { Box, Divider, StyledEngineProvider } from '@mui/material';
import SideBar from './sidebar/SideBar';
import Header from './header/Header'; // Import your Header component

const AppProvider = ({ children }: any) => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <StyledEngineProvider injectFirst>
            <Box sx={{ display: 'flex', height: '100vh' }}>
                {/* Sidebar on the left */}
                <SideBar />

                {/* Main content area */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Header on top */}
                    <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    <Divider variant='fullWidth' sx={{ opacity: 0.5 }} />

                    {/* Content area below the header */}
                    <Box id="childContainer" sx={{ flex: 1, overflowY: 'auto', padding: 1 }}>
                        {React.cloneElement(children, { searchTerm })}
                    </Box>
                </Box>
            </Box>
        </StyledEngineProvider>
    );
};

export default AppProvider;
