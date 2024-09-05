import { PropsWithChildren, useEffect } from 'react'
import { useAuth } from './contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({children}: PropsWithChildren) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser === null) {
      navigate("/signup", {replace: true});
    }
  }, [currentUser, navigate]);

  return (
    <> {children} </>
  )
}

export default ProtectedRoute;