import React from 'react';
import { Dialog, DialogContent, IconButton, Box, Typography } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const CustomModal = ({ open, onClose, modalType }: any) => {
    const modalContent = [
        {
            type: "login",
            title: "Congratulations!",
            desc: "You have successfully logged into the system!",
            svg: `${process.env.PUBLIC_URL}/assets/svgs/congratulation.svg`,
        },
        {
            type: "password",
            title: "Congratulations!",
            desc: "Your password has been updated successfully!",
            svg: `${process.env.PUBLIC_URL}/assets/svgs/check.svg`,
        },
        {
            type: "savelot",
            title: "Save Your Lot!",
            desc: "Please save your current lot first.",
            // svg: `${process.env.PUBLIC_URL}/assets/svgs/check.svg`,
        },
    ];

    // Find the content for the current modalType
    const content = modalContent.find((item) => item.type === modalType);

    if (!content) return null; // Return nothing if no content matches the modalType

    return (
        <Dialog open={open} onClose={onClose}>
            <IconButton onClick={onClose} color="primary" sx={{ position: 'absolute', right: 0 }}>
                <HighlightOffIcon />
            </IconButton>
            <DialogContent sx={{ my: 2 }}>

                {content.svg && <Box display="flex" justifyContent="center" alignItems="center">
                    <Box
                        component="img"
                        src={content.svg}
                        alt={content.title}
                        sx={{
                            width: "120px", // Responsive width
                            height: 'auto', // Maintain aspect ratio
                            transition: 'width 0.2s ease-in-out', // Smooth resize
                        }}
                    />
                </Box>}

                <Typography variant="h4" textAlign="center" mt={2} color="primary">
                    {content.title}
                </Typography>

                <Typography variant="body1" textAlign="center" mt={2}>
                    {content.desc}
                </Typography>
            </DialogContent>
        </Dialog>
    );
};

export default CustomModal;
