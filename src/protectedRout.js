import { useSelector } from "react-redux"
import {  Navigate } from 'react-router-dom';


const ProtectedRoute = ({children}) => {
    const userRole = useSelector((store) => store.user.currentUser)?.role;
    return userRole==="admin"?children:<Navigate to={'/'}/>
}

export default ProtectedRoute;