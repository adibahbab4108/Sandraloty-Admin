import { useEffect } from 'react';
import { useAuth } from '@/hook/useAuth';
import { Navigate } from 'react-router';
import { toast } from 'sonner';
import { UnauthorizedLoginMessage } from '@/components/modules/Auth/UnauthorizedLoginMessage';
import { Loading } from '@/components/common/LoadingPage';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const authorizedRole = import.meta.env.VITE_AUTHORIZED_ROLE?.toLowerCase();
    const { user, isLoading } = useAuth();

    useEffect(() => {
        if (!isLoading && user && user.role !== authorizedRole) {
            toast.warning('You are not authorized!');
        }
    }, [isLoading, user, authorizedRole]);

    if (isLoading) {
        return <Loading message='Checking authentication...' />
    }
    if (!user) return <UnauthorizedLoginMessage />

    if (user.role !== authorizedRole) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};
