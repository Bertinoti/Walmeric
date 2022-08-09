import { Navigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useAuth } from '../../contexts/authContext';
import Dashboard from '../../pages/Dashboard';

const PrivateRoot = ({ children }) => {

    const { currentUser } = useAuth();
    console.log(">>>>>>>>>>>>>>>>>>>>>>", currentUser)
    const user = currentUser;
    if (true) {
        return user === "" ? <Navigate to="/" /> : children
    }else{
        return null
    }
}

export default PrivateRoot;