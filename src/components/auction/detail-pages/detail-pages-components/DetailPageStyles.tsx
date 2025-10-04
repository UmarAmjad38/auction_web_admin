
import { makeStyles } from '@mui/styles';
import theme from '../../../../theme';

const useDetailStyles = makeStyles(() => ({
    title: {
        fontSize: '30px',
        fontWeight: 600,
        color: theme.palette.primary.main,
    },
    card: {
        position: 'relative',
        padding: "12px",
        borderRadius: "20px",
    },
    liveCard: {
        position: 'relative',
        padding: "12px",
        borderRadius: "20px",
        // height: "70%",
        width: "85s%",
    },
    media: {
        borderRadius: "20px",
    },
    thmbnailsWrapper: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: 'center',
        marginTop: "10px"

    },
    thumbnails: {
        width: "30%",
        height: 80,
        borderRadius: "20px",
        border: "2px solid #ddd",
        cursor: "pointer",
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        },
    },
    rightTitle: {
        fontSize: "22px",
        fontWeight: 600,
        color: theme.palette.primary.main1,
        flex: 1,
    },
    description: {
        color: theme.palette.primary.main2,
        fontSize: "12px",
        paddingTop: "4px"
    },
    dateTime: {
        fontSize: "13px",
        fontWeight: 700,
        color: theme.palette.primary.main1
    },
    row: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 20,
        marginTop: "10px"
    },
    iconText: {
        display: 'flex',
        alignItems: 'center',
        gap: 8,
    },
    text: {
        fontSize: "12px",
        color: theme.palette.primary.main1,
        fontWeight: "500"
    },
    soldButton: {
        backgroundColor: "#009045",
        position: 'absolute',
        top: "30px",
        left: "30px",
        pointerEvents: 'none',
        opacity: 0.9,
        width: "98.34px",
        height: "37.47px",
        fontSize: "13px",
        textTransform: "none"
    },
    unSoldButton: {
        backgroundColor: "#C91818",
        position: 'absolute',
        top: "30px",
        left: "30px",
        pointerEvents: 'none',
        opacity: 0.9,
        width: "98.34px",
        height: "37.47px",
        fontSize: "13px",
        textTransform: "none"
    },
    detailRow: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 13,
        marginTop: "10px"
    },
    details: {
        display: 'flex',
        alignItems: 'center',
    },
    detailHeading: {
        color: theme.palette.primary.main9,
        fontWeight: 500,
        whiteSpace: "nowrap",
        fontSize: "13px"
    },
    detailText: {
        color: theme.palette.primary.main1,
        fontSize: "13px"
    },
    actionButtons: {
        display: 'flex',
        alignItems: 'start',
        gap: 15,
        marginTop: "20px"
    },
    actionButton: {
        textTransform: "none",
        fontSize: "13px",
        width: "115px",
        height: "44px",
    },
    buttonContainer: {
        display: 'flex',
        gap: '16px',
        maxHeight: '40px',
        marginTop: '20px'
    },
    winnerButton: {
        textTransform: 'none',
        backgroundColor: theme.palette.primary.main,
        width: '152px',
        height: '43.78px',
        padding: "11px"
    },
    viewButton: {
        textTransform: 'none',
        color: theme.palette.primary.main5,
        borderColor: theme.palette.primary.main,
        width: '152px',
        height: '43.78px',
        padding: "11px"
    },
    location: {
        color: theme.palette.primary.main5,
        fontSize: '12px',
    },
    terms: {
        fontSize: "12px",
        color: theme.palette.primary.main5,
        fontWeight: 'bold',
        padding: "5px 0"
    },
    termsText: {
        fontSize: "12px",
        color: theme.palette.primary.main2,
    },
    seeMore: {
        fontSize: "12px",
        color: theme.palette.primary.main,
        cursor: 'pointer',
        marginLeft: "5px",
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    titleWrapper: {
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        gap: 15,
    },
    countBadge: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: "100px",
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        padding: "10px",
        fontSize: "12px",
        width: "10px",
        height: "10px",
    },
    cardContainer: {
        display: 'flex',
        gap: "15px",
        overflowX: 'scroll',
        padding: "10px 10px",
        '&::-webkit-scrollbar': {
            height: '10px',
        },
        '&::-webkit-scrollbar-thumb': {
            height: '100px',
            backgroundColor: theme.palette.primary.main4,
            borderRadius: '10px',
        },
    }
}
));

export default useDetailStyles;
