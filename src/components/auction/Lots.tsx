import { useState, useEffect } from 'react';
import {
    Box,
    Fade,
    Container,
    Grid,
    CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomDialogue from '../custom-components/CustomDialogue';
import AuctionHeader from './auction-components/AuctionHeader';
import AuctionCard from './auction-components/AuctionCard';
import PaginationButton from './auction-components/PaginationButton';
import { deleteLot, getAllLocations, getCitiesByState, getCurrentLocations, getFeaturedLots, getLotsByAuctionId, getPastLocations, getStatesByCountry } from '../Services/Methods';

import NoRecordFound from '../../utils/NoRecordFound';
import { getQueryParam } from '../../helper/GetQueryParam';
import { ErrorMessage, SuccessMessage } from '../../utils/ToastMessages';


const Lots = ({ searchTerm }: any) => {
    const [isCurrentLot, setIsCurrentLot] = useState(true);

    const [fadeIn, setFadeIn] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleteLotId, setDeleteLotId] = useState(0);
    const [isFetchingData, setIsFetchingData] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [featuredLots, setFeaturedLots] = useState([]);

    const [filteredData, setFilteredData]: any = useState([]);
    const [paginationedData, setPaginationedData]: any = useState([]);

    // filter by location states:
    const [selectedLocation, setSelectedLocation]: any = useState("");
    const [locations, setLocations]: any = useState([]);
    const [states, setStates]: any = useState([]);
    const [stateId, setStateId]: any = useState(0);
    const [cityId, setCityId]: any = useState(0);

    // const selectedAuction = useSelector((state: RootState) => state.auction.selectedAuction);
    useEffect(() => {
        // setPaginationedData(filteredData.filter((item: any) => item.stateId === stateId))
        if (stateId !== 0 && cityId === 0 && selectedLocation === "") {
            fetchCitiesByState();
        } else if (stateId !== 0 && cityId !== 0 && selectedLocation === "") {
            fetchAddresses();
        } else if (selectedLocation !== "") {
            setPaginationedData(filteredData.filter((item: any) => item.cityId === cityId && item.stateId === stateId && item.address === selectedLocation))
        } else {
            setPaginationedData(filteredData);
            setLocations(states);
        }
    }, [selectedLocation, cityId, stateId])

    const fetchCitiesByState = async () => {
        try {
            const response = await getCitiesByState(stateId);
            const cities = response.data;
            if (cities.length > 0) {
                const updatedCities = cities;
                setLocations(updatedCities);
            } else {
                setLocations([])
            }
        } catch (error) {
        } finally {
        }
    };

    const fetchAddresses = async () => {
        try {
            const locationResponse = await getAllLocations();
            const addresses = locationResponse.data;
            if (addresses.length > 0) {
                const updatedAddresses = addresses.sort((a: any, b: any) => a.localeCompare(b)); // alphabetically ordered
                setLocations(updatedAddresses);
            } else {
                setLocations([])
            }
        } catch (error) {
        } finally {
        }
    };

    useEffect(() => {
        if (!isFetchingData) {
            setIsFetchingData(true)
            fetchLotsData();
        }
    }, [isCurrentLot])

    useEffect(() => {
        const fetchFeaturedLots = async () => {
            try {
                const response = await getFeaturedLots();
                if (response.data > 0) {
                    setFeaturedLots(response.data)
                }
            } catch (error) {
                setFeaturedLots([])
            }
        };
        fetchFeaturedLots()
    }, [])

    const fetchLotsData = async () => {
        try {
            const selectedAuction = getQueryParam('aucId');
            const response = await getLotsByAuctionId(selectedAuction);

            if (response.data && response.data.length > 0) {
                const updatedData = response.data.map((item: any) => ({
                    id: item.Id,
                    auctionId: item.AuctionId,
                    lotNumber: item.LotNo,
                    name: item.ShortDescription,
                    description: item.LongDescription,
                    isFeatured: item.IsFeatured,
                    countDown: "N/A",
                    location: "N/A",
                    image: item.Image,
                    type: "current",
                    highestBid: item.BidStartAmount,
                    sold: item.IsSold,
                    isPast: item.IsPast,
                    cityId: item.CityId,
                    stateId: item.StateId,
                    address: item.Address,
                    isYoutube: item.IsYoutube || false,
                    youtubeId: item.YoutubeId || "LxDJlhj6Yk0",
                    details: {
                        description: item.LongDescription,
                        endDate: item.EndDate,
                        endTime: item.EndTime,
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

                // Filter data based on isCurrentLot condition
                const filteredData = updatedData.filter((lot: any) => {
                    if (isCurrentLot) {
                        return !lot.isPast; // Keep only current lots
                    } else {
                        return lot.isPast; // Keep only past lots
                    }
                });

                setFilteredData(filteredData);
                setPaginationedData(filteredData);
            } else {
                setFilteredData([]);
                setPaginationedData([]);
            }

            const locationResponse = await getStatesByCountry(1);
            if (locationResponse.data && locationResponse.data.length > 0) {
                const updatedLocation = locationResponse.data;
                setLocations(updatedLocation);
                setStates(updatedLocation);
            } else {
                setLocations([]);
            }

            setIsFetchingData(false);
        } catch (error) {
            setIsFetchingData(false);
        }
    };


    // Filtered Data based on `type` and `location`
    useEffect(() => {
        setFadeIn(false);
        setTimeout(() => {
            setFadeIn(true);
        }, 200);
    }, [isCurrentLot, selectedLocation, paginationedData]);

    // Open confirmation modal
    const handleDeleteLot = (id: number) => {
        setDeleteLotId(id);
        setConfirmDelete(true);
    };

    // Close modal
    const handleCloseModal = () => {
        if (!isDeleting) {
            setIsDeleting(false)
            setConfirmDelete(false);
            setDeleteLotId(0);
        }
    };

    // Confirm deletion
    const handleConfirmDelete = () => {
        if (!isDeleting) {
            setIsDeleting(true)
            handleDelete(deleteLotId); // Call the delete handler
        }
    };


    const navigate = useNavigate();

    // Handle Edit
    const handleEdit = (lotId: number, aucId: any) => {
        navigate(`/auction/lots/edit?lotId=${lotId}&aucId=${aucId}`);
    };

    const handleDelete = async (id: number) => {
        try {
            // Call the delete API
            const response: any = await deleteLot(id);
            if (response.status === 200) {
                SuccessMessage('Lot deleted successfully!')
                // Update state with filtered data if API call is successful
                const updatedData = filteredData.filter((lot: any) => lot.id !== id); // Remove lot by ID
                setFilteredData(updatedData); // Update state with filtered data
            } else {
                ErrorMessage('Error deleting lot!')
            }
        } catch (error) {
        } finally {
            handleCloseModal();
        }
    };

    const handleMoveModal = (movedLotId: number) => {
        if (movedLotId > 0) {
            const afterMovedData = paginationedData.filter((item: any) => item.id !== movedLotId)
            setFilteredData(afterMovedData);
        }
    }

    const handleToggle = () => {
        if (!isFetchingData) {
            setIsCurrentLot(!isCurrentLot);
        }
    }

    return (
        <Box sx={{ padding: 2 }}>
            <AuctionHeader
                headerType={"lots"}
                isCurrent={isCurrentLot}
                onToggle={handleToggle}
                selectedLocation={selectedLocation}
                setSelectedLocation={setSelectedLocation}
                cityId={cityId}
                stateId={stateId}
                setCityId={setCityId}
                setStateId={setStateId}
                locations={locations}
            />
            <Box sx={{ minHeight: "500px" }}>
                {!isFetchingData && paginationedData?.length ?
                    <Box>
                        <Fade in={fadeIn} timeout={200}>
                            <Container disableGutters maxWidth={false} sx={{ mt: 3 }}>
                                <Grid container spacing={3}>
                                    {paginationedData && paginationedData
                                        .filter((auction: any) => {
                                            if (!searchTerm) return true; // Show all if no search term
                                            const lowerCaseTerm = searchTerm.toLowerCase();
                                            return (
                                                auction.id.toString().includes(searchTerm) || // Match ID
                                                auction.name.toLowerCase().includes(lowerCaseTerm) || // Match Name
                                                auction.details.location.toLowerCase().includes(lowerCaseTerm) // Match Location
                                            );
                                        }).sort((a: any, b: any) => {
                                            return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
                                        }).map((lot: any) => (
                                            <Grid item xs={12} sm={6} md={4} xl={3} key={lot.id}>
                                                <AuctionCard
                                                    headerType={"lots"}
                                                    cardData={lot}
                                                    handleEdit={handleEdit}
                                                    handleDelete={() => handleDeleteLot(lot.id)}
                                                    handleMoveModal={handleMoveModal}
                                                />
                                            </Grid>
                                        ))}
                                </Grid>
                            </Container>
                        </Fade>
                    </Box>
                    : isFetchingData ?
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
                        :
                        <NoRecordFound />
                }

            </Box>
            <PaginationButton filteredData={filteredData} setPaginationedData={setPaginationedData} />

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
        </Box>
    );
};

export default Lots;
