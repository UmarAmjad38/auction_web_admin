import { Card, CardMedia, Typography, Button, Tooltip, Box, FormControlLabel, Switch } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuctionCardStyles } from './AuctionStyles';
import LotDetails from './card-details-components/LotDetails';
import AuctionDetails from './card-details-components/AuctionDetails';
import LiveStreamingDetails from './card-details-components/LiveStreamingDetails';
import { getQueryParam } from '../../../helper/GetQueryParam';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import MoveLotModal from '../detail-pages/detail-pages-components/MoveLotModal';
import { setFeaturedAuctions, setFeaturedLots } from '../../Services/Methods';
import { ErrorMessage, SuccessMessage } from '../../../utils/ToastMessages';
import YouTube from 'react-youtube';
import VideoStreaming from '../detail-pages/VideoStreaming';


const AuctionCard = ({
    headerType,
    cardData,
    handleEdit,
    handleDelete,
    handleMoveModal,
    handleNextLot,
    handleSelectLot,
    auctionLots,
    isLiveLot,
    handleEndStream,
    liveBidders,
    bidders
}: any) => {
    const classes = useAuctionCardStyles();
    const navigate = useNavigate();
    const location = useLocation();

    const [moveLotId, setMoveLotId] = useState(0)

    const [moveModalOpen, setMoveModalOpen] = useState(false)
    const [isFeatured, setIsFeatured] = useState(cardData?.isFeatured);
    const [isFeaturedAuction, setIsFeaturedAuction] = useState(cardData?.isFeatured)

    // const isFeatured = cardData.isFeatured;

    // const [moveDialogue, setMoveDialogue] = useState(false)

    const dispatch = useDispatch();

    const handleCardMediaClick = () => {
        if (isLiveLot) {
            return handleNextLot(cardData.id);
        }
        if (headerType === "live") {
            if (cardData.details.lotsAvailable === 0) {
                return ErrorMessage("No available lots!");
            }
            return navigate(`/live-streaming/details?aucId=${cardData.id}`);
        }

        if (headerType === "lots") {
            if (location.pathname === "/inventory") {
                if (cardData.isLive) {
                    return navigate(`/live-streaming/details?aucId=${cardData.auctionId}&lotId=${cardData.id}`);
                } else {
                    return navigate(`/inventory/lots/details?lotId=${cardData.id}`);
                }
            }
            return navigate(`/auction/lots/details?lotId=${cardData.id}`);
        }

        navigate(`/auction/details?aucId=${cardData.id}`);
    };


    const handleJoin = (id: number) => {
        navigate(`/live-streaming/details?aucId=${id}`);
    }


    const isLiveDetail = headerType === "live" && getQueryParam('aucId');

    const handleViewCatalog = (id: number) => {
        if (headerType === 'live') {
            navigate(`/live/lots?aucId=${id}`)
        } else {
            navigate(`/auction/lots?aucId=${id}`)
        }
    }

    const handleMoveLot = (id: number) => {
        setMoveLotId(id)
        setMoveModalOpen(true);
    }

    const handleFeaturedLot = async (id: any) => {
        try {
            const response = await setFeaturedLots(id);
            if (response) {
                response.data === "Selected Lot Featured..." ?
                    SuccessMessage('Lot featured successfully!') :
                    SuccessMessage('Lot unfeatured successfully!')
                setIsFeatured(!isFeatured)
            }
        }
        catch {
            ErrorMessage('Only 3 lots can be fetured. Please unfeature a lot first!')
        }

    }

    const handleFeaturedAuction = async (id: any) => {
        try {
            const response = await setFeaturedAuctions(id);
            if (response) {
                response.data === "Selected Auction Featured..." ?
                    SuccessMessage('Auction featured successfully!') :
                    SuccessMessage('Auction unfeatured successfully!')
                setIsFeaturedAuction(!isFeaturedAuction)
            }
        }
        catch {
            ErrorMessage('Only 3 auctions can be fetured. Please unfeature an auction first!')
        }

    }

    const opts = {
        height: '350',
        width: '100%',
        playerVars: { autoplay: 1 },
    };

    return (
        <Card className={headerType === "live" ? classes.liveCard : classes.card} elevation={2} id="main-card">
            {/* Auction Image */}
            <Box sx={{
                position: 'relative', // Ensure the button is positioned relative to the Box
            }}>
                {!isLiveDetail ?
                    <CardMedia
                        onClick={handleCardMediaClick}
                        component="img"
                        height={"200"}
                        image={cardData?.image}
                        alt={headerType === "live" ? "Live Streaming Image" : headerType === "Auction" ? "Auction" : "Lot" + " Image"}
                        className={classes.media}
                    />
                    : cardData?.isYoutube ? <YouTube videoId={cardData?.youtubeId} opts={opts} className={classes.liveMedia} />
                        : <VideoStreaming lotId={cardData?.id}
                            onNoCall={
                                <CardMedia
                                    component="img"
                                    height={"200"}
                                    image={cardData?.image}
                                    alt={"Live Streaming Image"}
                                    className={classes.media}
                                />
                            }
                        />
                }
                {
                    isLiveDetail ?
                        <Box>
                            <Button
                                variant="contained"
                                size="small"
                                className={classes.button1}
                            >
                                Live Stream
                            </Button>
                            <Button
                                variant="contained"
                                size="small"
                                className={classes.button2}
                                onClick={() => handleEndStream()}
                            >
                                End Stream
                            </Button>
                            <Box sx={{ position: "absolute", gap: 2, top: 10, right: 10, display: "flex", alignItems: "center" }}>
                                <Button
                                    variant="contained"
                                    size="small"
                                    className={classes.button3}
                                >
                                    {bidders.length > 0 ? bidders[bidders.length - 1].name
                                        : liveBidders.length > 0
                                            ? liveBidders.reduce((prev: any, current: any) => (prev.amount > current.amount ? prev : current)).sender
                                            : 'No Heighest Bidder'}
                                </Button>
                                <Button
                                    variant="contained"
                                    size="small"
                                    className={classes.button3}
                                >
                                    Highest Bid : ${bidders.length > 0 ? bidders[bidders.length - 1].amount
                                        : liveBidders.length > 0
                                            ? liveBidders.reduce((prev: any, current: any) => (prev.amount > current.amount ? prev : current)).amount
                                            : '0'}
                                </Button>
                            </Box>
                        </Box>
                        : <>
                            {((headerType === "lots" && cardData.isPast && !cardData.sold && cardData.isMoved) || (headerType === "inventory" && cardData.isPast && !cardData.sold && cardData.isMoved)) &&
                                <Button
                                    variant="contained"
                                    size="small"
                                    sx={{ position: 'absolute', top: 10, left: 10, backgroundColor: '#ff9800', color: 'white' }}
                                >
                                    Move
                                </Button>
                            }
                            { (headerType === "live") ||
                              ( (headerType === "lots" || headerType === "inventory") &&
                                cardData.isPast &&
                                !( !cardData.sold && cardData.isMoved ) ) &&

                            <Button
                                variant="contained"
                                size="small"
                                className={headerType === "live" ? classes.unSoldButtonLive : `${classes.soldButton} ${!cardData.sold ? classes.unSoldButton : ''}`}
                                sx={
                                    headerType !== "live" ?
                                    ( ((headerType === "lots" && cardData.isPast && !cardData.sold && cardData.isMoved) || (headerType === "inventory" && cardData.isPast && !cardData.sold && cardData.isMoved)) ?
                                        { position: 'absolute', top: 50, left: 10 } :
                                        { position: 'absolute', top: 10, left: 10 }
                                    ) : {}
                                }
                            >
                                {headerType === "live" && cardData?.isLive ? "Live Streaming Auction" : cardData.sold ? "Sold" : "Unsold"}
                            </Button>
                            }
                        </>
                }

            </Box>
            <Box className={classes.contentWrapper}>
                {/* Auction Details */}
                <Box className={classes.content}>
                    {/* Title */}
                    <Tooltip title={cardData?.name}>
                        {isLiveDetail ?
                            <Typography className={classes.title} gutterBottom>
                                {cardData?.name?.length > 100 ? `${cardData?.name.substring(0, 33)}...` : cardData?.name}
                            </Typography>
                            :
                            <Typography className={classes.title} gutterBottom>
                                {cardData?.name.length > 43 ? `${cardData.name.substring(0, 33)}...` : cardData.name}
                            </Typography>
                        }
                    </Tooltip>

                    {/* View Catalog Button */}
                    {isLiveDetail ?
                        <Button
                            onClick={() => handleNextLot()}
                            variant={"outlined"}
                            size="small"
                            className={classes.nextButton}
                            disabled={auctionLots.length > 1 ? false : true}
                        >
                            Show Next Lot
                        </Button>
                        :
                        headerType === "auction" || headerType === "live" ?
                            <Button onClick={() => handleViewCatalog(cardData.id)} variant={"contained"} size="small" className={classes.catalogButton}>
                                View Catalog
                            </Button>
                            :
                            <Box>
                                <Typography className={classes.smallTitle} gutterBottom>
                                    Highest Bid
                                </Typography>
                                <Button variant="contained" size="small" className={classes.catalogButton}
                                    sx={{
                                        pointerEvents: 'none', // Prevent interaction while keeping styles
                                        opacity: 1, // Maintain original appearance
                                    }}
                                >
                                    $&nbsp;{cardData.highestBid}
                                </Button>
                            </Box>
                    }
                </Box>
                {isLiveDetail &&
                    <Typography className={classes.description} gutterBottom>
                        {cardData?.description?.length > 300 ? `${cardData?.description.substring(0, 33)}...` : cardData?.description}
                    </Typography>
                }


                {/* Location, Date, and Lots */}
                {isLiveDetail ?
                    <LiveStreamingDetails streamData={cardData?.details} />
                    : headerType === "auction" || headerType === "live" ?
                        <AuctionDetails auctionDetails={cardData.details} />
                        : <LotDetails lotData={cardData} />
                }

                {/* Action Buttons */}
                <Box className={classes.actionButtons}>
                    {!isLiveDetail &&
                        <React.Fragment>
                            <Button className={classes.actionButton} variant="contained" size="small" color="primary"
                                onClick={() => headerType === "lots"
                                    ? handleEdit(cardData.id, cardData.auctionId)
                                    : handleEdit(cardData.id)}
                            >
                                Edit
                            </Button>
                            <Button className={classes.actionButton} variant="contained" size="small" color="error" onClick={() => handleDelete(cardData.id)}>
                                Delete
                            </Button>
                        </React.Fragment>
                    }
                    {isLiveDetail ?
                        <Button className={classes.selectButton}
                            variant="contained"
                            size="small"
                            color="primary"
                            disabled={auctionLots.length === 0}
                            onClick={handleSelectLot}
                        >
                            Select Next Lot
                        </Button>
                        : headerType === "live" ?
                            <Button className={classes.joinButton} variant="outlined" size="small" color="primary" onClick={() => handleJoin(cardData.id)}>
                                Join
                            </Button>
                            : ((headerType === "lots" && cardData.isPast && !cardData.sold && !cardData.isMoved) || (headerType === "inventory" && cardData.isPast && !cardData.sold && !cardData.isMoved)) ?
                                <Button className={classes.joinButton} variant="outlined" size="small" color="primary" onClick={() => handleMoveLot(cardData.id)}>
                                    Move
                                </Button>
                                    : headerType === "lots" && !cardData.isPast ?
                                        <Tooltip title={isFeatured ? "Click to unfeature" : "Click to feature"}>
                                            <FormControlLabel
                                                control={
                                                    <Switch checked={isFeatured}
                                                        onChange={() => handleFeaturedLot(cardData.id)}
                                                    />
                                                }
                                                label={isFeatured ? "Featured" : "Unfeatured"}
                                            />
                                        </Tooltip>
                                    : headerType === "auction" && !cardData?.isPast ?
                                        <Tooltip title={isFeaturedAuction ? "Click to unfeature" : "Click to feature"}>
                                            <FormControlLabel
                                                control={
                                                    <Switch checked={isFeaturedAuction}
                                                        onChange={() => handleFeaturedAuction(cardData.id)}
                                                    />
                                                }
                                                label={isFeaturedAuction ? "Featured" : "Unfeatured"}
                                            />
                                        </Tooltip>
                                        : null
                    }
                </Box>
            </Box>

            {/* Move Lot Confirmation on Move Button*/}
            {/* <CustomDialogue
                type={"create"}
                title={"Move Lot Confirmation!"}
                message={"Are you sure you want to move this lot from past auction to current auction?"}
                openDialogue={moveDialogue}
                handleCloseModal={() => setMoveDialogue(false)}
                handleConfirmModal={() => { setMoveDialogue(false); setMoveModalOpen(true) }}
            /> */}

            <MoveLotModal open={moveModalOpen} handleMoveModal={handleMoveModal} setMoveModalOpen={setMoveModalOpen} moveLotId={moveLotId} />

        </Card >
    );
};

export default AuctionCard;
