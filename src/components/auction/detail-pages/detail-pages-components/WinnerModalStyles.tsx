import { makeStyles } from '@mui/styles';
import theme from '../../../../theme';

const useWinnerModalStyle = makeStyles({
    modalContent: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: 0,
        height: "450px"
    },
    label: {
        fontSize: '15px',
        fontWeight: 600,
        color: theme.palette.primary.main10,
        paddingBottom: '10px'
    },
    filterButton: {
        textTransform: 'none',
        backgroundColor: theme.palette.primary.main,
        width: '160px',
        height: '40px',
    },
    text: {
        fontSize: "20px",
        color: "#333333"

    },
    yes: {
        backgroundColor: theme.palette.primary.main,
        width: "170px",
        height: "37.47px",
        fontSize: "16px",
        textTransform: "none"
    },
    no: {
        backgroundColor: theme.palette.primary.main3,
        width: "170px",
        height: "37.47px",
        fontSize: "16px",
        textTransform: "none",
        color: theme.palette.primary.main10,
        border: `1px solid ${theme.palette.primary.main10}`
    },
    moveModal: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: 5,
        height: "120px",
        width: "70%"
    },
    closeButtonWrapper: {
        display: "flex",
        justifyContent: "end",
        marginRight: "18px",
        marginTop: "18px",
    },
    closeButton: {
        color: 'black',
        padding: "10px",
        border: "1px solid #676767",
        borderRadius: "10px"
    },
    title: {
        fontSize: "30px",
        fontWeight: 600,
        margin: 0
    },
    imageWrapper: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '30px'
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: '9px',
    },
    name: {
        fontSize: "20px",
        fontWeight: 500,
        margin: '15px auto',
    },
    details: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    detailsContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        gap: '16px',
    },
    row: {
        display: 'flex',
        alignItems: 'center',
        gap: 30
    },
    infoText: {
        fontSize: "14px",
        textAlign: "start",
        color: theme.palette.primary.main2
    },
    icon: {
        marginRight: '8px',
        color: '#007bff',
    },
    wave: {
        position: 'absolute',
        bottom: -5,
        left: 0,
        right: 0,
    },
    detail: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
    },
    bidderHeading: {
        fontSize: "15px",
        fontWeight: 600,
        color: theme.palette.primary.main10
    },
    bidderValue: {
        marginTop: '6px',
        fontSize: "13px",
        fontWeight: 400,
        color: theme.palette.primary.main10
    },
    paymentHeading: {
        fontSize: "16px",
        fontWeight: 600,
        color: theme.palette.primary.main10
    },
    paymentValue: {
        fontSize: "15px",
        fontWeight: 400,
        color: theme.palette.primary.main10
    },
    detailsWrapper: {
        height: "60px",
        flex: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bidderImageBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    bidderName: {
        fontWeight: 600,
        color: theme.palette.primary.main10,
        marginTop: "8px"
    },
    bidderImage: {
        width: '80px',
        height: '80px',
        objectFit: 'cover',
        borderRadius: '8px',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
    },
    bidderDetails: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '12px',
        marginBottom: '12px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    },
    noBidder: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
        color: theme.palette.primary.main10,
    },
    noWinner: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '40vh',
        color: theme.palette.primary.main10,
    },
    centerSection: {
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between',
        marginRight: '16px',
        // gap: "40px"
    },
    searchField: {
        height: '40px',
        width: "50%"
    },
    searchButton: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: theme.palette.primary.main,
        border: `1px solid ${theme.palette.primary.main6}`,
        height: '100%',
        borderRadius: '0 15px 15px 0',
        right: 0
    },
});

export default useWinnerModalStyle;
