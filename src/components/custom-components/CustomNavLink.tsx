import { styled } from '@mui/system';
import { Link } from 'react-router-dom';

interface CustomNavLinkProps {
    isSelected: boolean;
}


const CustomNavLink = styled(Link, { shouldForwardProp: (prop) => prop !== 'isSelected' })<CustomNavLinkProps>(({ theme, isSelected }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '8px',
    width: '100%',
    height: '45px',
    textDecoration: 'none',
    borderRadius: '10px',
    backgroundColor: isSelected ? theme.palette.primary.main : theme.palette.primary.main3,
    color: isSelected ? theme.palette.primary.main3 : theme.palette.primary.main2,
    transition: 'background-color 0.3s ease, color 0.3s ease',
    '&:hover': {
        backgroundColor: !isSelected && theme.palette.primary.main4,
    },
}));

export default CustomNavLink;
