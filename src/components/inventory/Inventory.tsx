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
import { deleteLot, getAllLocations, getCitiesByState, getCurrentLocations, getInventoryLots, getPastLocations, getStatesByCountry } from '../Services/Methods';

import NoRecordFound from '../../utils/NoRecordFound';
import { ErrorMessage, SuccessMessage } from '../../utils/ToastMessages';
import AuctionCard from '../auction/auction-components/AuctionCard';
import AuctionHeader from '../auction/auction-components/AuctionHeader';
import PaginationButton from '../auction/auction-components/PaginationButton';


const Lots = ({ searchTerm }: any) => {
    const [filterLots, setFilterLots] = useState('all');
    const [fadeIn, setFadeIn] = useState(false); // Fade control state
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleteLotId, setDeleteLotId] = useState(0);
    const [isFetchingData, setIsFetchingData] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const [selectedLocation, setSelectedLocation]: any = useState(""); // Filter by location
    const [filteredData, setFilteredData]: any = useState([]); // Filtered data state
    const [stateId, setStateId]: any = useState(0); // Filtered data state
    const [cityId, setCityId]: any = useState(0); // Filtered data state
    const [locations, setLocations]: any = useState([]); // Filtered data state
    const [states, setStates]: any = useState([]); // Filtered data state    const [filteredData, setFilteredData]: any = useState([]); // Filtered data state
    const [paginationedData, setPaginationedData]: any = useState([]); // Filtered data state

    const parseDateTime = (lot: any) => {
        const [startDate, endDate] = lot.details.date.split(' to ');
        const [startTime, endTime] = lot.details.time.split(' to ');

        return {
            startDateTime: new Date(`${startDate} ${startTime}`),
            endDateTime: new Date(`${endDate} ${endTime}`),
        };
    };


    useEffect(() => {
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
            const locationResponse: any = filterLots === 'current' ? await getCurrentLocations()
                : filterLots === 'past' ? await getPastLocations()
                    : await getAllLocations();

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
    }, [filterLots])

    const fetchLotsData = async () => {
        try {
            const response = await getInventoryLots();

            if (response.data && response.data.length > 0) {
                // Log raw API data for first item to debug IsPast
                if (response.data.length > 0) {
                    console.log('Raw Inventory API data for first lot:', response.data[0]);
                }

                const updatedData = response.data.map((item: any) => ({
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
                    isPast: item.IsPast,
                    isMoved: item.IsMoved,
                    isFeatured: item.IsFeatured,
                    isLive: item.IsLive,
                    cityId: item.CityId,
                    stateId: item.StateId,
                    address: item.Address,
                    isYoutube: item.IsYoutube || false,
                    youtubeId: item.YoutubeId || "LxDJlhj6Yk0",
                    details: {
                        endDate: item.EndDate,
                        endTime: item.EndTime,
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

                let latestData = updatedData;

                let filteredLots = updatedData.filter((lot: any) => {
                    return !lot.isSold; // Keep only active lots
                });

                if (filterLots !== 'all') {
                    latestData = filteredLots.filter((lot: any) => {
                        if (filterLots === 'current') {
                            return !lot.isPast; // Keep only current lots
                        } else {
                            return lot.isPast; // Keep only past lots
                        }
                    });

                    setFilteredData(latestData);
                    setPaginationedData(latestData);
                } else {
                    setFilteredData(filteredLots);
                    setPaginationedData(filteredLots);
                }

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
        setFadeIn(false); // Trigger fade-out
        setTimeout(() => {
            setFadeIn(true); // Trigger fade-in after filtering
        }, 200);
    }, [filterLots, selectedLocation, paginationedData]);

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

    const handleToggle = (e: any) => {
        setFilterLots(e.target.value)
    }

    return (
        <Box sx={{ padding: 2 }}>
            <AuctionHeader
                headerType={"inventory"}
                isCurrent={filterLots === 'current'}
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
                                        }).map((lot: any) => (
                                        <Grid item xs={12} sm={6} md={4} xl={3} key={lot.id}>
                                            <AuctionCard
                                                headerType={"inventory"}
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
