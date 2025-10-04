import React, { useEffect, useState } from 'react';
import { Box, ToggleButtonGroup, ToggleButton, Pagination, Stack } from '@mui/material';
import useAuctionHeaderStyles from './AuctionHeaderStyles';
import { useLocation } from 'react-router-dom';

interface PaginationButtonProps {
    filteredData: any[];
    setPaginationedData: (data: any[]) => void;
}

const PaginationButton: React.FC<PaginationButtonProps> = React.memo(({ filteredData, setPaginationedData }) => {
    const classes = useAuctionHeaderStyles();
    const location = useLocation();
    const rowsPerPage = location.pathname === "/auction/details" || location.pathname === "/live-streaming/details" ? 3 : 8;

    const [isPagination, setIsPagination] = useState(false);
    const [page, setPage] = useState<number>(0);

    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    useEffect(() => {
        if (isPagination) {
            setPaginationedData(filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage))
        } else {
            setPaginationedData(filteredData)
        }
    }, [page, isPagination, filteredData])

    const handleChangePage = (_event: React.ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage - 1); // Adjust for 0-based index
    };


    return (
        <Box className={classes.paginationButton}>
            {isPagination ?
                <Stack spacing={0}>
                    <Pagination
                        count={totalPages} // Set the total pages dynamically
                        page={page + 1} // Adjust for 1-based index
                        onChange={handleChangePage}
                        variant="outlined"
                        shape="rounded"
                    />
                </Stack>
                :
                <Box></Box>
            }

            <Box className={classes.toggleContainer}>
                <ToggleButtonGroup
                    value={isPagination ? 'pagination' : 'single'}
                    exclusive
                    onChange={() => setIsPagination((prev) => !prev)}
                    sx={{ maxHeight: '30px' }}
                >
                    <ToggleButton
                        value="single"
                        className={`${classes.toggleButton} ${isPagination ? 'past' : 'current'}`}
                    >
                        Single Page
                    </ToggleButton>
                    <ToggleButton
                        value="pagination"
                        className={`${classes.toggleButton} ${!isPagination ? 'past' : 'current'}`}
                    >
                        Pagination
                    </ToggleButton>
                </ToggleButtonGroup>
            </Box>
        </Box>
    );
});

export default PaginationButton;
