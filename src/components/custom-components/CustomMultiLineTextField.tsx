import { styled, TextField } from "@mui/material";

export const CustomMultiLineTextField = styled(TextField)(({ theme }) => ({
    width: '100%',
    paddingBottom: 10,
    "& .MuiFormControl-root": {
        position: 'relative',
    },
    "& .MuiOutlinedInput-root": {
        minHeight: '100px',
        borderRadius: '15px',
        "& fieldset": {
            border: `1px solid ${theme.palette.grey[300]}`,
        },
        "&:hover fieldset": {
            border: `1px solid ${theme.palette.grey[400]}`,
            transition: 'border 0.3s ease-in-out'
        },
        "&.Mui-focused fieldset": {
            border: `1px solid ${theme.palette.primary.main}`,
        },
    },
    "& .MuiInputBase-input": {
        padding: '10px 16px',
        "&:-webkit-autofill": {
            WebkitBoxShadow: '0 0 0 1000px transparent inset', // Remove background color
            WebkitTextFillColor: theme.palette.text.primary, // Ensure text color matches
            transition: 'background-color 5000s ease-in-out 0s', // Prevent flashing on autofill
        },
    },
    "& .MuiFormHelperText-root": {
        position: 'absolute',
        color: theme.palette.error.main, // Default to error color
        bottom: -12
    },
}));