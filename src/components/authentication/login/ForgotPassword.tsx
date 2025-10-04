import { Box, Typography, CircularProgress, Link } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import CustomButton from '../../custom-components/CustomButton';
import CustomTextField from '../../custom-components/CustomTextField';
import { useState } from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';
import { useForgotPasswordStyles } from './LoginStyles';
import theme from '../../../theme';
import { ErrorMessage } from '../../../utils/ToastMessages';
import { forgotPassword } from '../../Services/Methods';

const ForgotPassword = ({ setEmail }: any) => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const classes = useForgotPasswordStyles();

    // Formik setup for forgot password
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
        }),
        onSubmit: (values) => {
            setIsSubmitting(true);
            handleForgotPassword(values.email)
        },
    });

    const handleForgotPassword = async (email: any) => {
        try {
            // Critical request:
            let response: any = await forgotPassword(email)
            if (response.data.startsWith("OTP has been sent to:")) {
                setEmail(email)
                navigate('/reset-password');
            } else {
                ErrorMessage("Couldn't send email to " + email)
            }
        } catch (error) {
            ErrorMessage("Couldn't send email to " + email)
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Box className={classes.container}>
            <Box className={classes.formWrapper}>
                <Typography variant="h5" className={classes.title}>
                    Forgot Password
                </Typography>
                <Typography variant="body1" className={classes.description}>
                    If you forget your password, we will send you reset instructions.
                </Typography>

                {/* Email input */}
                <Typography className={classes.label}>Email:</Typography>
                <CustomTextField
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    required
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    placeholder="john123@gmail.com"
                />

                <CustomButton
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => formik.handleSubmit()}
                >
                    {isSubmitting ? <CircularProgress sx={{ color: theme.palette.primary.main3 }} /> : 'Continue'}
                </CustomButton>

                {/* Link to go back to Login page */}
                <Box mt={2} textAlign="center">
                    <Link onClick={() => navigate('/login')} variant="body2" fontWeight={400} underline="hover" sx={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <KeyboardBackspaceIcon sx={{ fontSize: 16, px: 0.5 }} /> Back to Login
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default ForgotPassword;
