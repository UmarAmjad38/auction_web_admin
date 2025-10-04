import { makeStyles } from "@mui/styles";

const useDashboardStyles = makeStyles((theme: any) => ({
    root: {
        padding: "20px",
    },
    title: {
        fontSize: '30px',
        fontWeight: 600,
        color: theme.palette.primary.main,
        paddingBottom: "20px"
    },
    dashboardContainer: {
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
    },
    card: {
        width: "350px",
        borderRadius: "14px",
        border: `1px solid ${theme.palette.primary.main4}`,
    },
    cardHeader: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "5px",
    },
    cardTitle: {
        fontSize: "16px",
        color: theme.palette.primary.main10,
    },
    cardIcon: {
        color: theme.palette.primary.main,
    },
    cardValue: {
        fontSize: "24px",
        color: theme.palette.primary.main8,
        marginBottom: "8px",
    },
    cardDate: {
        fontSize: "16px",
        color: theme.palette.primary.main2,
    },
    cardChart: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "12px",
    },
}));

export default useDashboardStyles;
