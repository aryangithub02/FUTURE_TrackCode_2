import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useUser();
  const location = useLocation();

  if (!isLoaded) {
    // Show loading state while Clerk is initializing
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark-900">
        <div className="w-16 h-16 border-4 border-neon-blue border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // If user is not signed in, redirect to login page with return URL
  if (!isSignedIn) {
    return <Navigate to="/login" state={{ returnUrl: location.pathname }} replace />;
  }

  // If user is signed in, render the protected content
  return children;
};

export default ProtectedRoute;