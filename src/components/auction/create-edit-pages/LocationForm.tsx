import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Button,
    MenuItem,
    Radio,
    RadioGroup,
    FormControlLabel,
    CircularProgress,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomTextField from '../../custom-components/CustomTextField';
import { useCreateAuctionStyles } from './CreateAuctionStyles';
import { CustomMultiLineTextField } from '../../custom-components/CustomMultiLineTextField';
import theme from '../../../theme';
import CustomDialogue from '../../custom-components/CustomDialogue';
import { useLocation, useNavigate } from 'react-router-dom';
import { getQueryParam } from '../../../helper/GetQueryParam';
import { getCountries, getStatesByCountry, getCitiesByState, getAddressByCity, getAuctionDetailById } from '../../Services/Methods';
import { ErrorMessage } from '../../../utils/ToastMessages';

const LocationForm = ({ setLocationData, isSubmitted, setIsSubmitted, isUpdated, setIsUpdated, isSubmittedByLot, setIsSubmittedByLot, setNavigation }: any) => {
    const classes = useCreateAuctionStyles();

    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [isCancelOpen, setIsCancelOpen] = useState(false);
    const [openSaveModal, setOpenSaveModal] = useState(false);

    const [isFetchingData, setIsFetchingData] = useState(false);
    const [formData, setFormData]: any = useState({})
    const [submissionAttempt, setSubmissionAttempt]: any = useState({})

    // location states
    const [countries, setCountries]: any = useState([]);
    const [states, setStates]: any = useState([]);
    const [cities, setCities]: any = useState([]);

    const [countryId, setCountryId]: any = useState(0);
    const [stateId, setStateId]: any = useState(0);

    const [fetchingLocation, setIsFetchingLocation] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [cityOpen, setCityOpen] = useState(false);

    const navigate = useNavigate();
    const location = useLocation()

    const formik = useFormik({
        initialValues: {
            address: '',
            city: {
                id: 0,
                name: 'placeholder',
            },
            zipCode: '',
            state: 'placeholder',
            country: 'placeholder',
            buyerPremium: '',
            paymentTerms: '',
            shippingMethod: 'Shipping',
            termsAndConditions: '',
        },
        validationSchema: Yup.object({
            address: Yup.string().required('Address is required'),
            city: Yup.object().nullable().required('City is required'),
            zipCode: Yup.string().required('Zip Code is required'),
            state: Yup.string().required('State is required'),
            country: Yup.string().required('Country is required'),
            buyerPremium: Yup.string().required('Buyer Premium is required'),
            paymentTerms: Yup.string().max(500).required('Payment Terms are required'),
            termsAndConditions: Yup.string().max(500).required('Terms and Conditions are required'),
        }),
        onSubmit: (values) => {
            setFormData(values)
            if (getQueryParam('aucId')) {
                handleUpdateAuction(values)
            }
            else if (!isSubmitted && !isSubmittedByLot) {
                setOpenConfirmModal(true);
            }
        }
    });

    useEffect(() => {
        const auctionId = getQueryParam('aucId');
        if (auctionId) {
            setIsFetchingData(true);
            const fetchAuctionDetails = async () => {
                try {
                    const response = await getAuctionDetailById(auctionId);
                    const auction = response.data.Auction;
                    const lot = response.data.Lots.length && response.data.Lots[0];
                    if (auction) {
                        const formattedAuctionDetails = {
                            country: auction.Country || 'placeholder',
                            state: auction.State || 'placeholder',
                            city: { id: auction.CityID || 0, name: auction.City || 'placeholder' },
                            address: auction.Address || 'placeholder',
                            zipCode: auction.ZipCode || '',
                            buyerPremium: lot.BuyerPremium || '',
                            paymentTerms: auction.PaymentTerms || '',
                            shippingMethod: auction.ShippingMethod ? 'Shipping' : 'Pickup',
                            termsAndConditions: auction.TermsConditions || '',
                        };

                        setCountryId(1);
                        // Populate formik fields
                        formik.setValues(formattedAuctionDetails);

                    } else {
                        ErrorMessage('Auction data not found');
                    }
                } catch (error) {
                } finally {
                    setIsFetchingData(false);
                }
            };

            fetchAuctionDetails();
        }
    }, []);

    useEffect(() => {
        if (Object.keys(formik.errors).length > 0) {
            const firstErrorField = Object.keys(formik.errors)[0];
            const errorElement: any = document.querySelector(`[name="${firstErrorField}"]`);
            if (errorElement) {
                errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                errorElement.focus();
            }
        }
    }, [submissionAttempt]);

    // Handle country list
    useEffect(() => {
        setIsFetchingLocation(true);
        const fetchCountries = async () => {
            try {
                const response = await getCountries();
                const states = response.data;

                if (states.length > 0) {
                    const updatedStates = states.map((item: any) => ({
                        id: item.Id,
                        name: item.Name,
                    }));
                    setCountries(updatedStates)
                } else {
                    setCountries([])
                }
            } catch (error) {
            } finally {
                setIsFetchingLocation(false);
            }
        };

        fetchCountries();
    }, []);

    // Handle states list
    useEffect(() => {
        setIsFetchingLocation(true);
        const fetchStates = async () => {
            try {
                const response = await getStatesByCountry(countryId);
                const states = response.data;

                if (states.length > 0) {
                    const updatedStates = states.map((item: any) => ({
                        id: item.Id,
                        name: item.Name,
                        countryId: item.CountryID,
                        countries: item.Countries,
                    })).sort((a: any, b: any) => a.name.localeCompare(b.name)); // alphabetically ordered
                    setStates(updatedStates)

                    if (getQueryParam('aucId')) {
                        setStateId(updatedStates.find((state: any) => state.name === formik.values.state).id)
                    }
                } else {
                    setStates([])
                }
            } catch (error) {
            } finally {
                setIsFetchingLocation(false);
            }
        };

        if (formik.values.country !== "placeholder" && formik.values.country !== "" && countryId !== 0) {
            fetchStates();
        }
    }, [countryId]);

    // Handle cities list
    useEffect(() => {
        setIsFetchingLocation(true);
        const fetchCitiesByState = async () => {
            try {
                const response = await getCitiesByState(stateId);
                const cities = response.data;
                if (cities.length > 0) {
                    const updatedCities = cities.map((item: any) => ({
                        id: item.Id,
                        name: item.Name,
                        stateId: item.StateID,
                        states: item.States,
                    })).sort((a: any, b: any) => a.name.localeCompare(b.name)); // alphabetically ordered
                    setCities(updatedCities);
                    // if (getQueryParam('aucId')) {
                    //     formik.setFieldValue('city', {
                    //         id: updatedCities.find((city: any) => city.name === formik.values.city.name).id,
                    //         name: updatedCities.find((city: any) => city.name === formik.values.city.name).name
                    //     });
                    // }
                } else {
                    setCities([])
                }
            } catch (error) {
            } finally {
                setIsFetchingLocation(false);
            }
        };

        if (formik.values.state !== "placeholder" && formik.values.state !== "" && stateId !== 0) {
            fetchCitiesByState();
        }

    }, [stateId]);

    const handleConfirmSubmission = () => {
        setLocationData(formData)
        setOpenConfirmModal(false);
        setNavigation('auction')
        setIsSubmitted(true)
    }

    const handleUpdateAuction = (payload: any) => {
        setLocationData(payload)
        setOpenConfirmModal(false);
        setNavigation('auction');
        setIsUpdated(true)
    }

    const handleAddLot = () => {
        formik.validateForm().then((errors) => {
            const hasErrors = Object.keys(errors).length > 0;
            if (hasErrors) {
                setOpenSaveModal(true);
            } else {
                setLocationData(formik.values);
                setNavigation('lots')
                setIsSubmittedByLot(true);
            }
        });
    }

    const handleCancelConfirmation = () => {
        formik.resetForm();
        navigate('/auction')
    }

    return (
        <Box>
            <Typography className={classes.title}>{getQueryParam('aucId') ? "Edit Auction" : "Create New Auction"}</Typography>
            <Typography className={classes.location}>Location</Typography>
            {!isFetchingData ?
                <form onSubmit={formik.handleSubmit}>
                    {/* First Row */}
                    <Box sx={{ padding: 3, marginBottom: 3, border: '1px solid #E2E8F0', borderRadius: "20px" }}>
                        <Box display="flex" gap={2} mb={2} justifyContent={'space-between'}>
                            <Box flex={1}>
                                <Typography className={classes.label}>Country</Typography>
                                <CustomTextField
                                    select
                                    fullWidth
                                    name="country"
                                    value={formik.values.country}
                                    onChange={formik.handleChange}
                                    error={formik.touched.country && Boolean(formik.errors.country)}
                                    helperText={formik.touched.country && formik.errors.country}
                                    sx={{
                                        '& .MuiSelect-icon': {
                                            color: '#A0AEC0', // Set the color of the arrow icon
                                        },
                                    }}

                                >
                                    <MenuItem value="placeholder" sx={{ display: 'none' }}>
                                        <Typography sx={{ opacity: 0.5 }}>Select Country</Typography>
                                    </MenuItem>
                                    {/* <MenuItem value="Country1">United States (US)</MenuItem> */}
                                    {!countries.length &&
                                        <MenuItem value="placeholder" sx={{ pointerEvents: 'none' }}>
                                            <Typography sx={{ opacity: 0.5 }}> No Country Found</Typography>
                                        </MenuItem>
                                    }
                                    {countries.map((item: any) => (

                                        <MenuItem key={item.id} value={item.name} onClick={() => setCountryId(item.id)}>
                                            {item.name}
                                            {/* {countryDropDownOpen && <Typography component="span" sx={{ opacity: 0.5, ml: 1 }}>({item.cities})</Typography>} */}
                                        </MenuItem>
                                    ))}

                                </CustomTextField>
                            </Box>
                            <Box flex={1}>
                                <Typography className={classes.label}>State</Typography>
                                <CustomTextField
                                    select
                                    fullWidth
                                    name="state"
                                    value={formik.values.state}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        setDropdownOpen(false);
                                    }}
                                    error={formik.touched.state && Boolean(formik.errors.state)}
                                    helperText={formik.touched.state && formik.errors.state}
                                    SelectProps={{
                                        open: dropdownOpen,
                                        onOpen: () => {
                                            if (formik.values.country === 'placeholder') {
                                                ErrorMessage('Please select a Country first!')
                                                setDropdownOpen(false); // Prevent opening
                                            } else {
                                                setDropdownOpen(true); // Allow opening
                                            }
                                        },
                                        onClose: () => setDropdownOpen(false), // Close dropdown when user clicks away
                                    }}
                                    sx={{
                                        '& .MuiSelect-icon': {
                                            color: '#A0AEC0', // Set the color of the arrow icon
                                        },

                                    }}
                                >
                                    <MenuItem value="placeholder" sx={{ display: 'none' }}>
                                        <Typography sx={{ opacity: 0.5 }}>Select State</Typography>
                                    </MenuItem>
                                    {!states.length &&
                                        <MenuItem value="placeholder" sx={{ pointerEvents: 'none' }}>
                                            <Typography sx={{ opacity: 0.5 }}> No State Found</Typography>
                                        </MenuItem>
                                    }
                                    {states.map((item: any) => (
                                        <MenuItem key={item.id} value={item.name} onClick={() => setStateId(item.id)}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </CustomTextField>
                            </Box>
                            <Box flex={1}>
                                <Typography className={classes.label}>City</Typography>
                                <CustomTextField
                                    select
                                    fullWidth
                                    name="city"
                                    value={formik.values.city?.id || ''} // Ensure value is an ID
                                    onChange={(e) => {
                                        const selectedCity = cities.find((city: any) => city.id === parseInt(e.target.value));
                                        if (selectedCity) {
                                            formik.setFieldValue('city', { id: selectedCity.id, name: selectedCity.name }); // Store only id & name
                                        }
                                        setCityOpen(false);
                                    }}
                                    error={formik.touched.city && Boolean(formik.errors.city)}
                                    helperText={formik.touched.city && formik.errors.city?.name} // Extract name error message
                                    SelectProps={{
                                        open: cityOpen,
                                        displayEmpty: true, // Allows showing placeholder text
                                        renderValue: (selected) => {
                                            if (!selected || selected === 0) {
                                                return <Typography sx={{ opacity: 0.5 }}>Select City</Typography>; // Placeholder
                                            }
                                            const selectedCity = cities.find((city: any) => city.id === selected);
                                            return selectedCity ? selectedCity.name : 'Select City'; // Show city name
                                        },
                                        onOpen: () => {
                                            if (formik.values.state === 'placeholder') {
                                                ErrorMessage('Please select a State first!');
                                                setCityOpen(false);
                                            } else {
                                                setCityOpen(true);
                                            }
                                        },
                                        onClose: () => setCityOpen(false),
                                    }}
                                    sx={{
                                        '& .MuiSelect-icon': {
                                            color: '#A0AEC0',
                                        },
                                    }}
                                >
                                    <MenuItem value={0} sx={{ display: 'none' }}>
                                        <Typography sx={{ opacity: 0.5 }}>Select City</Typography>
                                    </MenuItem>
                                    {!cities.length && (
                                        <MenuItem value={0} sx={{ pointerEvents: 'none' }}>
                                            <Typography sx={{ opacity: 0.5 }}>No City Found</Typography>
                                        </MenuItem>
                                    )}
                                    {cities.map((item: any) => (
                                        <MenuItem key={item.id} value={item.id}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                                </CustomTextField>

                            </Box>

                        </Box>

                        {/* Second Row */}
                        <Box display="flex" gap={2} mb={2} justifyContent={'space-between'} maxWidth={"66.1%"}>
                            <Box flex={1}>
                                <Typography className={classes.label}>Address</Typography>
                                <CustomTextField
                                    fullWidth
                                    name="address"
                                    value={formik.values.address}
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                    }}
                                    error={formik.touched.address && Boolean(formik.errors.address)}
                                    helperText={formik.touched.address && formik.errors.address}
                                />
                            </Box>
                            <Box flex={1}>
                                <Typography className={classes.label}>Zip Code</Typography>
                                <CustomTextField
                                    fullWidth
                                    name="zipCode"
                                    placeholder="Enter Zip Code"
                                    value={formik.values.zipCode}
                                    onChange={formik.handleChange}
                                    error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
                                    helperText={formik.touched.zipCode && formik.errors.zipCode}
                                />
                            </Box>
                        </Box>

                        {/* Third Row */}
                        <Box display="flex" gap={2} mb={2} justifyContent={'space-between'} maxWidth={"32.4%"}>
                            <Box flex={1}>
                                <Typography className={classes.label}>Buyer Premium</Typography>
                                <CustomTextField
                                    select
                                    fullWidth
                                    name="buyerPremium"
                                    value={formik.values.buyerPremium}
                                    onChange={formik.handleChange}
                                    error={formik.touched.buyerPremium && Boolean(formik.errors.buyerPremium)}
                                    helperText={formik.touched.buyerPremium && formik.errors.buyerPremium}
                                    sx={{
                                        '& .MuiSelect-icon': {
                                            color: '#A0AEC0', // Set the color of the arrow icon
                                        },
                                    }}
                                >
                                    <MenuItem value="placeholder" sx={{ display: 'none' }}>
                                        <Typography sx={{ opacity: 0.5 }}>Select Percentage</Typography>
                                    </MenuItem>
                                    {[0, 5, 10, 15, 20, 25].map((value) => (
                                        <MenuItem key={value} value={value}>{value}%</MenuItem>
                                    ))}
                                </CustomTextField>
                            </Box>
                        </Box>

                        <Box flex={1}>
                            <Typography className={classes.info}>Payment Information</Typography>
                            <Typography className={classes.infoText}>Currency: USD</Typography>
                        </Box>

                        {/* Payment Terms */}
                        <Box>
                            <Typography className={classes.label}>Payment Terms</Typography>
                            <CustomMultiLineTextField
                                fullWidth
                                multiline
                                maxRows={5}
                                name="paymentTerms"
                                placeholder="Enter Payment Terms..."
                                value={formik.values.paymentTerms}
                                onChange={formik.handleChange}
                                error={formik.touched.paymentTerms && Boolean(formik.errors.paymentTerms)}
                                helperText={formik.touched.paymentTerms && formik.errors.paymentTerms}
                            />
                            <Typography className={classes.wordCount} align="right">
                                {formik.values.paymentTerms.length}/500 Words
                            </Typography>
                        </Box>

                        {/* Shipping or Pickup */}
                        <Box mb={2}>
                            <RadioGroup
                                row
                                name="shippingMethod"
                                value={formik.values.shippingMethod}
                                onChange={formik.handleChange}
                            >
                                <FormControlLabel
                                    value="Shipping"
                                    control={<Radio />}
                                    label="Shipping"
                                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '13px', mr: 2 } }} // Adjust label font size

                                />
                                <FormControlLabel
                                    value="Pickup"
                                    control={<Radio />}
                                    label="Pickup"
                                    sx={{ '& .MuiFormControlLabel-label': { fontSize: '13px' } }} // Adjust label font size
                                />
                            </RadioGroup>
                        </Box>

                        {/* Terms and Conditions */}
                        <Box mb={2}>
                            <Typography className={classes.label}>Terms and Conditions</Typography>
                            <CustomMultiLineTextField
                                fullWidth
                                multiline
                                maxRows={5}
                                name="termsAndConditions"
                                placeholder="Enter Terms and Conditions..."
                                value={formik.values.termsAndConditions}
                                onChange={formik.handleChange}
                                error={formik.touched.termsAndConditions && Boolean(formik.errors.termsAndConditions)}
                                helperText={formik.touched.termsAndConditions && formik.errors.termsAndConditions}
                            />
                            <Typography className={classes.wordCount} align="right">
                                {formik.values.termsAndConditions.length}/500 Words
                            </Typography>
                        </Box>

                        <Box className={classes.actionButtons}>
                            {location.pathname !== "/auction/edit" &&
                                <Button
                                    className={classes.cancelButton}
                                    variant="outlined"
                                    onClick={() => handleAddLot()}
                                >
                                    {isSubmittedByLot ? <CircularProgress size={25} sx={{ color: theme.palette.primary.main }} /> : 'Add a Lot'}

                                </Button>
                            }
                            <Button
                                className={classes.cancelButton}
                                variant="outlined"
                                onClick={() => setIsCancelOpen(true)}
                            >
                                Cancel
                            </Button>
                            <Button
                                className={classes.continueButton}
                                type="submit"
                                variant="contained"
                                color="primary"
                                onClick={() => setSubmissionAttempt(!submissionAttempt)}
                            >
                                {
                                    isSubmitted || isUpdated ? <CircularProgress size={25} sx={{ color: theme.palette.primary.main3 }} />
                                        : location.pathname === "/auction/edit" ? 'Update Auction' : 'Submit'}
                            </Button>
                        </Box>
                    </Box>
                </form>
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
            {/* Confirmation Modal On Save Button*/}
            <CustomDialogue
                type={"create"}
                title={"Confirm Submission!"}
                message={"Are you sure you want to create current auction without adding lots?"}
                openDialogue={openConfirmModal}
                handleCloseModal={() => setOpenConfirmModal(false)}
                handleConfirmModal={() => handleConfirmSubmission()}
                isDeleting={false}

            />


            {/* Save Changes Modal On Add a Lot Button*/}
            <CustomDialogue
                type={"addALot"}
                title={"Save Changes!"}
                message={"Save your changes before adding a lot."}
                openDialogue={openSaveModal}
                handleCloseModal={() => setOpenSaveModal(false)}
                handleConfirmModal={() => setOpenSaveModal(false)}
                isDeleting={false}

            />

            {/* Cancel Cofirmation on Cancel Button*/}
            <CustomDialogue
                type={"create"}
                title={"Cancel Auction Creation?"}
                message={"Are you sure you want to cancel creating the current auction?"}
                openDialogue={isCancelOpen}
                handleCloseModal={() => setIsCancelOpen(false)}
                handleConfirmModal={handleCancelConfirmation}
                isDeleting={false}

            />
        </Box>
    );
};

export default LocationForm;