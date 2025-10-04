import { useEffect, useState } from "react";
import { Box, Button, Typography, Card, CardMedia, Grid, CircularProgress, Container, IconButton } from "@mui/material";
import useDetailStyles from "./detail-pages-components/DetailPageStyles";
import { getQueryParam } from "../../../helper/GetQueryParam";
import theme from "../../../theme";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WatchLaterRoundedIcon from '@mui/icons-material/WatchLaterRounded';
import { useLocation, useNavigate } from "react-router-dom";
import CustomDialogue from "../../custom-components/CustomDialogue";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import AuctionCard from "../auction-components/AuctionCard";
import BiddingTable from "./detail-pages-components/BiddingTable";
import { deleteAuction, getAuctionDetailById } from "../../Services/Methods";
import PaginationButton from "../auction-components/PaginationButton";
import { ErrorMessage, SuccessMessage } from "../../../utils/ToastMessages";
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';


const AuctionDetailPage = () => {
    const classes = useDetailStyles();

    const locationURL = useLocation();

    const [auctionDetails, setAuctionDetails]: any = useState([])
    const [paginationedData, setPaginationedData]: any = useState([])

    const [auctionLots, setAuctionLots] = useState<any[]>([]);

    const [deleteAuctionId, setDeleteAuctionId] = useState(0)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [isDeletedFromDetail, setIsDeletedFromDetail] = useState(false)

    const [showMoreTerms, setShowMoreTerms] = useState(false);
    const [showMorePaymentTerms, setShowMorePaymentTerms] = useState(false);

    const [isFetchingData, setIsFetchingData] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (!isFetchingData) {
            setIsFetchingData(true);
            fetchAuctionDetails()
        }
    }, [])


    const fetchAuctionDetails = async () => {
        try {
            const response = await getAuctionDetailById(getQueryParam("aucId"));
            const auction = response.data.Auction;
            const lots = response.data.Lots;

            if (auction) {
                const formattedAuctionDetails = {
                    id: auction.Id,
                    name: auction.Name,
                    image: auction.Image,
                    type: auction.IsPast ? "past" : "current",
                    details: {
                        location: `${auction.City}, ${auction.Country}`,
                        dateRange: `${auction.StartDate} to ${auction.EndDate}`,
                        lotsAvailable: `${auction.TotalLots} Lots Available`
                    },

                    dateRange: `${auction.StartDate} to ${auction.EndDate}`,
                    timeRange: `${auction.StartTime} to ${auction.EndTime}`,
                    previewDateRange: `${auction.PrevStartDate} to ${auction.PrevEndDate}`,
                    previewTimeRange: `${auction.PrevStartTime} to ${auction.PrevEndTime}`,

                    description: auction.ShortDescription,
                    notes: auction.Notes,

                    liveStreaming: auction.LiveStreaming,
                    startDate: auction.StartDate,
                    endDate: auction.EndDate,
                    startTime: auction.StartTime,
                    endTime: auction.EndTime,
                    prevStartDate: auction.PrevStartDate,
                    prevEndDate: auction.PrevEndDate,
                    prevStartTime: auction.PrevStartTime,
                    prevEndTime: auction.PrevEndTime,

                    country: auction.Country,
                    state: auction.State,
                    zipCode: auction.ZipCode,
                    city: auction.City,
                    address: auction.Address,
                    fullAddress: `Street ${auction.Address}, ${auction.City}, ${auction.ZipCode}, ${auction.State}, ${auction.Country}`,
                    shippingMethod: auction.ShippingMethod,
                    termsConditions: auction.TermsConditions,
                    paymentTerms: auction.PaymentTerms,
                    // termsConxditions: "Welcome to our auction! By participating, you agree to our terms: All bids are binding and non-retractable. Items are sold without warranty, expressed or implied. Payment must be completed within 48 hours of auction close. Shipping costs are borne by the buyer, and delivery timelines may vary. We reserve the right to cancel or reschedule auctions without prior notice. Unauthorized use of our platform is prohibited. All sales are final; no returns or refunds will be entertained.",
                    // paymentTerms: "Welcome to our auction! By participating, you agree to our terms: All bids are binding and non-retractable. Items are sold without warranty, expressed or implied. Payment must be completed within 48 hours of auction close. Shipping costs are borne by the buyer, and delivery timelines may vary. We reserve the right to cancel or reschedule auctions without prior notice. Unauthorized use of our platform is prohibited. All sales are final; no returns or refunds will be entertained.",
                    createdAt: auction.CreatedAt,
                    updatedAt: auction.UpdateddAt,
                    isDeleted: auction.IsDeleted,
                    isSold: auction.IsSold,
                    totalLots: auction.TotalLots
                };
                setAuctionDetails(formattedAuctionDetails);
            } else {
                setAuctionDetails(null)
            }

            if (lots.length > 0) {
                const formattedLots = lots.map((item: any) => ({
                    id: item.Id,
                    auctionId: item.AuctionId,
                    lotNumber: item.LotNo,
                    name: item.ShortDescription,
                    description: item.LongDescription,
                    countDown: "N/A",
                    location: "N/A",
                    image: item.Image,
                    type: "current",
                    highestBid: item.BidStartAmount,
                    sold: item.IsSold,
                    details: {
                        description: item.LongDescription,
                        date: `${item.StartDate} to ${item.EndDate}`,
                        time: `${item.StartTime} to ${item.EndTime}`,
                        orderNumber: item.OrderNo,
                        lot: item.LotNo,
                        category: item.Category,
                        subCategory: item.SubCategory,
                        winner: {
                            email: "N/A", // Replace with actual data if available
                            phone: "N/A", // Replace with actual data if available
                            location: "N/A", // Replace with actual data if available
                        },
                    },
                }));
                setAuctionLots(formattedLots)
                setPaginationedData(formattedLots)
            } else {
                setPaginationedData([])
                setAuctionLots([])
            }

        } catch (error) {
        } finally {
            setIsFetchingData(false);
        }
    };

    const handleDelete = async () => {
        try {
            const response: any = await deleteAuction(deleteAuctionId);
            if (response.status === 200) {
                SuccessMessage('Lot deleted successfully!')
                if (isDeletedFromDetail) {
                    navigate('/auction')
                } else {
                    setAuctionLots(auctionLots.filter(lot => lot.id !== deleteAuctionId))
                    setPaginationedData(auctionLots.filter(lot => lot.id !== deleteAuctionId))
                }
            } else {
                ErrorMessage('Error deleting lot!')
            }
        } catch (error) {
        } finally {
            handleCloseModal()
        }
    };

    const navigate = useNavigate()

    // Handle Edit
    const handleEdit = (id: string) => {
        navigate(`/auction/edit?aucId=${id}`);
    };

    // Handle Edit
    const handleEditLots = (lotId: number, aucId: any) => {
        navigate(`/auction/lots/edit?lotId=${lotId}&aucId=${aucId}`);
    };

    // Open confirmation modal
    const handleDeleteAuction = (id: number) => {
        setDeleteAuctionId(id);
        setConfirmDelete(true);
    };

    // Close modal
    const handleCloseModal = () => {
        if (!isDeleting) {
            setIsDeleting(false)
            setConfirmDelete(false);
            setDeleteAuctionId(0);
        }
    };

    // Confirm deletion
    const handleConfirmDelete = () => {
        if (!isDeleting) {
            setIsDeleting(true)
            handleDelete(); // Call the delete handler
        }
    };

    const handleSeeMoreClick = (type: string) => {
        if (type === "terms") {
            setShowMoreTerms(!showMoreTerms);
        } else {
            setShowMorePaymentTerms(!showMorePaymentTerms)
        }
    };

    const handleMoveModal = (movedLotId: number) => {
        if (movedLotId > 0) {
            setAuctionLots((prevData: any) => prevData.filter((item: any) => item.id !== movedLotId));
        }
    }

    return (
        <Box p={2}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pb: 2 }}>
                <IconButton onClick={() => navigate('/auction')}>
                    <KeyboardReturnRoundedIcon />
                </IconButton>
                <Typography className={classes.title}>
                    Auction Details
                </Typography>
            </Box>

            {!isFetchingData ?
                <Box>
                    <Grid container spacing={4}>
                        {/* Left Section */}
                        <Grid item xs={12} md={6}>
                            <Card className={classes.card} elevation={2}>
                                {/* Main Image */}
                                <CardMedia
                                    component="img"
                                    image={auctionDetails.image}
                                    alt="Auction Image"
                                    className={classes.media}
                                    height={300}
                                />
                            </Card>

                            <Box paddingTop={3}>
                                <Typography className={classes.dateTime} color={theme.palette.primary.main2} gutterBottom>
                                    Auction Date and Time for Live Streaming
                                </Typography>

                                <Box className={classes.row}>
                                    <Box className={classes.iconText}>
                                        <CalendarMonthIcon fontSize="small" color="primary" />
                                        <Typography className={classes.text}>
                                            {auctionDetails?.dateRange}
                                        </Typography>
                                    </Box>
                                    <Box className={classes.iconText}>
                                        <WatchLaterRoundedIcon fontSize="small" color="primary" />
                                        <Typography className={classes.text} sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                                            {auctionDetails?.timeRange}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                            <Box paddingTop={3}>
                                <Typography className={classes.dateTime} color={theme.palette.primary.main2} gutterBottom>
                                    Auction Preview Date and Time
                                </Typography>
                                <Box className={classes.row}>
                                    <Box className={classes.iconText}>
                                        <CalendarMonthIcon fontSize="small" color="primary" />
                                        <Typography className={classes.text}>{auctionDetails?.previewDateRange}</Typography>
                                    </Box>
                                    <Box className={classes.iconText}>
                                        <WatchLaterRoundedIcon fontSize="small" color="primary" />
                                        <Typography className={classes.text} sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                                            {auctionDetails?.previewTimeRange}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                            <Box paddingTop={3}>
                                <Typography className={classes.location} color={theme.palette.primary.main2} gutterBottom>
                                    {/* Street Number 21, Hawks Street , UK London, 45560, London, United Kingdom */}
                                    {auctionDetails.fullAddress}
                                </Typography>
                                <Box className={classes.details}>
                                    <Typography className={classes.detailHeading} py={1}>Currency USD</Typography>
                                    {/* <Typography className={classes.detailText} >&nbsp;: 5000</Typography> */}
                                </Box>
                            </Box>

                            {auctionDetails.termsConditions?.length &&
                                <Box paddingTop={1}>
                                    <Typography className={classes.terms}>Terms and Condition:</Typography>
                                    <Typography className={classes.termsText}>
                                        {showMoreTerms || auctionDetails.termsConditions.length < 235
                                            ? auctionDetails.termsConditions
                                            : `${auctionDetails.termsConditions.slice(0, 235)}...`}
                                        {auctionDetails.termsConditions.length > 235 &&
                                            <Typography
                                                component={'span'}
                                                className={classes.seeMore}
                                                onClick={() => handleSeeMoreClick('terms')}
                                            >
                                                {showMoreTerms ? "See Less" : "See More"}
                                            </Typography>
                                        }
                                    </Typography>
                                </Box>
                            }
                            {auctionDetails.paymentTerms?.length &&
                                <Box paddingTop={3}>
                                    <Typography className={classes.terms}>Payment Terms:</Typography>
                                    <Typography className={classes.termsText}>
                                        {showMorePaymentTerms || auctionDetails.paymentTerms.length < 235
                                            ? auctionDetails.paymentTerms
                                            : `${auctionDetails.paymentTerms.slice(0, 235)}...`}
                                        {auctionDetails.paymentTerms.length > 235 && (
                                            <Typography
                                                component={'span'}
                                                className={classes.seeMore}
                                                onClick={() => handleSeeMoreClick('payment')}
                                            >
                                                {showMorePaymentTerms ? " See Less" : " See More"}
                                            </Typography>
                                        )}
                                    </Typography>
                                </Box>
                            }
                        </Grid>

                        {/* Right Section */}
                        <Grid item xs={12} md={6}>
                            <Box>
                                <Typography className={classes.rightTitle}>
                                    {auctionDetails.name}
                                </Typography>
                                <Typography className={classes.description} mb={2}>
                                    {auctionDetails.description}
                                </Typography>

                                <Box display={'flex'} gap={3}>
                                    <Box className={classes.iconText}>
                                        <FiberManualRecordIcon sx={{ width: "15px", height: "15px" }} color="primary" />
                                        <Typography className={classes.text}>ID# {auctionDetails.id}</Typography>
                                    </Box>
                                    <Box className={classes.iconText}>
                                        <FiberManualRecordIcon sx={{ width: "15px", height: "15px" }} color="primary" />
                                        <Typography className={classes.text}>Online Auction</Typography>
                                    </Box>
                                    {auctionDetails.lLiveStreaming &&
                                        <Box className={classes.iconText}>
                                            <FiberManualRecordIcon sx={{ width: "15px", height: "15px" }} color="primary" />
                                            <Typography className={classes.text}>Live Streaming</Typography>
                                        </Box>
                                    }
                                    <Box className={classes.iconText}>
                                        <FiberManualRecordIcon sx={{ width: "15px", height: "15px" }} color="primary" />
                                        <Typography className={classes.text}>Buyer Premium : 10%</Typography>
                                    </Box>
                                </Box>

                                {/* Details */}
                                <Box className={classes.iconText} py={1}>
                                    <CalendarMonthIcon fontSize="small" color="primary" />
                                    <Typography className={classes.text}>{auctionDetails.dateRange}</Typography>
                                </Box>
                                <Box className={classes.iconText}>
                                    <WatchLaterRoundedIcon fontSize="small" color="primary" />
                                    <Typography className={classes.text} sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
                                        {auctionDetails.timeRange}
                                    </Typography>
                                </Box>

                                {/* Buttons */}
                                <Box className={classes.actionButtons} py={1}>
                                    <Button className={classes.actionButton}
                                        variant="contained" size="small" color="primary"
                                        onClick={() => handleEdit(auctionDetails.id)}
                                    >
                                        Edit
                                    </Button>
                                    <Button className={classes.actionButton}
                                        variant="contained" size="small" color="error"
                                        onClick={() => {
                                            setIsDeletedFromDetail(true);
                                            handleDeleteAuction(auctionDetails.id)
                                        }}
                                    >
                                        Delete
                                    </Button>
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>

                    {auctionLots.length > 0 &&
                        <Box width={'80vw'} overflow={'auto'} pt={3}>
                            <Box className={classes.titleWrapper}>
                                <Typography className={classes.title}>
                                    Auction Lots :
                                </Typography>
                                <Box className={classes.countBadge}>{auctionDetails.totalLots}</Box>
                            </Box>
                            <Container disableGutters maxWidth={false} sx={{ mt: 3, pl: 1 }}>
                                <Grid container spacing={3}>
                                    {paginationedData && paginationedData.map((lot: any) => (
                                        <Grid item xs={12} sm={6} md={4} xl={3} key={lot.id}>
                                            <AuctionCard
                                                key={lot.id}
                                                headerType={'lots'}
                                                cardData={lot}
                                                handleEdit={handleEditLots}
                                                handleDelete={handleDeleteAuction}
                                                handleMoveModal={handleMoveModal}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Container>
                            <PaginationButton filteredData={auctionLots} setPaginationedData={setPaginationedData} />
                        </Box>
                    }
                </Box>
                :
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '70vh',
                        width: '100%',
                    }}
                >
                    <CircularProgress size={70} disableShrink />
                </Box>
            }
            {/* Confirmation Modal */}
            <CustomDialogue
                type={"delete"}
                title={"Confirm Deletion"}
                message={"Are you sure you want to delete this auction? This action cannot be undone."}
                openDialogue={confirmDelete}
                handleCloseModal={handleCloseModal}
                handleConfirmModal={handleConfirmDelete}
                isDeleting={isDeleting}

            />
        </Box >
    );
};

export default AuctionDetailPage;
