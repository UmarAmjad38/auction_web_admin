import { Box, Typography } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';
import ViewInArRoundedIcon from '@mui/icons-material/ViewInArRounded';
import { useAuctionDetailStyles } from '../AuctionStyles';

const AuctionDetails = ({ auctionDetails }: any) => {
    const classes = useAuctionDetailStyles();

    return (
        <Box className={classes.container}>
            {/* Row 1 */}
            <Box className={classes.row}>
                {/* Location */}
                <Box className={classes.iconText}>
                    <PlaceIcon fontSize="small" color="primary" />
                    <Typography className={classes.text}>
                        {auctionDetails.address?.length > 30 ? `${auctionDetails?.address.substring(0, 30)}...` : auctionDetails?.address}
                    </Typography>
                </Box>
                {/* Date Range */}
                <Box className={`${classes.iconText} ${classes.flexItem}`}>
                    <WatchLaterRoundedIcon fontSize="small" color="primary" />
                    <Typography className={classes.text} sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                        {auctionDetails.dateRange}
                    </Typography>
                </Box>
            </Box>

            {/* Row 2 */}
            <Box className={classes.row}>
                {/* Lots Available */}
                <Box className={classes.iconText}>
                    <ViewInArRoundedIcon fontSize="small" color="primary" />
                    <Typography className={classes.text}>
                        {auctionDetails.lotsAvailable > 0 ? auctionDetails.lotsAvailable : "No"}&nbsp;
                        {auctionDetails.lotsAvailable > 1 ? "Lots" : "Lot"}&nbsp;Available
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default AuctionDetails;
