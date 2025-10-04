import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Pagination, Stack, Button, ToggleButton, ToggleButtonGroup, Fade, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import usePaymentTrackingStyles from "./PaymentTrackingStyles";
import { getPaidInvoices, getPendingInvoices, invoiceReminder } from "../Services/Methods";
import NoRecordFound from "../../utils/NoRecordFound";
import PaymentViewModal from "./PaymentViewModal";
import theme from "../../theme";
import { ErrorMessage } from "../../utils/ToastMessages";

const PaymentTracking = () => {
    const classes = usePaymentTrackingStyles();

    const [invoices, setInvoices]: any = useState([]);
    const [isFetchingData, setIsFetchingData] = useState(false);

    const [page, setPage] = useState<number>(0);
    const [selectedInvoice, setSelectedInvoice] = useState({});
    const [paidInvoice, setPaidInvoice] = useState<boolean>(false);
    const [isReminding, setIsReminding] = useState<boolean>(false);
    const [viewDetails, setViewDetails] = useState(false);
    const rowsPerPage = 10;

    useEffect(() => {
        fetchInvoices();
    }, [paidInvoice])

    const fetchInvoices = async () => {
        setIsFetchingData(true)
        try {
            const response = paidInvoice
                ? await getPaidInvoices()
                : await getPendingInvoices();

            if (response.data && response.data.length > 0) {
                const formattedInvoices = response.data.map((invoice: any) => ({
                    invoiceId: invoice.Id,
                    name: invoice.Name,
                    email: invoice.Email,
                    amount: invoice.TotalAmount,
                    deadline: invoice.Date,
                    status: invoice.Status,
                    totalLots: invoice.TotalLots,
                    paidAmount: invoice.PaidAmount,
                    pendingAmount: invoice.Pending,
                    paymentMethod: invoice.PaymenMethod,
                }));
                setInvoices(formattedInvoices);
            } else {
                setInvoices([]);
            }
        } catch (error) {
        } finally {
            setIsFetchingData(false)
        }
    };

    const handleChangePage = (_event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage - 1); // Adjust for 0-based index
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPage(0);
    };

    const handleToggleInvoice = () => {
        if (!isFetchingData) {
            setPage(0);
            setPaidInvoice(!paidInvoice);
        }
    }
    const handleViewButton = (ind: number) => {
        setSelectedInvoice(invoices[ind]);
        setViewDetails(true)
    }
    // Calculate the number of pages based on the length of tableData
    const totalPages = Math.ceil(invoices.length / rowsPerPage);
    const formatDate = (dateStr: string) => {
        const [day, month, year] = dateStr.split("-");
        return `${month}-${day}-${year}`;
    };

    const handleInvoiceReminder = async (payload: any) => {

        setIsReminding(true)

        try {
            const response = await invoiceReminder(payload);
            if (response) {
                console.log(response)
            }
        } catch (error) {
            ErrorMessage('Failed to send reminder')
        } finally {
            setIsReminding(false)
        }
    }

    return (
        <Box sx={{ padding: 2 }}>
            <Box className={classes.header}>
                <Typography className={classes.title}>{paidInvoice ? "Paid Invoices" : "Pending Invoices"}</Typography>
                <Box className={classes.toggleContainer}>
                    <ToggleButtonGroup
                        value={paidInvoice ? 'paid' : 'pending'}
                        exclusive
                        onChange={handleToggleInvoice}
                        sx={{ maxHeight: '30px' }}
                    >
                        <ToggleButton
                            value="pending"
                            className={`${classes.toggleButton} ${paidInvoice ? 'paid' : 'pending'}`}
                        >
                            Pending Invoices
                        </ToggleButton>
                        <ToggleButton
                            value="paid"
                            className={`${classes.toggleButton} ${!paidInvoice ? 'paid' : 'pending'}`}
                        >
                            Paid Invoices
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>
            </Box>

            {!isFetchingData && invoices.length > 0 ?
                <Box>
                    <Table className={classes.paymentTable} aria-label="simple table">
                        <TableHead sx={{ backgroundColor: '#19549F' }}>
                            <TableRow>
                                <TableCell sx={{ color: "white" }}>Invoice ID</TableCell>
                                <TableCell sx={{ color: "white" }}>Name</TableCell>
                                <TableCell sx={{ color: "white" }}>Email</TableCell>
                                <TableCell sx={{ color: "white" }}>Amount</TableCell>
                                <TableCell sx={{ color: "white" }}>Deadline</TableCell>
                                <TableCell sx={{ color: "white" }}>Details</TableCell>
                                <TableCell sx={{ color: "white" }}>Status</TableCell>
                                {!paidInvoice && <TableCell sx={{ color: "white" }}>Action</TableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {invoices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any, index: number) => (
                                <TableRow key={row.invoiceId}>
                                    <TableCell>{row.invoiceId}</TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.email}</TableCell>
                                    <TableCell>{row.amount}</TableCell>
                                    <TableCell>{row.deadline}</TableCell>
                                    <TableCell>
                                        <Button variant={'contained'} className={classes.viewButton} onClick={() => handleViewButton(index)}>View</Button>
                                    </TableCell>
                                    <TableCell>
                                        {paidInvoice ?
                                            <Button variant={'contained'} className={`${classes.status} ${'active'}`}>
                                                Paid
                                            </Button>
                                            :
                                            <Button variant={'contained'} className={`${classes.status} ${row.status ? 'active' : 'inactive'}`}>
                                                {row.status ? "Active" : "Inactive"}
                                            </Button>
                                        }
                                    </TableCell>
                                    {!paidInvoice &&
                                        <TableCell>
                                            <Button
                                                variant={'contained'}
                                                className={`${classes.status} ${'active'}`}
                                                onClick={() => handleInvoiceReminder({ Email: 'parkerauction369@gmail.com', Amount: row.amount, DueDate: formatDate(row.deadline) })}
                                            >
                                                {isReminding ? <CircularProgress size={25} sx={{ color: theme.palette.primary.main3 }} /> : 'Remember'}
                                            </Button>
                                        </TableCell>
                                    }
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <Box className={classes.paginationWrapper}>
                        <Stack spacing={0}>
                            <Pagination
                                count={totalPages} // Set the total pages dynamically
                                page={page + 1} // Adjust for 1-based index
                                onChange={handleChangePage}
                                variant="outlined"
                                shape="rounded"
                            />
                        </Stack>
                    </Box>
                </Box>
                : isFetchingData ?
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
                    :
                    <Box sx={{ maxHeight: "65vh" }}>
                        <NoRecordFound />
                    </Box>
            }

            <PaymentViewModal open={viewDetails} onClose={() => setViewDetails(false)} invoice={selectedInvoice} />
        </Box >
    );
};

export default PaymentTracking;
