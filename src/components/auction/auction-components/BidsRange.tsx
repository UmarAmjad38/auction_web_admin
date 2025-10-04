import { Box, IconButton, Button, Typography } from "@mui/material";
import CustomTextField from "../../custom-components/CustomTextField";
import ControlPointRoundedIcon from '@mui/icons-material/ControlPointRounded';
import { useCreateAuctionStyles } from "../create-edit-pages/CreateAuctionStyles";
import DeleteIcon from '@mui/icons-material/Delete';

const BidsRange = ({ formik }: any) => {
    const classes = useCreateAuctionStyles();

    const handleAddRange = () => {
        const lastRange = formik.values.bidsRange[formik.values.bidsRange.length - 1];
        const newStartAmount = lastRange ? parseInt(lastRange.endAmount) + 1 : 1;

        formik.setFieldValue('bidsRange', [
            ...formik.values.bidsRange,
            { startAmount: newStartAmount, endAmount: '', bidRangeAmount: '' },
        ]);
    };

    const handleRemoveRange = (index: number) => {
        const updatedRanges = formik.values.bidsRange.filter((_: any, i: any) => i !== index);
        formik.setFieldValue('bidsRange', updatedRanges);
    };

    const handleRangeChange = (index: number, field: string, value: string) => {
        if (field === 'startAmount') {
            const newEndAmount = parseInt(value) + 1;
            formik.setFieldValue(`bidsRange[${index}].endAmount`, newEndAmount);
            formik.setFieldValue(`bidsRange[${index}].${field}`, value);
            // if (value > formik.values.bidsRange[index + 1]?.startAmount
            //     // ||value > formik.values.bidsRange[index - 1]?.endAmount
            // ) {
            //     console.log(formik.values.bidsRange[index + 1]?.startAmount)
            //     let ind = index + 1;
            //     while (ind < formik.values.bidsRange.length) {
            //         console.log(ind)
            //         formik.setFieldValue(`bidsRange[${ind}].startAmount`, newEndAmount + 1);
            //         ind++;
            //     }
            // }
        } else if (field === 'endAmount') {
            // if (parseInt(value) > formik.values.bidsRange[index].startAmount) {
            formik.setFieldValue(`bidsRange[${index}].endAmount`, value);
            if (index < formik.values.bidsRange.length - 1) {
                formik.setFieldValue(`bidsRange[${index + 1}].startAmount`, parseInt(value) + 1);
            }
            // }
        } else {
            formik.setFieldValue(`bidsRange[${index}].${field}`, value);
        }
    };

    return (
        <Box display="flex" flexDirection="column" gap={2} mb={2}>
            {formik.values.bidsRange.map((range: any, index: number) => (
                <Box key={"bid-range" + index} display="flex" alignItems="center" gap={2} mb={2}>

                    <Box flex={1}>
                        <Typography className={classes.label}>
                            Start Amount
                        </Typography>
                        <CustomTextField
                            type='number'
                            name={`bidsRange[${index}].startAmount`}
                            placeholder="Start Amount"
                            value={range.startAmount}
                            onChange={(e) => handleRangeChange(index, 'startAmount', e.target.value)}
                            error={
                                formik.touched.bidsRange?.[index]?.startAmount &&
                                Boolean(formik.errors.bidsRange?.[index]?.startAmount)
                            }
                            helperText={
                                formik.touched.bidsRange?.[index]?.startAmount &&
                                formik.errors.bidsRange?.[index]?.startAmount
                            }
                            inputProps={{ readOnly: index > 0, tabIndex: index > 0 ? -1 : 0 }} // Prevent focus but keep value editable
                        />
                    </Box>
                    <Box flex={1} mx={2}>
                        <Typography className={classes.label}>
                            End Amount
                        </Typography>
                        <CustomTextField
                            type='number'
                            name={`bidsRange[${index}].endAmount`}
                            placeholder="End Amount"
                            value={range.endAmount}
                            onChange={(e) => handleRangeChange(index, 'endAmount', e.target.value)}
                            onBlur={(e) => {
                                if (parseInt(e.target.value) <= parseInt(range.startAmount)) {
                                    formik.setFieldValue(`bidsRange[${index}].endAmount`, "");
                                }
                            }}
                            error={
                                formik.touched.bidsRange?.[index]?.endAmount &&
                                Boolean(formik.errors.bidsRange?.[index]?.endAmount)
                            }
                            helperText={
                                formik.touched.bidsRange?.[index]?.endAmount &&
                                formik.errors.bidsRange?.[index]?.endAmount
                            }
                        />
                    </Box>
                    <Box flex={1}>
                        <Typography className={classes.label}>
                            Bid Range Amount
                        </Typography>
                        <Box className={classes.inputWithButton}>
                            <CustomTextField
                                type='number'
                                name={`bidsRange[${index}].bidRangeAmount`}
                                placeholder="Bid Range Amount"
                                value={range.bidRangeAmount}
                                onChange={(e) => handleRangeChange(index, 'bidRangeAmount', e.target.value)}
                                error={
                                    formik.touched.bidsRange?.[index]?.bidRangeAmount &&
                                    Boolean(formik.errors.bidsRange?.[index]?.bidRangeAmount)
                                }
                                helperText={
                                    formik.touched.bidsRange?.[index]?.bidRangeAmount &&
                                    formik.errors.bidsRange?.[index]?.bidRangeAmount
                                }
                            />
                            {index === formik.values.bidsRange.length - 1 ?
                                <IconButton onClick={handleAddRange} sx={{ margin: "0 0 10px 10px" }}>
                                    <ControlPointRoundedIcon className={classes.addIcon} />
                                </IconButton> :
                                <IconButton onClick={() => handleRemoveRange(index)} sx={{ margin: "0 0 10px 10px" }}>
                                    <DeleteIcon color="error" />
                                </IconButton>
                            }
                        </Box>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default BidsRange;
