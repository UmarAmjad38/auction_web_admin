import { Button, styled } from "@mui/material";

const CustomButton = styled(Button)(({ theme }: any) => ({
    width: '100%',
    height: '65px',
    textTransform: 'none',
    borderRadius: '15px',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.main3,
    fontSize: 16,
    boxShadow: 'none'
}));

export default CustomButton;
