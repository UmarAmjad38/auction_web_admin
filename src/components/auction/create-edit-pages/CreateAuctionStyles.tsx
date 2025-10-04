import { makeStyles } from '@mui/styles';
import theme from '../../../theme';

export const useCreateAuctionStyles = makeStyles({
    imagePreview: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    title: {
        fontSize: '30px',
        fontWeight: 600,
        color: theme.palette.primary.main,
        paddingBottom: '20px'
    },
    label: {
        fontSize: '15px',
        fontWeight: 600,
        color: theme.palette.primary.main10,
        paddingBottom: '10px'
    },
    labelYoutube: {
        fontSize: '17px',
        fontWeight: 600,
        color: theme.palette.primary.main10,
        // paddingBottom: '10px'
    },
    checkBoxLabel: {
        fontSize: '15px',
        fontWeight: 600,
        color: theme.palette.primary.main10,
    },
    preview: {
        padding: "14px 0",
        fontSize: '14px',
        color: theme.palette.primary.main
    },
    actionButtons: {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: "10px",
        margin: "20px 0"
    },
    cancelButton: {
        textTransform: 'none',
        color: theme.palette.primary.main5,
        borderColor: 'black',
        height: '40px',
        width: '150px',
        borderRadius: "12px",
        fontSize: '14px'
    },
    continueButton: {
        textTransform: 'none',
        color: theme.palette.primary.main3,
        borderColor: theme.palette.primary.main,
        height: '40px',
        width: '150px',
        borderRadius: "12px",
        fontSize: '14px'
    },
    info: {
        fontSize: '14px',
        color: theme.palette.primary.main,
        paddingBottom: "10px"
    },
    infoText: {
        fontSize: '17px',
        fontWeight: "600",
        color: theme.palette.primary.main,
        paddingBottom: "10px"
    },
    wordCount: {
        fontSize: "14px",
        color: theme.palette.primary.main5
    },
    location: {
        fontSize: "18px",
        fontWeight: "600",
        color: theme.palette.primary.main5,
        paddingBottom: "20px"
    },
    addIcon: {
        color: theme.palette.primary.main,
        fontSize: "40px",
        fontWeight: 0
    },
    inputWithButton: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
});