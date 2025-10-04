
import { makeStyles } from '@mui/styles';

const useAuctionHeaderStyles = makeStyles((theme: any) => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        fontSize: '30px',
        fontWeight: 600,
        color: theme.palette.primary.main,
    },
    buttonContainer: {
        display: 'flex',
        gap: '16px',
        maxHeight: '40px',
    },
    addAuctionButton: {
        textTransform: 'none',
        color: theme.palette.primary.main5,
        borderColor: theme.palette.primary.main,
        height: '40px',
        width: '160px',
    },
    addAuctionButtonLive: {
        textTransform: 'none',
        color: theme.palette.primary.main3,
        fontSize: "16px",
        borderColor: theme.palette.primary.main,
        height: '40px',
        width: '160px',
    },
    toggleContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #E2E8F0',
        height: '40px',
        borderRadius: '5px',
        minWidth: '260px',
        maxWidth: '260px',
    },
    filterDropDown: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '40px',
        minWidth: '260px',
        maxWidth: '260px',
    },
    toggleButton: {
        textTransform: 'none',
        transition: 'background 0.25s ease-in-out, color 0.3s ease-in-out, font-size 0.25s ease-in-out',
        border: 'none',
        borderRadius: '5px !important',
        width: "120px",
        '&.current': {
            fontSize: '11px',
            backgroundColor: `${theme.palette.primary.main} !important`,
            color: 'white !important',
        },
        '&.past': {
            fontSize: '10px',
            backgroundColor: 'inherit',
            color: `${theme.palette.primary.main5} !important`,
        },
    },
    filterButton: {
        textTransform: 'none',
        backgroundColor: theme.palette.primary.main,
        width: '160px',
        height: '40px',
    },
    menuItem: {
        '&.selected': {
            backgroundColor: theme.palette.primary.main,
        },
        '&:hover': {
            backgroundColor: theme.palette.primary.main6,
        },
    },
    paginationButton: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginTop: "20px",
    }
}));

export default useAuctionHeaderStyles;
