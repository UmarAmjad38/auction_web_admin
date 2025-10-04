import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import useSideBarStyles from './SideBarStyles';

import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import FestivalRoundedIcon from '@mui/icons-material/FestivalRounded';
import OndemandVideoRoundedIcon from '@mui/icons-material/OndemandVideoRounded';
import PriceChangeRoundedIcon from '@mui/icons-material/PriceChangeRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import CustomNavLink from '../../custom-components/CustomNavLink';
import Inventory2RoundedIcon from '@mui/icons-material/Inventory2Rounded';

const SideBar = () => {
    const classes = useSideBarStyles();
    const navigate = useNavigate();
    const theme: any = useTheme();

    const navItems = [
        { label: 'Dashboard', path: '/dashboard', icon: <GridViewRoundedIcon /> },
        { label: 'Auction', path: '/auction', icon: <FestivalRoundedIcon /> },
        { label: 'Live Streaming', path: '/live', icon: <OndemandVideoRoundedIcon /> },
        { label: 'Payment Tracking', path: '/payment', icon: <PriceChangeRoundedIcon /> },
        { label: 'Inventory', path: '/inventory', icon: <Inventory2RoundedIcon /> },
        { label: 'Logout', path: '/logout', icon: <LogoutRoundedIcon /> },
    ];

    const location = useLocation();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const isSelected = (path: string) => {

        if (path === "/auction" || path === "/live" || path === "/inventory") {
            return location.pathname.replace(/\/+$/, '').includes(path);
        }
        return path === location.pathname;
    }

    return (
        <Box className={isMobile ? classes.mobileSideBar : classes.sideBarContainer}>
            {/* Logo */}

            <Box className={classes.logo}>
                <img
                    src={`${process.env.PUBLIC_URL}/assets/svgs/logo.svg`}
                    alt="Parker's Auction"
                    style={{ width: '80%', }}
                />
            </Box>

            <Box className={classes.menu}>
                MENU
            </Box>
            {/* Navigation Buttons */}
            {navItems.map((item) => (
                <CustomNavLink
                    isSelected={isSelected(item.path)}
                    key={item.path}
                    to={item.path}
                    onClick={() => navigate(item.path)}
                    className={item.path === '/logout' ? classes.logoutLink : ''}
                >
                    <Box className={classes.navContent}>
                        {item.icon}
                        {!isMobile && <Typography className={classes.navText}>{item.label}</Typography>}
                    </Box>
                </CustomNavLink>
            ))}
        </Box>
    );
};

export default SideBar;
