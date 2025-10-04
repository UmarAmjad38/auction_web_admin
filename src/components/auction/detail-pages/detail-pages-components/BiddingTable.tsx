import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import theme from '../../../../theme';

export default function BiddingTable({ biddingData }: any) {
    return (
        <Table sx={{ maxWidth: '300px', '& td, th': { textAlign: 'center', border: '1px solid #E2E8F0', whiteSpace: 'nowrap', width: "fit-content", fontSize: '12px' } }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: theme.palette.primary.main }}>
                <TableRow>
                    <TableCell sx={{ color: "white", }}>Start Amount</TableCell>
                    <TableCell sx={{ color: "white", }}>End Amount</TableCell>
                    <TableCell sx={{ color: "white", }}>Bid Range Amount</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {biddingData && biddingData.map((row: any, index: number) => (
                    <TableRow
                        key={"row-" + index}
                    >
                        <TableCell>{row.startAmount}</TableCell>
                        <TableCell>{row.endAmount}</TableCell>
                        <TableCell>{row.bidRangeAmount}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
