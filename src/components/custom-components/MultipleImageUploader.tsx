import React, { useState } from 'react';
import ImageUploading, { ImageListType } from "react-images-uploading";
import { Box, Typography, Button } from '@mui/material';
import theme from '../../theme';
import PublishRoundedIcon from '@mui/icons-material/PublishRounded';
import { ErrorMessage } from '../../utils/ToastMessages';
import { useCreateAuctionStyles } from '../auction/create-edit-pages/CreateAuctionStyles';

const MultipleImageUploader = ({ setFiles }: any) => {
    const maxNumber = 5;
    const maxSize = 2 * 1024 * 1024; // 2MB
    const classes = useCreateAuctionStyles();

    const [images, setImages]: any = useState([])

    const onChange = (imageList: ImageListType) => {
        const allowedExtensions = ['jpg', 'png'];
        const validImages = imageList.filter(image => {
            if (image.file && image.file.size > maxSize) {
                ErrorMessage('Each file must be under 2MB.');
                return false;
            }
            const ext = image?.file ? image.file.name.split('.').pop()?.toLowerCase() : '';
            if (!ext || !allowedExtensions.includes(ext)) {
                ErrorMessage('Only JPG and PNG files are allowed.');
                return false;
            }
            return true;
        });
        setImages(validImages);

        const validFiles = validImages.map(image => image.file);
        // console.log("validFiles: ", validFiles);
        setFiles(validFiles); // Store only valid files as File[]
    };


    return (
        <Box>
            <ImageUploading
                multiple
                value={images}
                onChange={onChange}
                maxNumber={maxNumber}
                dataURLKey="data_url"
                acceptType={['jpg', 'png']}
            >
                {({ imageList, onImageUpload, onImageRemove, dragProps }) => (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            border: `1px solid ${theme.palette.primary.main4}`,
                            padding: '15px 0',
                            textAlign: 'center',
                            cursor: 'pointer',
                            minHeight: '150px',
                            borderRadius: '15px',
                            opacity: '0.9',
                        }}
                        onClick={onImageUpload}
                        {...dragProps}
                    >
                        {imageList.length > 0 ? (
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center' }}>
                                {imageList.map((image: any, index: number) => (
                                    <Box key={index} className={classes.imagePreview}>
                                        <img
                                            src={image.data_url}
                                            alt="Preview"
                                            style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px' }}
                                        />
                                        <Button size="small" color="error" onClick={() => onImageRemove(index)}>Remove</Button>
                                    </Box>
                                ))}
                            </Box>
                        ) : (
                            <Box>
                                <PublishRoundedIcon sx={{ color: theme.palette.primary.main }} />
                                <Typography sx={{ fontSize: '12px', color: theme.palette.primary.main1 }}>
                                    Drag and drop up to 5 JPG or PNG images (Max 2MB each)
                                </Typography>
                                <Button variant="contained" sx={{ fontSize: '12px', mt: 1, textTransform: 'none' }}>Upload Images</Button>
                            </Box>
                        )}
                    </Box>
                )}
            </ImageUploading>
        </Box>
    );
};

export default MultipleImageUploader;
