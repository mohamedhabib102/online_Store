import { useAuth } from "../Context/Context";
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute() {
    const { authToken, userRole } = useAuth();

    if (!authToken || !userRole || !userRole.includes("Admin")) {
        return <Navigate to="/" />; 
    }

    return <Outlet />;
}

export default ProtectedRoute;
