import { Box, Typography } from '@mui/material';
import ViewInArRoundedIcon from '@mui/icons-material/ViewInArRounded';
import { useAuctionDetailStyles } from '../AuctionStyles';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import DeviceHubRoundedIcon from '@mui/icons-material/DeviceHubRounded';

const LiveStreamingDetails = ({ streamData }: any) => {
    const classes = useAuctionDetailStyles();

    return (
        <Box className={classes.containerLive}>
            {/* Lots Available */}
            <Box className={classes.iconText}>
                <ViewInArRoundedIcon fontSize="small" color="primary" />
                <Typography className={classes.textLive}>{streamData?.lotsAvailable} Lots Available</Typography>
            </Box>

            {/* Location */}
            <Box className={classes.iconText}>
                <CategoryRoundedIcon fontSize="small" color="primary" />
                <Typography className={classes.textLive}>{streamData?.category}</Typography>
            </Box>

            {/* Date Range */}
            <Box className={`${classes.iconText} ${classes.flexItem}`}>
                <DeviceHubRoundedIcon fontSize="small" color="primary" />
                <Typography className={classes.textLive} sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                    {streamData?.subCategory}
                </Typography>
            </Box>


        </Box>
    );
};

export default LiveStreamingDetails;
