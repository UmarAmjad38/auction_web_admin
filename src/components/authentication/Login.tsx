import { Box, Fade } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Carousel from './login/Carousal';
import LoginForm from './login/LoginForm';
import ForgotPassword from './login/ForgotPassword';
import ResetPassword from './login/ResetPassword';
import SetNewPassword from './login/SetNewPassword';
import { useState, useEffect } from 'react';
import { useLoginStyles } from './login/LoginStyles';

const Login = ({ setIsAuthenticated }: any) => {
    const location = useLocation();
    const classes = useLoginStyles();

    const [currentComponent, setCurrentComponent]: any = useState(null);
    const [fadeIn, setFadeIn] = useState(false);
    const [email, setEmail] = useState();
    const [otp, setOtp] = useState();

    useEffect(() => {
        setFadeIn(false); // Trigger fade out
        const timer = setTimeout(() => {
            // Change the component after fade-out
            setCurrentComponent(() => {
                switch (location.pathname) {
                    case '/forgot-password':
                        return <ForgotPassword setEmail={setEmail} />;
                    case '/reset-password':
                        return <ResetPassword email={email} setOtp={setOtp} />;
                    case '/new-password':
                        return <SetNewPassword email={email} otp={otp} />;
                    default:
                        return <LoginForm setIsAuthenticated={setIsAuthenticated} />;
                }
            });
            setFadeIn(true); // Trigger fade in
        }, 300); // Match the fade-out duration

        return () => clearTimeout(timer); // Clean up the timer
    }, [location.pathname]);



    return (
        <Box className={classes.root}>
            {/* Carousel */}
            <Box className={classes.carouselContainer}>
                <Carousel />
            </Box>

            {/* Animated Component */}
            <Box className={classes.componentContainer}>
                <Fade in={fadeIn} timeout={300}>
                    <div className={classes.fadeWrapper}>{currentComponent}</div>
                </Fade>
            </Box>
        </Box>
    );
};

export default Login;
