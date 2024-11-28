import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

const ProtectedRoute = ({ children }) => {
    const { token, isLoading, usuario } = useAuth();

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    if (!token && !usuario) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
