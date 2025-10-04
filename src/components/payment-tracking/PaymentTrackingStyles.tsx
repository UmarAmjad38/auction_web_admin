import { makeStyles } from "@mui/styles";

const usePaymentTrackingStyles = makeStyles((theme: any) => ({
    header: {
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: '30px',
        fontWeight: 600,
        color: theme.palette.primary.main,
        paddingBottom: "20px"
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
    toggleButton: {
        textTransform: 'none',
        transition: 'background 0.25s ease-in-out, color 0.3s ease-in-out, font-size 0.25s ease-in-out',
        border: 'none',
        borderRadius: '5px !important',
        width: "120px",
        '&.pending': {
            fontSize: '11px',
            backgroundColor: `${theme.palette.primary.main} !important`,
            color: 'white !important',
        },
        '&.paid': {
            fontSize: '10px',
            backgroundColor: 'inherit',
            color: `${theme.palette.primary.main5} !important`,
        },
    },
    paymentTable: {
        maxWidth: '100%',
        border: '1px solid #E2E8F0',
        '& td': {
            fontSize: '16px',
            color: '#2A2A2A'
        },
        '& th': {
            fontSize: '18px'
        },
        '& td th': {
            textAlign: 'left',
            whiteSpace: 'nowrap',
            width: "fit-content",
            fontSize: '12px'
        },
        // Center last two columns (th and td)
        '& th:last-child, & td:last-child': {
            textAlign: 'center',
        },
        '& th:nth-last-child(2), & td:nth-last-child(2)': {
            textAlign: 'center',
        },
    },
    paginationWrapper: {
        display: "flex",
        justifyContent: 'end',
        alignItems: 'center',
        padding: "30px 0"
    },
    viewButton: {
        width: "100px",
        backgroundColor: "#377DFF",
        textTransform: "none",
        fontSize: '15px',
    },
    status: {
        width: "100px",
        textTransform: "none",
        fontSize: '15px',
        color: 'white',
        '&.active': {
            backgroundColor: "#009045",
        },
        '&.inactive': {
            backgroundColor: '#FF0000',
        },
    },
}));

export default usePaymentTrackingStyles;
