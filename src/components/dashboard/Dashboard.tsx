import { Box, Card, CardContent, CircularProgress, Tooltip, Typography } from "@mui/material";
import useDashboardStyles from "./DashboardStyles";
import PriceChangeRoundedIcon from "@mui/icons-material/PriceChangeRounded";
import PendingActionsRoundedIcon from "@mui/icons-material/PendingActionsRounded";
import CategoryRoundedIcon from "@mui/icons-material/CategoryRounded";
import MilitaryTechRoundedIcon from "@mui/icons-material/MilitaryTechRounded";
import { ResponsiveContainer, BarChart, Bar } from "recharts";
import theme from "../../theme";
import { useEffect, useState } from "react";
import { getCurrentAuctions, getDashboardStatistics } from "../Services/Methods";

const Dashboard = () => {
    const classes = useDashboardStyles();
    const [isFetching, setIsFetching] = useState(false)
    const [statistics, setStatistics]: any = useState([])

    const data = [
        {
            title: "Total Amount Received",
            value: "$ 20,000+",
            date: "9 February 2024",
            icon: <PriceChangeRoundedIcon className={classes.cardIcon} />,
        },
        {
            title: "Total Amount Pending",
            value: "$ 8,000+",
            date: "12 January 2024",
            icon: <PendingActionsRoundedIcon className={classes.cardIcon} />,
        },
        {
            title: "Total Products",
            value: "20,000+",
            date: "2 December 2024",
            icon: <CategoryRoundedIcon className={classes.cardIcon} />,
        },
        {
            title: "Total Products Sold",
            value: "16,000+",
            date: "9 February 2024",
            icon: <MilitaryTechRoundedIcon className={classes.cardIcon} />,
        },
    ];

    useEffect(() => {
        const fetchAuctionData = async () => {
            setIsFetching(true)
            try {
                const response = await getDashboardStatistics();
                const updatedData = response?.data ?? {};

                // helper to coerce to safe number (fallback 0)
                const safeNumber = (v: any) => {
                    const n = Number(v);
                    return Number.isFinite(n) ? n : 0;
                };

                // Map API fields (support both old and new shapes)
                const totalReceived = safeNumber(updatedData.TotalPaid ?? updatedData.ReceivedAmount ?? updatedData.Received ?? 0);
                const totalPending = safeNumber(updatedData.PendingAmount ?? updatedData.Pending ?? 0);
                const totalProducts = safeNumber(updatedData.TotalLots ?? updatedData.AuctionProductsCount ?? 0);
                const totalProductsSold = safeNumber(updatedData.SoldLots ?? updatedData.LotSoldProductsCount ?? 0);

                setStatistics([
                    {
                        title: "Total Amount Received",
                        value: `$ ${totalReceived.toLocaleString()}+`,
                        date: "9 February 2024",
                        raw: totalReceived,
                        icon: <PriceChangeRoundedIcon className={classes.cardIcon} />,
                    },
                    {
                        title: "Total Amount Pending",
                        value: `$ ${totalPending.toLocaleString()}+`,
                        date: "12 January 2024",
                        raw: totalPending,
                        icon: <PendingActionsRoundedIcon className={classes.cardIcon} />,
                    },
                    {
                        title: "Total Products",
                        value: `${totalProducts.toLocaleString()}+`,
                        date: "2 December 2024",
                        raw: totalProducts,
                        icon: <CategoryRoundedIcon className={classes.cardIcon} />,
                    },
                    {
                        title: "Total Products Sold",
                        value: `${totalProductsSold.toLocaleString()}+`,
                        date: "9 February 2024",
                        raw: totalProductsSold,
                        icon: <MilitaryTechRoundedIcon className={classes.cardIcon} />,
                    },
                ]);

            } catch (error) {
                // keep the UI stable on error
                setStatistics([]);
            } finally {
                setIsFetching(false); // Set loading state to false when the call ends
            }
        };
        fetchAuctionData();
    }, []);

    const chartData = [
        { name: 'January', sales: 2000, products: 400 },
        { name: 'February', sales: 4000, products: 450 },
        { name: 'March', sales: 3000, products: 700 },
        { name: 'April', sales: 2000, products: 800 },
        { name: 'May', sales: 1000, products: 900 },
        { name: 'June', sales: 3000, products: 1200 },
        { name: 'July', sales: 5000, products: 1500 },
        { name: 'August', sales: 5500, products: 1800 },
    ]

    return (
        <Box sx={{ padding: 2 }}>
            <Typography className={classes.title}>Statistics of Dashboard</Typography>
            {!isFetching ?
                <Box className={classes.dashboardContainer}>
                    {statistics.length !== 0 && statistics.map((item: any, index: number) => (
                        <Card key={index} className={classes.card} elevation={0}>
                            <CardContent>
                                <Box>
                                    <Box className={classes.cardHeader}>
                                        <Typography className={classes.cardTitle}>
                                            {item.title}
                                        </Typography>
                                        {item.icon}
                                    </Box>
                                    <Tooltip title={String(item.raw ?? item.value)}>
                                        <Typography className={classes.cardValue}>
                                            {item.value}
                                        </Typography>
                                    </Tooltip>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'end', justifyContent: "space-between" }}>
                                    <Typography className={classes.cardDate}>
                                        {item.date}
                                    </Typography>
                                    <ResponsiveContainer width="50%" height={100} style={{ gap: 3 }}>
                                        <BarChart data={chartData}>
                                            <Bar dataKey="sales" fill={theme.palette.primary.main} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </Box>
                            </CardContent>
                        </Card>
                    ))}
                </Box>
                :
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '70vh',
                        width: '100%',
                    }}
                >
                    <CircularProgress size={70} disableShrink />
                </Box>
            }
        </Box>
    );
};

export default Dashboard;