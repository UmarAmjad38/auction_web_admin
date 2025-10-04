import { useEffect, useRef, useState } from 'react';
import theme from '../../../../theme';
import { getCurrentAuctions, moveLotToAuction } from '../../../Services/Methods';
import { ErrorMessage, SuccessMessage } from '../../../../utils/ToastMessages';
import CustomTextField from '../../../custom-components/CustomTextField';
import { getQueryParam } from '../../../../helper/GetQueryParam';
import useWinnerModalStyle from './WinnerModalStyles';

import { Dialog, DialogContent, IconButton, Typography, Box, Button, Divider, CircularProgress } from '@mui/material';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { Search as SearchIcon } from '@mui/icons-material';



const MoveLotModal = ({ open, handleMoveModal, setMoveModalOpen, moveLotId }: any) => {
    const classes = useWinnerModalStyle();

    const [searchTerm, setSearchTerm] = useState('');
    const [searchedValue, setSearchedValue] = useState('');

    const [searchById, setSearchById] = useState('');
    const [searchByName, setSearchByName] = useState('');
    const [selectedAuction, setSelectedAuction] = useState(0);
    const [auctionList, setAuctionList]: any = useState([]);

    const [isFetching, setIsFetching] = useState(false);
    const [isMoving, setIsMoving] = useState(false);
    const searchRef = useRef<HTMLInputElement>(null);


    useEffect(() => {
        const fetchAuctionData = async () => {
            setIsFetching(true)
            try {
                const response = await getCurrentAuctions();

                if (response.data && response.data.length > 0) {
                    const updateAuctions = response.data.map((item: any) => ({
                        id: item.Id,
                        name: item.Name,
                        type: item.Type,
                        image: item.Image
                    }));
                    setAuctionList(updateAuctions);
                } else {
                    setAuctionList([]);
                }

            } catch (error) {
            } finally {
                setIsFetching(false); // Set loading state to false when the call ends
            }
        };
        if (open && moveLotId)
            fetchAuctionData();
    }, [open]);

    const handleMoveLot = async (newAuctionId: any) => {
        if (!isMoving && newAuctionId > 0) {
            setIsMoving(true);
            let responsedId = 0;
            try {
                const response = await moveLotToAuction(moveLotId, newAuctionId)
                if (response) {
                    responsedId = response.data.Id;
                    SuccessMessage("Lot moved to auction successfuly!");
                }
            } catch (error) {
                ErrorMessage("Error moving lot to new auction!");
            } finally {
                setIsMoving(false);
                handleMoveModal(responsedId);
                setMoveModalOpen(false);
            }
        } else if (!newAuctionId) {
            ErrorMessage('Please choose an auction first.')
        }
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };


    const handleSearch = () => {
        const searchValue = searchRef.current?.value || '';
        setSearchTerm(searchValue);
    };

    return (
        <Dialog open={open} onClose={() => setMoveModalOpen(false)} fullWidth maxWidth="md" >
            <Box p={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: "5px" }}>
                    {/* Title */}
                    <Typography variant="h5" className={classes.title}>
                        Move Lot to Auction
                    </Typography>
                    <IconButton onClick={() => setMoveModalOpen(false)}>
                        <ClearRoundedIcon sx={{
                            color: 'black',
                            padding: "1px",
                            border: "1px solid #676767",
                            borderRadius: "50px"
                        }} />
                    </IconButton>
                </Box>
                <Divider sx={{ py: 1 }} />

                <DialogContent className={classes.modalContent}>

                    {/* Search Fields */}

                    <Box sx={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'start', padding: '16px'
                    }}>
                        <Box className={classes.centerSection}>
                            <Button
                                onClick={() => handleMoveLot(selectedAuction)}
                                variant="contained"
                                color="primary"
                                className={classes.filterButton}
                            >
                                {isMoving ? <CircularProgress size={25} sx={{ color: theme.palette.primary.main3 }} /> : 'Move Lot'}
                            </Button>
                            <CustomTextField
                                inputRef={searchRef} // Attach the ref here
                                value={searchedValue}
                                placeholder="Search by anything"
                                className={classes.searchField}
                                onChange={(e: any) => setSearchedValue(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSearch();
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <Button className={classes.searchButton}
                                            onClick={() => handleSearch()}
                                        >
                                            <SearchIcon sx={{ color: theme.palette.primary.main3 }} />
                                        </Button>
                                    ),
                                }}
                            />
                        </Box>
                    </Box>

                    {!isFetching && auctionList.length === 0 ?
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '50vh',
                            }}
                        >
                            <h2>No Auction Found!</h2>
                        </Box>
                        : !isFetching ?
                            <Box style={{ maxHeight: '300px', overflowY: 'auto', padding: '16px', marginTop: "20px" }}>
                                {auctionList
                                    .filter((auction: any) => {
                                        if (!searchTerm) return true; // Show all if no search term
                                        const lowerCaseTerm = searchTerm.toLowerCase();
                                        return (
                                            auction.id.toString().includes(searchTerm) || // Match ID
                                            auction.name.toLowerCase().includes(lowerCaseTerm));
                                    }).map((auction: any) => (
                                        <Box
                                            key={auction.id}
                                            onClick={() => setSelectedAuction(auction.id)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '16px',
                                                border: selectedAuction === auction.id ? '2px solid #1976d2' : '1px solid #ccc',
                                                borderRadius: '8px',
                                                padding: '12px',
                                                marginBottom: '12px',
                                                cursor: 'pointer',
                                                backgroundColor: selectedAuction === auction.id ? '#e3f2fd' : '#fff',
                                                transition: 'transform 0.2s, box-shadow 0.2s, background-color 0.3s', // Add transition for background color
                                                boxShadow: selectedAuction === auction.id ? '0px 4px 12px rgba(0, 0, 0, 0.2)' : '0px 2px 8px rgba(0, 0, 0, 0.1)',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = '#f1f1f1'; // Change background on hover
                                            }}
                                            onMouseLeave={(e) => {
                                                if (selectedAuction !== auction.id) {
                                                    e.currentTarget.style.backgroundColor = '#fff'; // Revert back when hover ends
                                                }
                                            }}
                                        >
                                            {/* Image Section */}
                                            <Box
                                                component="img"
                                                src={auction.image || `${process.env.PUBLIC_URL}/assets/pngs/default-auction.png`}
                                                alt={auction.name}
                                                style={{
                                                    width: '80px',
                                                    height: '80px',
                                                    objectFit: 'cover',
                                                    borderRadius: '8px',
                                                    border: '1px solid #ccc',
                                                }}
                                            />

                                            {/* Auction Details */}
                                            <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start' }}>
                                                <Typography variant="body1" style={{ fontWeight: 600, color: '#333' }}>
                                                    Auction ID: {auction.id}
                                                </Typography>
                                                <Typography variant="body1" style={{ fontSize: '16px', color: '#555' }}>
                                                    Auction Name: {auction.name}
                                                </Typography>
                                                <Typography variant="body2" style={{ color: '#777' }}>
                                                    Auction Type: {auction.type}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    ))}
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
                                <CircularProgress size={50} disableShrink />
                            </Box>
                    }

                </DialogContent >
            </Box >
        </Dialog >

    );
};

export default MoveLotModal;
