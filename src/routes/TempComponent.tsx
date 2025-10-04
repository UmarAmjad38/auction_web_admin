import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TempComponent = ({ setIsAuthenticated }: any) => {
    const navigate = useNavigate();
    useEffect(() => {
        sessionStorage.removeItem('email');
        setIsAuthenticated(false);
        navigate('/')
    }, [])
    return (<></>)
}

export default TempComponent
