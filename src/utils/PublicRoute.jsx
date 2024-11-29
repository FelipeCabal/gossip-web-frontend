import { Navigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

const PublicRoute = ({ children }) => {
    const { token } = useAuth();

    if (token) {
        return <Navigate to="/homepage" />;
    }

    return children;
};

export default PublicRoute;
