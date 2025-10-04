import { useEffect, useState } from 'react';
import CreateAuction from './CreateAuction';
import LocationForm from './LocationForm';
import AddLot from './AddLot';
import { Box } from '@mui/material';
import { formatDate, formatTime } from '../../../utils/Format';
import { createAuction, editAuction } from '../../Services/Methods';
import { toast, ToastContainer } from 'react-toastify';
import { ErrorMessage, SuccessMessage } from '../../../utils/ToastMessages';
import { useNavigate } from 'react-router-dom';

const CreatePage = ({ type }: any) => {

    // data states
    const [auctionData, setAuctionData]: any = useState({});
    const [locationData, setLocationData]: any = useState({});

    // utils
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const [isSubmittedByLot, setIsSubmittedByLot] = useState(false);
    const [isContinue, setIsContinue] = useState(false);
    // const [file, setFile]: any = useState(null);
    const [files, setFiles]: any = useState([]);
    const [navigation, setNavigation] = useState("");
    const isLiveAuction = localStorage.getItem("isLive");

    const navigate = useNavigate()
    useEffect(() => {
        if (isContinue) {
            document.getElementById('childContainer')?.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }, [isContinue]);

    useEffect(() => {
        if ((isSubmitted || isSubmittedByLot) && Object.keys(auctionData).length !== 0 && Object.keys(locationData).length !== 0) {
            const isLiveAuction = localStorage.getItem("isLive");
            const updatedData = {
                Name: auctionData.auctionName,
                Type: auctionData.auctionType,
                Image: "https://example.com/image.jpg",
                Description: auctionData.description,
                Notes: "Test Notes",
                LiveStreaming: isLiveAuction === "true" ? true : false,
                StartDate: formatDate(auctionData.startDate),
                EndDate: formatDate(auctionData.endDate),
                StartTime: formatTime(auctionData.startTime),
                EndTime: formatTime(auctionData.endTime),
                PrevStartDate: formatDate(auctionData.auctionPreviewStartDate),
                PrevEndDate: formatDate(auctionData.auctionPreviewEndDate),
                PrevStartTime: formatTime(auctionData.auctionPreviewStartTime),
                PrevEndTime: formatTime(auctionData.auctionPreviewEndTime),
                CityID: locationData.city.id,
                ZipCode: locationData.zipCode,
                ShippingMethod: locationData.shippingMethod === "Shipping",
                PaymentTerms: locationData.paymentTerms,
                TermsConditions: locationData.termsAndConditions,
                CreatedAt: formatDate(auctionData.startDate),
                UpdatedAt: formatDate(auctionData.auctionPreviewStartDate),
                CheckOutDate: formatDate(auctionData.checkoutDate),
                CheckOutTime: formatTime(auctionData.checkoutTime),
                Address: locationData.address,
            };
            if (isLiveAuction) {
                localStorage.removeItem("isLive");
            }
            createNewAuction(updatedData)
        }
    }, [isSubmitted, isSubmittedByLot])

    useEffect(() => {
        if (isUpdated && Object.keys(auctionData).length !== 0 && Object.keys(locationData).length !== 0) {

            const updatedData = {
                Id: auctionData.auctionId,
                Name: auctionData.auctionName,
                Type: auctionData.auctionType,
                Image: "https://example.com/image.jpg",
                Description: auctionData.description,
                Notes: "Test Notes",
                LiveStreaming: isLiveAuction === "true" ? true : false,
                StartDate: formatDate(auctionData.startDate),
                EndDate: formatDate(auctionData.endDate),
                StartTime: formatTime(auctionData.startTime),
                EndTime: formatTime(auctionData.endTime),
                PrevStartDate: formatDate(auctionData.auctionPreviewStartDate),
                PrevEndDate: formatDate(auctionData.auctionPreviewEndDate),
                PrevStartTime: formatTime(auctionData.auctionPreviewStartTime),
                PrevEndTime: formatTime(auctionData.auctionPreviewEndTime),
                Country: locationData.country,
                State: locationData.state,
                ZipCode: locationData.zipCode,
                City: locationData.city.name,
                CityID: locationData.city.id,
                Address: locationData.address,
                ShippingMethod: locationData.shippingMethod === "Shipping",
                PaymentTerms: locationData.paymentTerms,
                TermsConditions: locationData.termsAndConditions,
                CreatedAt: formatDate(auctionData.startDate),
                UpdatedAt: formatDate(auctionData.startDate),
                CheckOutDate: formatDate(auctionData.checkoutDate),
                CheckOutTime: formatTime(auctionData.checkoutTime),
                IsSold: false,
                IsDeleted: false
            };
            if (isLiveAuction) {
                localStorage.removeItem("isLive");
            }
            updateAuction(updatedData)
        }
    }, [isUpdated])


    const createNewAuction = async (payload: any) => {
        const formData = new FormData();
        formData.append("payload", JSON.stringify(payload));
        // if (file) {
        //     formData.append("file", file);
        //     formData.append("file", file);
        //     setFile(null)
        // }
        if (files && files.length > 0) {
            files.forEach((f: any) => formData.append("file", f));
            setFiles([])
        }

        createAuction(formData).then((response) => {

            const newAuctionId = response.data[0].Id;
            if (newAuctionId) {
                if (navigation == "auction") {
                    navigate('/auction')
                } else {
                    navigate(`/auction/lots/create?aucId=${newAuctionId}`)
                }
                SuccessMessage('Auction created successfully!');
            } else {
                ErrorMessage('Error creating auction!');
            }
            setIsSubmitted(false)

        }).catch(error => {
            ErrorMessage('Error creating auction!');
            setIsSubmitted(false)
        });
    }

    const updateAuction = async (payload: any) => {
        const formData = new FormData();
        formData.append("payload", JSON.stringify(payload));
        // if (file) {
        //     formData.append("file", file);
        //     setFile(null)
        // }
        if (files && files.length > 0) {
            files.forEach((f: any) => formData.append("file", f));
            setFiles([])
        }
        editAuction(formData).then((response) => {

            const newAuctionId = response.data.Id;
            setIsSubmitted(false)

            if (navigation == "auction") {
                navigate('/auction')
            } else {
                navigate(`/auction/lots/create?aucId=${newAuctionId}`)
            }

            SuccessMessage('Auction updated successfully!');

        }).catch(error => {
            ErrorMessage('Error updating auction!');
            setIsSubmitted(false)
        });
    }

    return (
        <Box sx={{ padding: 2 }}>
            {isContinue ? (
                <LocationForm
                    setLocationData={setLocationData}
                    isSubmitted={isSubmitted}
                    setIsSubmitted={setIsSubmitted}
                    isSubmittedByLot={isSubmittedByLot}
                    setIsSubmittedByLot={setIsSubmittedByLot}
                    setNavigation={setNavigation}
                    setIsUpdated={setIsUpdated}
                    isUpdated={isUpdated}
                />
            ) : (
                <CreateAuction
                    // file={file}
                    // setFile={setFile}
                    files={files}
                    setFiles={setFiles}
                    setIsContinue={setIsContinue}
                    setAuctionData={setAuctionData}
                />
            )}
        </Box>
    );
};

export default CreatePage;
