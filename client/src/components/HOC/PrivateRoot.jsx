import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useAuth } from '../../contexts/authContext';
import Dashboard from '../../pages/Dashboard';

const PrivateRoot = ({ children }) => {

    const { currentUser } = useAuth();
    const user = currentUser;
    return (user === null) ? <Navigate to="/" /> : children
}

export default PrivateRoot;