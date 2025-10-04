import { makeStyles } from '@mui/styles';
import theme from '../../../theme';

const useSideBarStyles = makeStyles({
    sideBarContainer: {
        position: 'sticky',
        left: 0,
        width: '15%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRight: `1px solid ${theme.palette.primary.main6}`,
        padding: '0 12px'
    },
    mobileSideBar: {
        position: 'sticky',
        left: 0,
        maxWidth: '45px',
        minWidth: '45px',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        borderRight: `1px solid ${theme.palette.primary.main6}`,
        padding: '0 12px',
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        padding: "20px 0",
    },
    menu: {
        width: '100%',
        fontSize: '16px',
        fontWeight: '500',
        color: theme.palette.primary.main5,
        textAlign: 'left'
    },
    navText: {
        fontSize: '14px',
        fontWeight: 600,
        padding: '0 10px',
        color: 'inherit'
    },
    navContent: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
    },
    logoutLink: {
        width: "85%",
        position: 'absolute',
        bottom: 0,
        padding: '',
    }
});

export default useSideBarStyles;
