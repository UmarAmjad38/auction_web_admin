import { Box, Typography } from '@mui/material';

const NoRecordFound = () => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="70vh"
            textAlign="center"
        >
            <Box>
                <Box p={2}>
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/pngs/norecord.png`}
                        alt="No Record"
                        style={{ width: '100%', height: '100%' }}
                    />
                </Box>
                <Typography variant="h6" color="textSecondary">
                    No record found!
                </Typography>
            </Box>

        </Box>
    );
};

export default NoRecordFound;
