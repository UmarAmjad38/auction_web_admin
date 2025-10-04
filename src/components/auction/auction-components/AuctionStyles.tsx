import { makeStyles } from '@mui/styles';
import theme from '../../../theme';

export const useAuctionCardStyles = makeStyles({
    card: {
        maxWidth: "345px",
        // minHeight: "370px",
        padding: "15px",
        borderRadius: "15px",
        // border: '1px solid red'
    },
    liveCard: {
        maxWidth: "100%",
        minHeight: "370px",
        padding: "15px",
        borderRadius: "15px",
    },
    description: {
        color: theme.palette.primary.main2,
        fontSize: "12px",
        width: "100%"
    },
    media: {
        cursor: "pointer",
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        },
        borderRadius: "15px",
    },
    liveMedia: {
        cursor: "pointer",
        borderRadius: "15px",
        width: "100%"
    },
    contentWrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: '250px'
    },
    content: {
        marginTop: "15px",
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'start',
    },
    title: {
        fontSize: "18px",
        fontWeight: 600,
        color: theme.palette.primary.main1,
        flex: 1,
    },
    catalogButton: {
        height: "37.47px",
        width: "98.47px",
        textTransform: 'none',
        marginLeft: 15,
        fontSize: 12,
        padding: 0,
    },
    nextButton: {
        height: "37.47px",
        width: "150px",
        textTransform: 'none',
        border: `1px solid ${theme.palette.primary.main}`,
        color: "black",
        fontSize: 12,
        padding: 0,
    },
    selectButton: {
        textTransform: "none",
        fontSize: "13px",
        width: "150px",
        height: "37.47px",
    },
    actionButtons: {
        display: 'flex',
        alignItems: 'start',
        gap: 15,
        // marginTop: "20px"
    },
    actionButton: {
        textTransform: "none",
        fontSize: "13px",
        width: "95px",
        height: "37.47px",
    },
    smallTitle: {
        marginLeft: 15,
        fontWeight: "600",
        fontSize: "11px"

    },
    soldButton: {
        backgroundColor: "#009045",
        position: 'absolute',
        top: "10px",
        left: "10px",
        pointerEvents: 'none', // Prevent interaction while keeping styles
        opacity: 0.9, // Maintain original appearance
        width: "98.34px",
        height: "37.47px",
        fontSize: "13px",
        textTransform: "none"
    },
    unSoldButton: {
        backgroundColor: "#C91818",
        position: 'absolute',
        top: "10px",
        left: "10px",
        pointerEvents: 'none', // Prevent interaction while keeping styles
        opacity: 0.9, // Maintain original appearance
        width: "98.34px",
        height: "37.47px",
        fontSize: "13px",
        textTransform: "none"
    },
    unSoldButtonLive: {
        backgroundColor: "#C91818",
        position: 'absolute',
        top: "10px",
        left: "10px",
        pointerEvents: 'none', // Prevent interaction while keeping styles
        opacity: 0.9, // Maintain original appearance
        width: "200px",
        height: "37.47px",
        fontSize: "13px",
        textTransform: "none"
    },
    button1: {
        backgroundColor: "#C91818",
        position: 'absolute',
        top: "10px",
        left: "20px",
        opacity: 0.9, // Maintain original appearance
        width: "150px",
        height: "37.47px",
        fontSize: "13px",
        textTransform: "none"
    },
    button2: {
        backgroundColor: "#C91818",
        position: 'absolute',
        bottom: "10px",
        left: "37%", // Horizontally center it
        opacity: 0.9, // Maintain original appearance
        width: "200px",
        height: "37.47px",
        fontSize: "13px",
        textTransform: "none"
    },
    button3: {
        backgroundColor: theme.palette.primary.main,
        pointerEvents: 'none', // Prevent interaction while keeping styles
        opacity: 0.9, // Maintain original appearance
        width: "200px",
        height: "37.47px",
        fontSize: "12px",
        textTransform: "none",
        right: "10px"
    },
    joinButton: {
        textTransform: "none",
        fontSize: "13px",
        width: "95px",
        height: "37.47px",
    }
});

// Utility to get query parameter value
const getQueryParam = (key: string) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
};

export const useAuctionDetailStyles = makeStyles({
    container: {
        display: 'flex',
        flexDirection: "column",
        gap: 10,
    },
    containerLive: {
        display: 'flex',
        flexDirection: "row",
        gap: 20,
    },
    lotContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "space-between",
        gap: 20,
    },
    row: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 10,
    },
    iconText: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
    },
    flexItem: {
        // flex: '1',
    },
    text: {
        fontSize: "14px",
        color: theme.palette.primary.main2,
    },
    textLive: {
        fontSize: "16px",
        color: theme.palette.primary.main10,
    }
});