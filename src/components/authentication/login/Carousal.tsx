import { useState, useEffect, useRef } from 'react';
import { Box, IconButton, Fade, Typography, useTheme, useMediaQuery } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useCarousalStyles } from './LoginStyles';

const Carousel = () => {
    const theme: any = useTheme();
    const primaryColor = theme.palette.primary.main;

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useCarousalStyles();

    const [currentIndex, setCurrentIndex] = useState(0);
    const [fadeIn, setFadeIn] = useState(true);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const items = [
        { svg: 'imglogin1.svg', text: 'Lorem ipsum dolor sit amet' },
        { svg: 'imglogin2.svg', text: 'Lorem ipsum dolor sit adipisicing' },
        { svg: 'imglogin1.svg', text: 'Lorem ipsum dolor sit' },
    ];

    useEffect(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        intervalRef.current = setInterval(() => {
            setFadeIn(false);
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
                setFadeIn(true);
            }, 500);
        }, 5000);

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    const handleDotClick = (index: number) => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        setFadeIn(false);

        setTimeout(() => {
            setCurrentIndex(index);
            setFadeIn(true);
        }, 500);

        intervalRef.current = setInterval(() => {
            setFadeIn(false);
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
                setFadeIn(true);
            }, 500);
        }, 5000);
    };

    return (
        <Box
            className={classes.container}
            style={{
                height: isMobile ? '300px' : '90%',
            }}
        >
            {/* Logo */}
            <Box className={classes.logo}>
                <img
                    src={`${process.env.PUBLIC_URL}/assets/svgs/logo.svg`}
                    alt="Parker's Auction"
                    style={{ width: '30%', }}
                />
            </Box>
            <Fade in={fadeIn} timeout={1000}>
                <Box className={classes.imageWrapper}>
                    <Box
                        component="img"
                        src={`${process.env.PUBLIC_URL}/assets/svgs/${items[currentIndex].svg}`}
                        alt={`SVG ${currentIndex}`}
                        className={classes.image}
                    />
                </Box>
            </Fade>

            <Box className={classes.dotsContainer}>
                {items.map((_, index) => (
                    <IconButton
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={classes.dotButton}
                        sx={{
                            backgroundColor: currentIndex === index ? primaryColor : 'transparent',
                            border: `2px solid ${primaryColor}`,
                            '& svg': {
                                fill: currentIndex === index ? primaryColor : theme.palette.primary.main3,
                                transition: 'fill 0.5s ease-in-out',
                            },
                        }}
                    >
                        <FiberManualRecordIcon />
                    </IconButton>
                ))}
            </Box>
        </Box>
    );
};

export default Carousel;
