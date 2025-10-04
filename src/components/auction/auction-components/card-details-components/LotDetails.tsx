import { Box, Typography } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';
import ViewInArRoundedIcon from '@mui/icons-material/ViewInArRounded';
import { useAuctionDetailStyles } from '../AuctionStyles';
import theme from '../../../../theme';
import { useState, useEffect } from 'react';

const LotDetails = ({ lotData }: any) => {
    const classes = useAuctionDetailStyles();
    const [countdown, setCountdown] = useState<string>('00:00:00');
    useEffect(() => {
        const calculateCountdown = () => {
            if (!lotData.details?.endDate || !lotData.details?.endTime) {
                setCountdown(''); // Handle missing data
                return;
            }

            // Split endDate into MM-DD-YYYY format
            const [day, month, year] = lotData.details.endDate.split('-').map(Number);

            // Create a Date object in LOCAL TIME
            const endDateTime = new Date(year, month - 1, day);

            // Extract hours and minutes from endTime (assume 12-hour format with AM/PM)
            const [time, period] = lotData.details.endTime.split(' ');
            let [hours, minutes] = time.split(':').map(Number);

            if (period.toLowerCase() === 'pm' && hours !== 12) hours += 12;
            if (period.toLowerCase() === 'am' && hours === 12) hours = 0;

            // Set correct hours & minutes
            endDateTime.setHours(hours, minutes, 0, 0);
            if (isNaN(endDateTime.getTime())) {
                setCountdown(''); // Invalid date
                return;
            }

            const now = new Date();
            const remainingTime = endDateTime.getTime() - now.getTime();

            if (remainingTime > 0) {
                const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
                const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
                const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
                const seconds = Math.floor((remainingTime / 1000) % 60);

                setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            } else {
                setCountdown(''); // Auction ended
            }
        };

        calculateCountdown(); // Initial calculation
        const interval = setInterval(calculateCountdown, 1000); // Update every second

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [lotData.details.endTime, lotData.details.endDate]);

    return (
        <Box className={classes.lotContainer}>
            <Typography fontSize={12} width={"70%"} height={'30px'}>
                {lotData.description.length > 45 ? `${lotData.description.substring(0, 60)}...` : lotData.description}
            </Typography>
            <Box display={'flex'} justifyContent={"space-between"} alignItems={"center"} flexWrap={'wrap'} >
                <Box display={"flex"} flex={0.8} whiteSpace={'nowrap'}>
                    <Typography color={theme.palette.primary.main9} fontWeight={500}>Lot Number</Typography>
                    <Typography ml={0.5} color={theme.palette.primary.main2}>: #&nbsp;{lotData.lotNumber}</Typography>
                </Box>
                {countdown !== "" ?
                    <Box display={"flex"} flex={1} >
                        <Typography color={theme.palette.primary.main9} fontWeight={500} whiteSpace={"nowrap"}>Count Down</Typography>
                        <Typography ml={0.5} letterSpacing={3} color={theme.palette.primary.main2} whiteSpace={'nowrap'}>
                            :&nbsp;{countdown}
                        </Typography>
                    </Box>
                    :
                    <Box display={"flex"} flex={0.7} >
                        <Typography color={theme.palette.secondary.main} whiteSpace={'nowrap'}>
                            Lot Ended
                        </Typography>
                    </Box>
                }
            </Box>
        </Box>
    );
};

export default LotDetails;
