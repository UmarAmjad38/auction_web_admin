import React, { useState } from 'react';
import { Box, Button, Typography, ToggleButton, ToggleButtonGroup, Menu, MenuItem, IconButton } from '@mui/material';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import useAuctionHeaderStyles from './AuctionHeaderStyles';
import { useLocation, useNavigate } from 'react-router-dom';
import { getQueryParam } from '../../../helper/GetQueryParam';
import KeyboardReturnRoundedIcon from '@mui/icons-material/KeyboardReturnRounded';
import CustomTextField from '../../custom-components/CustomTextField';
import CloseIcon from '@mui/icons-material/Close';


const AuctionHeader = ({
    headerType = 'auction', // Default to 'auction'
    isCurrent,
    onToggle,
    selectedLocation,
    setSelectedLocation,
    filterLots,
    cityId,
    stateId,
    setCityId,
    setStateId,
    locations,
}: any) => {
    const classes = useAuctionHeaderStyles();
    const navigate = useNavigate();
    const locationURL = useLocation()

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    const handleFilterChange = (locationId: string) => {
        if (!stateId) {
            setStateId(locationId);
        } else if (!cityId) {
            setCityId(locationId);
        } else {
            setSelectedLocation((prev: any) => (prev === locationId ? null : locationId));
            handleMenuClose();
        }
    };

    const handleAddClick = () => {
        if (headerType === "auction") {
            navigate('/auction/create')
        } else if (headerType === "live") {
            localStorage.setItem('isLive', 'true');
            navigate('/auction/create')
        } else {
            const selectedAuction = getQueryParam('aucId');
            navigate(`/auction/lots/create?aucId=${selectedAuction}`)
        }
    }


    const handleBackNavigation = () => {
        headerType === "inventory" ? navigate('/inventory')
            : locationURL.pathname === "/live/lots" ? navigate('/live')
                : navigate('/auction')
    }

    return (
        <Box className={classes.root}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {(locationURL.pathname === '/auction/lots' || locationURL.pathname === '/live/lots') &&
                    <IconButton onClick={() => handleBackNavigation()}>
                        <KeyboardReturnRoundedIcon />
                    </IconButton>
                }
                <Typography className={classes.title}>
                    {headerType === 'live' ? "Live Streaming Auctions"
                        : headerType === 'inventory' ? "Inventory"
                            : isCurrent
                                ? `Current ${headerType === 'lots' ? 'Lots' : 'Auctions'}`
                                : `Past ${headerType === 'lots' ? 'Lots' : 'Auctions'}`}
                </Typography>
            </Box>
            <Box className={classes.buttonContainer}>

                {isCurrent && headerType !== "inventory" && (
                    <Button variant={headerType === "live" ? "contained" : "outlined"}
                        className={headerType === "live" ? classes.addAuctionButtonLive : classes.addAuctionButton} onClick={handleAddClick}
                    >
                        Add {headerType === 'lots' ? 'Lot' : 'Auction'}
                    </Button>
                )}

                {headerType !== "live" &&
                    <React.Fragment>
                        {headerType !== "inventory" ?
                            <Box className={classes.toggleContainer}>
                                <ToggleButtonGroup
                                    value={isCurrent ? 'current' : 'past'}
                                    exclusive
                                    onChange={onToggle}
                                    sx={{ maxHeight: '30px' }}
                                >
                                    <ToggleButton
                                        value="current"
                                        className={`${classes.toggleButton} ${isCurrent ? 'current' : 'past'}`}
                                    >
                                        Current {headerType === 'lots' ? 'Lots' : 'Auctions'}
                                    </ToggleButton>
                                    <ToggleButton
                                        value="past"
                                        className={`${classes.toggleButton} ${!isCurrent ? 'current' : 'past'}`}
                                    >
                                        Past {headerType === 'lots' ? 'Lots' : 'Auctions'}
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Box>
                            :
                            <Box flex={1}>
                                <CustomTextField
                                    select
                                    className={classes.filterDropDown}
                                    fullWidth
                                    value={filterLots}
                                    onChange={onToggle}
                                    sx={{
                                        '& .MuiSelect-icon': {
                                            color: '#A0AEC0', // Set the color of the arrow icon
                                        },
                                    }}
                                >
                                    <MenuItem value="all">All Lots</MenuItem>
                                    <MenuItem value="current">Current Lots</MenuItem>
                                    <MenuItem value="past">Past Lots</MenuItem>
                                </CustomTextField>
                            </Box>
                        }

                        <Button
                            variant="contained"
                            className={classes.filterButton}
                            onClick={handleMenuOpen}
                            startIcon={<FilterAltIcon />}
                            disabled={!locations.length ? true : false}
                        >
                            Filter
                        </Button>
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                            {locations.map((location: any) => (
                                <MenuItem
                                    key={location.Id ? location.id : location}
                                    onClick={() => handleFilterChange(location.Id ? location.Id : location)}
                                    className={`${classes.menuItem} ${selectedLocation === location ? 'selected' : ''}`}
                                >
                                    {location.Name ? location.Name : location}
                                </MenuItem>
                            ))}
                        </Menu>
                        {(selectedLocation !== "" || stateId > 0 || cityId > 0) ? (
                            <IconButton onClick={() => { setStateId(0); setCityId(0); setSelectedLocation(""); }}>
                                <CloseIcon style={{ color: 'red' }} />
                            </IconButton>)
                            : null
                        }
                    </React.Fragment>
                }
            </Box>
        </Box>
    );
};

export default AuctionHeader;
