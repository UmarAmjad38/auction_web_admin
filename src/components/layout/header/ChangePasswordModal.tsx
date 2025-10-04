import { VisibilityOff, Visibility } from '@mui/icons-material'
import { Dialog, Box, Typography, InputAdornment, IconButton, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import theme from '../../../theme'
import CustomButton from '../../custom-components/CustomButton'
import CustomTextField from '../../custom-components/CustomTextField'
import { useFormik } from 'formik'
import useHeaderStyles from './HeaderStyles'
import * as Yup from 'yup';
import { changePassword } from '../../Services/Methods'
import { useNavigate } from 'react-router-dom'
import { ErrorMessage, SuccessMessage } from '../../../utils/ToastMessages'

const ChangePasswordModal = ({ changePasswordOpen, setChangePasswordOpen }: any) => {
    const classes = useHeaderStyles();
    const navigate = useNavigate()

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Formik setup
    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            oldPassword: Yup.string()
                .required('Old password is required'),
            password: Yup.string()
                .min(8, 'Password should be at least 8 characters')
                .matches(/[A-Z]/, 'Password must include at least one uppercase letter')
                .matches(/[a-z]/, 'Password must include at least one lowercase letter')
                .matches(/\d/, 'Password must include at least one number')
                .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/, 'Password must include at least one special character')
                .notOneOf([Yup.ref('oldPassword')], 'New password must not match old password')
                .required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password')], 'Passwords must match')
                .required('Confirm password is required'),
        }),
        onSubmit: (values) => {
            setIsSubmitting(true);

            const payload = {
                Email: sessionStorage.getItem('email'),
                OldPassword: values.oldPassword,
                NewPassword: values.password
            }
            handleChangePassword(payload)
        },
    });

    const handleChangePassword = async (payload: any) => {

        try {
            // Critical request:
            let response: any = await changePassword(payload)

            if (response.data) {
                // setOpenModal(true);
                setTimeout(() => {
                    setIsSubmitting(false);
                    setChangePasswordOpen(false);
                    SuccessMessage("Password changed successfully!");
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

    const togglePasswordVisibility = (field: string) => {
        if (field === 'oldPassword') {
            setShowOldPassword((prev) => !prev);
        } else if (field === 'password') {
            setShowNewPassword((prev) => !prev);
        } else if (field === 'confirmPassword') {
            setShowConfirmPassword((prev) => !prev);
        }
    };

    return (
        <Dialog open={changePasswordOpen} onClose={() => setChangePasswordOpen(false)} maxWidth="sm"
            PaperProps={{ sx: { borderRadius: "20px" } }}
        >
            <Box className={classes.dialogue}>
                <Box className={classes.dialogueContent}>
                    <Box className={classes.dialogueTitle}>
                        <Typography sx={{ fontSize: "20px", fontWeight: "bold", textAlign: 'center' }}>
                            Change Password
                        </Typography>
                        <Typography sx={{ fontSize: "14px", textAlign: 'center' }}>
                            Password must contain atleast 1 letter, 1 number and 1 symbol minimum length is 8 characters.
                        </Typography>

                    </Box>
                    <form onSubmit={formik.handleSubmit}>
                        <Box className={classes.textFields}>

                            <Box className={classes.textFieldWrapper}>
                                <Typography className={classes.label}>Old Password:</Typography>
                                <CustomTextField
                                    fullWidth
                                    type={showOldPassword ? 'text' : 'password'}
                                    margin="dense"
                                    variant="outlined"
                                    required
                                    name="oldPassword"
                                    value={formik.values.oldPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
                                    helperText={formik.touched.oldPassword && formik.errors.oldPassword}
                                    placeholder="**********"
                                    slotProps={{
                                        input: {
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => togglePasswordVisibility('oldPassword')}
                                                        edge="end"
                                                        sx={{ color: 'primary.main' }}
                                                    >
                                                        {showOldPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />
                            </Box>

                            <Box className={classes.textFieldWrapper}>
                                <Typography className={classes.label}>Change Password:</Typography>
                                <CustomTextField
                                    fullWidth
                                    type={showNewPassword ? 'text' : 'password'}
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
                                                        onClick={() => togglePasswordVisibility('password')}
                                                        edge="end"
                                                        sx={{ color: 'primary.main' }}
                                                    >
                                                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
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
                                    type={showConfirmPassword ? 'text' : 'password'}
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
                                                        onClick={() => togglePasswordVisibility('confirmPassword')}
                                                        edge="end"
                                                        sx={{ color: 'primary.main' }}
                                                    >
                                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        },
                                    }}
                                />
                            </Box>
                        </Box>

                        <Box className={classes.dialogueButton}>
                            <CustomButton
                                fullWidth
                                type="submit"
                                variant="contained"
                                className={classes.buttonWrapper}
                            >
                                {isSubmitting ? <CircularProgress sx={{ color: theme.palette.primary.main3 }} /> : 'Save Changes'}
                            </CustomButton>
                        </Box>
                    </form>
                </Box>
            </Box>
        </Dialog>
    )
}

export default ChangePasswordModal
