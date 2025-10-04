import { useState, useEffect } from 'react';
import {
    Box,
    Fade,
    Container,
    Grid,
    CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AuctionCard from './auction-components/AuctionCard';
import CustomDialogue from '../custom-components/CustomDialogue';
import AuctionHeader from './auction-components/AuctionHeader';
import PaginationButton from './auction-components/PaginationButton';
import { deleteAuction, getAllLocations, getCitiesByState, getCurrentAuctions, getCurrentLocations, getPastAuctions, getPastLocations, getStatesByCountry } from '../Services/Methods';
import NoRecordFound from '../../utils/NoRecordFound';
import { ErrorMessage, SuccessMessage } from '../../utils/ToastMessages';

const Auction = ({ searchTerm }: any) => {
    const [fadeIn, setFadeIn] = useState(false); // Fade control state
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [deleteAuctionId, setDeleteAuctionId] = useState<string | null>(null);
    const [isFetchingData, setIsFetchingData] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isCurrentAuction, setIsCurrentAuction] = useState(true); // Toggle between Current and Past Auctions

    // Filter location states:
    const [selectedLocation, setSelectedLocation]: any = useState("");
    const [filteredData, setFilteredData]: any = useState([]);
    const [paginationedData, setPaginationedData]: any = useState([]);
    const [stateId, setStateId]: any = useState(0);
    const [cityId, setCityId]: any = useState(0);
    const [locations, setLocations]: any = useState([]);
    const [states, setStates]: any = useState([]);

    useEffect(() => {
        if (!isFetchingData) {
            setIsFetchingData(true)
            fetchAuctionData();
        }
    }, [isCurrentAuction])

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

    const fetchAuctionData = async () => {
        try {
            // Critical request:
            let response;
            if (isCurrentAuction) {
                response = await getCurrentAuctions()
            } else {
                response = await getPastAuctions();
            }

            if (response.data && response.data.length > 0) {
                const updatedData = response.data.map((item: any) => ({
                    id: item.Id,
                    name: item.Name,
                    image: item.Image,
                    isFeatured: item.IsFeatured,
                    isPast: item.IsPast,
                    cityId: item.CityId,
                    stateId: item.StateId,
                    address: item.Address,
                    details: {
                        address: item.Address,
                        location: `${item.City}, ${item.Country}`,
                        dateRange: `${item.StartDate} to ${item.EndDate}`,
                        lotsAvailable: item.TotalLots // Replace with actual data if available
                    }
                }));
                setFilteredData(updatedData);
                setPaginationedData(updatedData);
            } else {
                setFilteredData([]);
                setPaginationedData([])
            }

            const locationResponse = await getStatesByCountry(1);
            if (locationResponse.data && locationResponse.data.length > 0) {
                const updatedLocation = locationResponse.data;
                setLocations(updatedLocation);
                setStates(updatedLocation);
            } else {
                setLocations([]);
            }


        } catch (error) {
        } finally {
            setIsFetchingData(false)
        }
    };

    const handleDelete = async (id: string) => {
        try {
            // Call the delete API
            const response: any = await deleteAuction(id);
            if (response.status === 200) {
                SuccessMessage('Auction deleted successfully!')
                // Update state with filtered data if API call is successful
                const updatedData = filteredData.filter((auction: any) => auction.id !== id);
                setFilteredData(updatedData);
            } else {
                ErrorMessage('Error deleting auction!')
            }
        } catch (error) {
            ErrorMessage('Error deleting auction!')
        } finally {
            handleCloseModal();
        }
    };

    // Open confirmation modal
    const handleDeleteAuction = (id: string) => {
        setDeleteAuctionId(id);
        setConfirmDelete(true);
    };

    // Close modal
    const handleCloseModal = () => {
        if (!isDeleting) {
            setIsDeleting(false)
            setConfirmDelete(false);
            setDeleteAuctionId(null);
        }
    };

    // Confirm deletion
    const handleConfirmDelete = () => {
        if (deleteAuctionId && !isDeleting) {
            setIsDeleting(true)
            handleDelete(deleteAuctionId); // Call the delete handler
        }
    };

    const navigate = useNavigate()

    // Handle Edit
    const handleEdit = (id: string) => {
        navigate(`edit?aucId=${id}`); // Navigate to the edit route with auction ID
    };

    // Filtered Data based on `type` and `location`
    useEffect(() => {

        setFadeIn(false); // Trigger fade-out
        setTimeout(() => {
            setFadeIn(true); // Trigger fade-in after filtering
        }, 300);
    }, [paginationedData]);


    return (
        <Box sx={{ padding: 2 }}>
            <AuctionHeader
                headerType={"auction"}
                isCurrent={isCurrentAuction}
                onToggle={() => {
                    if (!isFetchingData) {
                        setIsCurrentAuction((prev) => !prev)
                    }
                }}
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
                    <Fade in={fadeIn} timeout={300}>
                        <Container disableGutters maxWidth={false} sx={{ mt: 3 }}>
                            <Grid container spacing={3}>
                                {paginationedData
                                    .filter((auction: any) => {
                                        if (!searchTerm) return true; // Show all if no search term
                                        const lowerCaseTerm = searchTerm.toLowerCase();
                                        return (
                                            auction.id.toString().includes(searchTerm) || // Match ID
                                            auction.name.toLowerCase().includes(lowerCaseTerm) || // Match Name
                                            auction.details.location.toLowerCase().includes(lowerCaseTerm) // Match Location
                                        );
                                    })
                                    .map((auction: any) => (
                                        <Grid item xs={12} sm={6} md={4} xl={3} key={auction.id}>
                                            <AuctionCard
                                                headerType={"auction"}
                                                cardData={auction}
                                                handleEdit={handleEdit}
                                                handleDelete={() => handleDeleteAuction(auction.id)}
                                                handleMoveModal={() => { }}
                                            />
                                        </Grid>
                                    ))}
                            </Grid>
                        </Container>
                    </Fade>
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
                title={"Confirm Deletion"}
                message={"Are you sure you want to delete this auction? This action cannot be undone."}
                type={"delete"}
                openDialogue={confirmDelete}
                handleCloseModal={handleCloseModal}
                handleConfirmModal={handleConfirmDelete}
                isDeleting={isDeleting}
            />

        </Box >
    );
};

export default Auction;
