import { Box, Typography, Paper, Link, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import CustomTextField from '../../custom-components/CustomTextField';
import CustomButton from '../../custom-components/CustomButton';
import CustomModal from '../../custom-components/CustomModal';
import { useSetNewPasswordStyles } from './LoginStyles';  // Import the new styles
import theme from '../../../theme';
import { updatePassword } from '../../Services/Methods';
import { ErrorMessage } from '../../../utils/ToastMessages';

const SetNewPassword = ({ email, otp }: any) => {
    const navigate = useNavigate();
    const classes = useSetNewPasswordStyles();  // Use the styles hook

    const [showPassword, setShowPassword] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Formik setup
    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(8, 'Password should be at least 8 characters')
                .matches(/[A-Z]/, 'Password must include at least one uppercase letter')
                .matches(/[a-z]/, 'Password must include at least one lowercase letter')
                .matches(/\d/, 'Password must include at least one number')
                .matches(/[@$!%*?&]/, 'Password must include at least one special character')
                .required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password')], 'Passwords must match')
                .required('Confirm password is required'),
        }),
        onSubmit: (values) => {
            setIsSubmitting(true);
            const payload = {
                OTP: otp,
                Email: email,
                NewPassword: values.password
            }
            handleUpdatePassword(payload);
        },
    });

    const handleUpdatePassword = async (payload: any) => {

        try {
            // Critical request:
            let response: any = await updatePassword(payload)

            if (response.data) {
                setOpenModal(true);
                setTimeout(() => {
                    navigate('/login'); // Navigate back to login after resetting password
                    setIsSubmitting(false);
                }, 2000);
            } else {
                ErrorMessage("Couldn't reset password!")
            }

        } catch (error) {
            ErrorMessage("Couldn't reset password!")
        } finally {
            setIsSubmitting(false);
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <Box className={classes.container}>
            <Paper elevation={0} className={classes.paper}>
                <Typography variant={'h5'} className={classes.title}>
                    Set a new password
                </Typography>
                <Typography className={classes.description}>
                    Your password must include special characters, capital letters, numbers, and lowercase letters.
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Box className={classes.textFieldWrapper}>
                        <Typography className={classes.label}>Password:</Typography>
                        <CustomTextField
                            fullWidth
                            type={showPassword ? 'text' : 'password'}
                            margin="dense"
                            variant="outlined"
                            required
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            placeholder="**********"
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={togglePasswordVisibility}
                                                edge="end"
                                                sx={{ color: 'primary.main' }}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                    </Box>

                    <Box className={classes.textFieldWrapper}>
                        <Typography className={classes.label}>Confirm Password:</Typography>
                        <CustomTextField
                            fullWidth
                            type={showPassword ? 'text' : 'password'}
                            margin="dense"
                            variant="outlined"
                            required
                            name="confirmPassword"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                            placeholder="**********"
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={togglePasswordVisibility}
                                                edge="end"
                                                sx={{ color: 'primary.main' }}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                    </Box>

                    <CustomButton
                        fullWidth
                        type="submit"
                        variant="contained"
                        className={classes.buttonWrapper}
                    >
                        {isSubmitting ? <CircularProgress sx={{ color: theme.palette.primary.main3 }} /> : 'Reset Password'}
                    </CustomButton>
                </form>

                {/* Link to navigate back to Login */}
                <Box mt={2} textAlign="center">
                    <Link onClick={() => navigate('/login')} variant="body2" fontWeight={400} underline="hover" sx={{ cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <KeyboardBackspaceIcon sx={{ fontSize: 16, px: 0.5 }} /> Back to Login
                    </Link>
                </Box>
            </Paper>

            {/* Modal opens upon form submission */}
            <CustomModal open={openModal} modalType={'password'} onClose={() => setOpenModal(false)} />
        </Box>
    );
};

export default SetNewPassword;
