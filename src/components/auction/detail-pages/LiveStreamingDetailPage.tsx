import { useEffect, useState } from 'react';
import { Typography, Box, List, ListItem, Avatar, CircularProgress, Container, Grid, IconButton, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getQueryParam } from '../../../helper/GetQueryParam';
import AuctionCard from '../auction-components/AuctionCard';
import PaginationButton from '../auction-components/PaginationButton';
import useLiveStreamDetailStyles from './detail-pages-components/LiveStreamingDetailStyles';
import { getAuctionDetailById, getBiddersByLotId } from '../../Services/Methods';
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import { deleteRoom, joinRoom, leaveRoom } from '../../../utils/SocektMethods';

const LiveStreamingDetailPage = ({ socket }: any) => {
    const classes = useLiveStreamDetailStyles();

    const [confirmDelete, setConfirmDelete] = useState(false)
    const [deleteAuctionId, setDeleteAuctionId] = useState(0)
    const [isFetchingData, setIsFetchingData] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [fetchingBidders, setFetchingBidders] = useState(false);

    // const [auctionDetails, setAuctionDetails]: any = useState({})
    const [auctionLots, setAuctionLots]: any = useState([])
    const [paginationedData, setPaginationedData]: any = useState([])
    const [bidders, setBidders]: any = useState([])
    const [liveBidders, setLiveBidders]: any = useState([])
    const [select, setSelect] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [mainCardHeight, setMainCardHeight] = useState<number>(0);


    useEffect(() => {
        const mainCard = document.getElementById("main-card");
        if (mainCard) {
            setMainCardHeight(mainCard.offsetHeight);
        }

        const handleResize = () => {
            if (mainCard) setMainCardHeight(mainCard.offsetHeight);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    useEffect(() => {
        if (!isFetchingData) {
            setIsFetchingData(true);
            fetchAuctionDetails();
        }
    }, [])

    useEffect(() => {
        if (!socket || !auctionLots[currentIndex]?.roomId) return;

        joinRoom(socket, auctionLots[currentIndex].roomId);

        const handleJoinRoomError = (message: any) => {
            fetchBidders(auctionLots[currentIndex].id)
            setLiveBidders([])
        }

        const handleChatHistory = (message: any) => {
            setBidders([])
            setLiveBidders((prevBidders: any) => [...prevBidders, message]);
        }

        const handleNewMessage = (data: any) => {
            // const formattedData = {
            //     amount: data.amount
            //     clientID: 38
            //     event: "newMessage"
            //     lotID: 100
            //     message: "ali cheema has placed a bid of $100 on this item."
            //     sender: "Anonymous"
            //     timestamp: "2025-02-24T17:21:36.703Z"
            // }
            setLiveBidders((prevBidders: any) => [...prevBidders, data]);

        };

        socket.on("send-message-room", handleNewMessage);
        socket.on("chat-history", handleChatHistory);
        socket.on("join-room-error", handleJoinRoomError);

        return () => {
            socket.off("send-message-room", handleNewMessage);
            socket.off("chat-history", handleChatHistory);
            socket.off("join-room-error", handleJoinRoomError);
            leaveRoom(socket, auctionLots[currentIndex].roomId)
        };
    }, [socket, auctionLots, currentIndex]);

    const fetchAuctionDetails = async () => {
        try {
            const response = await getAuctionDetailById(getQueryParam("aucId"));
            const auction = response.data.Auction;
            const lots = response.data.Lots;

            if (lots?.length > 0) {
                const formattedLots = lots.map((item: any) => ({
                    id: item.Id,
                    auctionId: item.AuctionId,
                    roomId: item.RoomId,
                    lotNumber: item.LotNo,
                    name: item.ShortDescription,
                    description: item.LongDescription,
                    countDown: "N/A",
                    location: "N/A",
                    image: item.Image,
                    type: "current",
                    highestBid: item.BidStartAmount,
                    sold: item.IsSold,
                    isYoutube: item.IsYoutube || false,
                    youtubeId: item.YoutubeId || "LxDJlhj6Yk0",
                    details: {
                        lotsAvailable: auction.TotalLots,
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
                fetchBidders(formattedLots[currentIndex].id)
                setPaginationedData(formattedLots)
            } else {
                setAuctionLots([])
                setPaginationedData([])
            }

        } catch (error) {
        } finally {
            setIsFetchingData(false);
        }
    };


    const fetchBidders = async (id: number) => {
        setFetchingBidders(true)
        try {
            const response = await getBiddersByLotId(id);
            const bidders = response.data;
            if (bidders.length > 0) {
                const formattedBidders = response.data.map((bidder: any) => ({
                    id: bidder.Id,
                    clientId: bidder.ClientId,
                    name: bidder.Name,
                    amount: bidder.Amount + " USD",
                }));
                setBidders(formattedBidders)
            } else {
                setBidders([]);
            }
        } catch (error) {
        } finally {
            setFetchingBidders(false)
        }
    }

    const navigate = useNavigate()

    // Handle Edit
    const handleEdit = (id: string) => {
        navigate(`/auction/edit/${id}`);
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

    const handleMoveModal = (movedLotId: number) => {
        if (movedLotId > 0) {
            setAuctionLots((prevData: any) => prevData.filter((item: any) => item.id !== movedLotId));
        }
    }

    const handleNextLot = (id?: number) => {
        document.getElementById('childContainer')?.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        setCurrentIndex((prevIndex) => {
            if (id !== undefined) {
                const newIndex = auctionLots.findIndex((lot: any) => lot.id === id);
                fetchBidders(auctionLots[newIndex !== -1 ? newIndex : prevIndex].id)
                return newIndex !== -1 ? newIndex : prevIndex; // Set index if found, otherwise keep previous index
            }
            fetchBidders(auctionLots[(prevIndex + 1) % auctionLots.length].id)
            return (prevIndex + 1) % auctionLots.length; // Loop through the array
        });
    };


    const handleSelectLot = () => {
        setSelect(true)
        const lisitng: any = document.getElementById('listing');
        if (lisitng) {
            lisitng.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    const handleEndStream = () => {
        deleteRoom(socket, auctionLots[currentIndex].roomId);
        navigate('/live')
    }

    const fakeBidders = [
        { name: "Hassaan Asim", amount: 100 },
        { name: "Ali Raza", amount: 150 },
        { name: "Sara Khan", amount: 200 },
        { name: "Ahmed Bilal", amount: 250 },
        { name: "Zainab Fatima", amount: 300 },
        { name: "Usman Tariq", amount: 350 },
        { name: "Ayesha Noor", amount: 400 },
        { name: "Farhan Malik", amount: 450 },
        { name: "Hira Shah", amount: 500 },
        { name: "Daniyal Ali", amount: 550 },
        { name: "Laiba Ahmed", amount: 600 },
        { name: "Rehan Qureshi", amount: 650 },
        { name: "Iqra Javed", amount: 700 },
        { name: "Saad Mehmood", amount: 750 },
        { name: "Mariam Zafar", amount: 800 },
        { name: "Fahad Hussain", amount: 850 },
    ];


    return (
        <Box p={2}>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, pb: 2 }}>
                <IconButton onClick={() => {
                    leaveRoom(socket, auctionLots[currentIndex].roomId)
                    navigate('/live')
                }}>
                    <KeyboardReturnRoundedIcon />
                </IconButton>
                <Typography className={classes.title}>
                    Live Streaming Auction
                </Typography>
            </Box>

            {!isFetchingData ?
                <Box>
                    <Box className={classes.container}>
                        <Box flex={1} className={classes.mediaSection} >
                            <AuctionCard
                                width={"100%"}
                                headerType={"live"}
                                cardData={auctionLots[currentIndex]}
                                handleEdit={handleEdit}
                                handleNextLot={handleNextLot}
                                handleSelectLot={handleSelectLot}
                                auctionLots={auctionLots}
                                handleEndStream={handleEndStream}
                                liveBidders={liveBidders}
                                bidders={bidders}
                            />
                        </Box>
                        <Box className={classes.rightSection} style={{ maxHeight: mainCardHeight ? `${mainCardHeight}px` : "auto" }}>
                            <Typography variant="h6" className={classes.liveBiddersHeader}>Live Bidders</Typography>
                            <List className={classes.liveBiddersList} >
                                {bidders.length ? bidders.map((bidder: any, index: number) => (
                                    <ListItem key={index} className={classes.liveBidderItem}>
                                        <Avatar />
                                        <Box className={classes.bidderBox}>
                                            <Typography className={classes.bidderName}>{bidder.name}</Typography>
                                            <Typography className={classes.bidderMessage}>{bidder.amount}</Typography>
                                        </Box>
                                    </ListItem>
                                ))
                                    :
                                    liveBidders.length ? liveBidders.map((bidder: any, index: number) => (
                                        <ListItem key={index} className={classes.liveBidderItem}>
                                            <Avatar />
                                            <Box className={classes.bidderBox}>
                                                <Typography className={classes.bidderName}>{bidder.sender}</Typography>
                                                <Typography className={classes.bidderMessage}>{bidder.amount}</Typography>
                                            </Box>
                                        </ListItem>
                                    ))
                                        :
                                        <Box
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                            height="50vh"
                                            textAlign="center"
                                        >
                                            <Box>
                                                <Box px={7} py={3}>
                                                    <img
                                                        src={`${process.env.PUBLIC_URL}/assets/pngs/norecord.png`}
                                                        alt="No Record"
                                                        style={{ width: '100%', height: '100%' }}
                                                    />
                                                </Box>
                                                <Typography fontSize={15} color="textSecondary">
                                                    No bidders found!
                                                </Typography>
                                            </Box>
                                        </Box>
                                }
                            </List>
                        </Box>
                    </Box>
                    {auctionLots.length > 0 && select &&
                        <Box id="listing" width={'80vw'} pt={3}>
                            <Box className={classes.titleWrapper}>
                                <Typography className={classes.title}>
                                    Auction Lots :
                                </Typography>
                                <Box className={classes.countBadge}>{auctionLots.length}</Box>
                            </Box>
                            <Container disableGutters maxWidth={false} sx={{ mt: 3 }}>
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
                                                isLiveLot={true}
                                                handleNextLot={handleNextLot}
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

        </Box >
    );
};

export default LiveStreamingDetailPage;
