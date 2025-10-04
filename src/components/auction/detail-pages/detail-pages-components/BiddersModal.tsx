import { Dialog, DialogContent, IconButton, Typography, Box, Divider } from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import useWinnerModalStyle from './WinnerModalStyles';

const BiddersModal = ({ open, onClose, bidders }: any) => {
    const classes = useWinnerModalStyle();
    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
            <Box p={2}>
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: "5px" }}>
                    <Typography variant="h5" className={classes.title}>
                        Lot Bidders
                    </Typography>
                    <IconButton onClick={onClose}>
                        <ClearRoundedIcon
                            sx={{
                                color: 'black',
                                padding: "1px",
                                border: "1px solid #676767",
                                borderRadius: "50px"
                            }}
                        />
                    </IconButton>
                </Box>
                <Divider sx={{ py: 1 }} />

                <DialogContent className={classes.modalContent}>
                    {/* Bidders List */}
                    {bidders.length === 0 ? (
                        <Box className={classes.noBidder}>
                            <h2>No Bidder Found!</h2>
                        </Box>
                    ) : (
                        <Box style={{ padding: '10px' }}>
                            {bidders.map((bidder: any) => (
                                <Box
                                    key={bidder.id}
                                    className={classes.bidderDetails}
                                >
                                    {/* Bidder Image */}
                                    <Box className={classes.bidderImageBox}>
                                        <Box
                                            component="img"
                                            src={bidder.image || `${process.env.PUBLIC_URL}/assets/pngs/bidder.png`}
                                            alt={bidder.name}
                                            className={classes.bidderImage}
                                        />
                                        <Typography className={classes.bidderName}>
                                            {bidder.name}
                                        </Typography>
                                    </Box>

                                    {/* Bidder Details */}
                                    <Box className={classes.detailsWrapper}>
                                        <Box className={classes.detail}>
                                            <Typography className={classes.bidderHeading}>
                                                Bid Amount
                                            </Typography>
                                            <Typography className={classes.bidderValue}>
                                                ${bidder.bidAmount}
                                            </Typography>
                                        </Box>
                                        <Box className={classes.detail}>
                                            <Typography className={classes.bidderHeading}>
                                                Email
                                            </Typography>
                                            <Typography className={classes.bidderValue}>
                                                {bidder.email}
                                            </Typography>
                                        </Box>
                                        <Box className={classes.detail}>
                                            <Typography className={classes.bidderHeading}>
                                                Address
                                            </Typography>
                                            <Typography className={classes.bidderValue}>
                                                {bidder.address}
                                            </Typography>
                                        </Box>
                                        <Box className={classes.detail}>
                                            <Typography className={classes.bidderHeading}>
                                                Company
                                            </Typography>
                                            <Typography className={classes.bidderValue}>
                                                {bidder.company}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    )}
                </DialogContent>
            </Box>
        </Dialog>
    );
};

export default BiddersModal;
