import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Button, Paper, IconButton } from '@mui/material';
import theme from '../../theme';
import PublishRoundedIcon from '@mui/icons-material/PublishRounded';
import DeleteIcon from '@mui/icons-material/Delete';
import { ErrorMessage } from '../../utils/ToastMessages';

const MultipleImageUploader = ({ files, setFiles }: { files: any[], setFiles: (files: any[]) => void }) => {
    const [borderColor, setBorderColor] = useState(theme.palette.primary.main4);

    const onDrop = (acceptedFiles: File[]) => {
        const allowedExtensions = ['.jpg', '.png'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        const validFiles = acceptedFiles.filter(file => {
            const ext = file.name.split('.').pop()?.toLowerCase();
            if (!ext || !allowedExtensions.includes(`.${ext}`)) {
                ErrorMessage(`Only JPG and PNG files are allowed for ${file.name}.`);
                return false;
            }
            if (file.size > maxSize) {
                ErrorMessage(`File size exceeds 5MB limit for ${file.name}.`);
                return false;
            }
            return true;
        });

        setFiles([...files, ...validFiles]);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { 'image/jpeg': ['.jpg'], 'image/png': ['.png'] },
        multiple: true,
        onDragEnter: () => setBorderColor(theme.palette.primary.main),
        onDragLeave: () => setBorderColor(theme.palette.primary.main4),
    });

    const removeFile = (index: number) => {
        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);
    };

    const formatSize = (size: number) => {
        if (size >= 1024 * 1024) {
            return (size / (1024 * 1024)).toFixed(2) + ' MB';
        }
        return (size / 1024).toFixed(2) + ' KB';
    };

    return (
        <Box>
            <Box
                {...getRootProps()}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    border: `1px solid ${borderColor}`,
                    padding: '15px 0',
                    textAlign: 'center',
                    cursor: 'pointer',
                    minHeight: '150px',
                    borderRadius: '15px',
                    opacity: '0.9',
                }}
            >
                <input {...getInputProps()} />
                <Box>
                    <PublishRoundedIcon sx={{ color: theme.palette.primary.main }} />
                    <Typography sx={{ fontSize: "12px", color: theme.palette.primary.main1 }}>
                        Drag and drop your JPG or PNG images here.
                    </Typography>
                    <Button variant="contained" sx={{ fontSize: "12px", mt: 1, textTransform: 'none' }}>Upload JPG Files Here</Button>
                    <Typography sx={{ fontSize: "12px", color: theme.palette.primary.main1, fontWeight: 600 }} mt={1}>
                        Maximum file size is: 5 MB
                    </Typography>
                </Box>
            </Box>
            {files.length > 0 && (
                <Box mt={2} display="flex" flexWrap="wrap" gap={2}>
                    {files.map((file, index) => (
                        <Paper key={index} sx={{ position: 'relative', p: 1, borderRadius: 2 }}>
                            <img
                                src={URL.createObjectURL(file)}
                                alt={`Preview ${index + 1}`}
                                style={{ width: '160px', height: '120px', objectFit: 'cover' }}
                            />
                            <Typography variant="caption" display="block">
                                Size: {formatSize(file.size)}
                            </Typography>
                            <IconButton
                                size="small"
                                onClick={() => removeFile(index)}
                                sx={{ position: 'absolute', top: 0, right: 0, bgcolor: 'rgba(255,255,255,0.7)' }}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Paper>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default MultipleImageUploader;
