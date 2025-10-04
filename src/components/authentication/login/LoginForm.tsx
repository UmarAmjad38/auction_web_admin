import { Box, Typography, Paper, Link, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomTextField from '../../custom-components/CustomTextField';
import CustomButton from '../../custom-components/CustomButton';
import CustomModal from '../../custom-components/CustomModal';
import theme from '../../../theme';
import { SignInUser } from '../../Services/Methods';
import { ErrorMessage } from '../../../utils/ToastMessages';


const LoginForm = ({ setIsAuthenticated }: any) => {
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [openModal, setOpenModal] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Formik setup
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .min(3, 'Password should be at least 8 characters')
                .required('Password is required'),
        }),
        onSubmit: (values) => {
            loginUser(values)
        },
    });

    const loginUser = async (payload: LogInPayload) => {
        setIsSubmitting(true)
        try {
            // check status and show error if any
            const response = await SignInUser(payload)

            setIsSubmitting(false)
            if (response?.status == 200) {
                setOpenModal(true)

                setTimeout(() => {
                    setOpenModal(false)
                    navigate('/')
                    sessionStorage.setItem('email', JSON.stringify(payload.email));
                    setIsAuthenticated(true)
                }, 2000);
            }
        } catch (error: any) {
            if (error.response?.status == 404) {
                ErrorMessage("User not found check email or password")
            } else {
                ErrorMessage("An error occurred")
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" width="100%">
            <Paper elevation={0} sx={{ padding: 4, maxWidth: 400, width: '100%' }}>
                <Typography variant={'h5'} py={0.5}>
                    Login
                </Typography>
                <Typography fontSize={16} gutterBottom>
                    Sign in to continue into the platform.
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Box width="100%" sx={{ py: 1 }}>
                        <Typography fontWeight="600" fontSize={15} py={1}>
                            Email:
                        </Typography>
                        <CustomTextField
                            fullWidth
                            type="email"
                            required
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            placeholder="user123@gmail.com"
                        />
                    </Box>
                    <Box>
                        <Typography fontWeight="600" fontSize={15} pt={1}>
                            Password:
                        </Typography>
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
                            placeholder='**********'
                            slotProps={{
                                input: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={togglePasswordVisibility}
                                                edge="end"
                                                sx={{ color: 'primary.main' }} // Set the icon color to primary color
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                        <Box display="flex" justifyContent="flex-end" mt={1}>
                            <Link onClick={() =>
                                navigate('/forgot-password')
                            }
                                variant="body2" fontWeight={400} underline="hover" sx={{ cursor: 'pointer' }}>
                                Forgot password?
                            </Link>
                        </Box>
                    </Box>
                    <CustomButton
                        fullWidth
                        type="submit"
                        variant="contained"
                        sx={{ mt: 2, fontSize: 16 }}
                    >
                        {isSubmitting ? <CircularProgress sx={{ color: theme.palette.primary.main3 }} /> : ' Continue'}
                    </CustomButton>
                </form>
            </Paper>

            {/* Modal opens upon form submission */}
            <CustomModal open={openModal} modalType={'login'} onClose={() => setOpenModal(false)} />
        </Box>
    );
};

export default LoginForm;
