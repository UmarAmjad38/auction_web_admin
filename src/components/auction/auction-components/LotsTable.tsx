import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ErrorMessage, SuccessMessage } from "../../../utils/ToastMessages";
import { deleteLot } from "../../Services/Methods";

interface Lot {
    Id: number;
    LotNo: string;
    StartDate: string;
    EndDate: string;
}

interface LotsTableProps {
    lots: Lot[];
    setLots: React.Dispatch<React.SetStateAction<Lot[]>>;
}

const LotsTable: React.FC<LotsTableProps> = ({ lots, setLots }) => {
    const handleDelete = async (id: number) => {
        setLots((prevLots) => prevLots.filter((lot) => lot.Id !== id));
        SuccessMessage('Lot deleted successfully!')
        // try {
        // Call the delete API
        // const response: any = await deleteLot(id);
        // if (response.status === 200) {
        //     setLots((prevLots) => prevLots.filter((lot) => lot.Id !== id));
        // } else {
        //     ErrorMessage('Error deleting lot!')
        // }
        // } catch (error) {
        // }
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Lot Id</TableCell>
                        <TableCell>Lot No</TableCell>
                        <TableCell>Start Date</TableCell>
                        <TableCell>End Date</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {lots.map((lot) => (
                        <TableRow key={lot.Id}>
                            <TableCell>{lot.Id}</TableCell>
                            <TableCell>{lot.LotNo}</TableCell>
                            <TableCell>{lot.StartDate}</TableCell>
                            <TableCell>{lot.EndDate}</TableCell>
                            <TableCell>
                                <IconButton
                                    color="error"
                                    onClick={() => handleDelete(lot.Id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default LotsTable;
