import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ allowedUserType }) => {
  const { user, userType } = useContext(AuthContext);

  if (!user) {
    return <Navigate to={allowedUserType === 'jobseeker' ? '/jobseeker/login' : '/employer/login'} replace />;
  }

  if (userType !== allowedUserType) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;