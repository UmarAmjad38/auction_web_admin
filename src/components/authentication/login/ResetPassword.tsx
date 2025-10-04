import { Box, Typography, CircularProgress, Link } from '@mui/material';
import CustomButton from '../../custom-components/CustomButton';
import CustomTextField from '../../custom-components/CustomTextField';
import { useState } from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import theme from '../../../theme';
import { useNavigate } from 'react-router-dom';
import { useLoginStyles, useResetPasswordStyles } from './LoginStyles'; // Assuming LoginStyles is correctly exported
import { ErrorMessage, SuccessMessage } from '../../../utils/ToastMessages';
import { verifyOtp } from '../../Services/Methods';

const ResetPassword = ({ email, setOtp }: any) => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [values, setValues] = useState(['', '', '', '']); // Array to hold 4-digit values

    const loginClasses = useLoginStyles();
    const classes = useResetPasswordStyles();

    const handleChange = (e: any, index: number) => {
        const newValues = [...values];
        newValues[index] = e.target.value.slice(0, 1); // Restrict to 1 digit
        setValues(newValues);

        if (e.target.value) {
            const nextField = document.getElementById(`digit-${index + 1}`);
            if (nextField) nextField.focus();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (!/[0-9]/.test(e.key) && e.key !== 'Backspace') e.preventDefault();
        if (e.key === 'Backspace' && !values[index]) {
            const prevField = document.getElementById(`digit-${index - 1}`);
            if (prevField) prevField.focus();
        }
    };

    const handleFormSubmit = async () => {
        const otp = values.join('');

        if (otp.length !== 4) {
            return ErrorMessage("Please enter a 4-digit OTP code.");
        }
        setIsSubmitting(true);
        try {
            const response = await verifyOtp({ OTP: otp, Email: email });
            if (response?.data) {
                setOtp(otp);
                navigate('/new-password');
                SuccessMessage("OTP verification successful.");
            }
        } catch (error) {
            ErrorMessage("OTP verification failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <Box className={loginClasses.componentContainer}>
            <Box width="100%" maxWidth={400}>
                <Typography variant="h5" mb={2}>
                    Password Reset
                </Typography>
                <Typography variant="body1" fontSize={15} mb={2}>
                    We sent a code to “{email}”. Please enter the code below.
                </Typography>
                <Box className={classes.codeInputContainer}>
                    {values.map((value, index) => (
                        <CustomTextField
                            key={index}
                            id={`digit-${index}`}
                            value={value}
                            onChange={(e: any) => handleChange(e, index)}
                            onKeyDown={(e: any) => handleKeyDown(e, index)}
                            inputProps={{
                                maxLength: 1,
                                style: { textAlign: 'center', fontSize: 32, color: theme.palette.primary.main8, overflow: 'hidden' },
                                inputMode: 'numeric',
                            }}
                        />
                    ))}
                </Box>
                <CustomButton
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={handleFormSubmit}
                >
                    {isSubmitting ? <CircularProgress sx={{ color: theme.palette.primary.main3 }} /> : 'Continue'}
                </CustomButton>
                {/* Link to go back to Login page */}
                <Box mt={2} textAlign="center">
                    <Link onClick={() => navigate('/')} variant="body2" fontWeight={400} underline="hover" sx={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <KeyboardBackspaceIcon sx={{ fontSize: 16, px: 0.5 }} /> Back to Login
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default ResetPassword;
