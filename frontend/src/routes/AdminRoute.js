// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import useAuth from '../hooks/useAuth';

// const AdminRoute = () => {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return <p>Loading...</p>; // You can replace this with a Loader component if needed
//   }
//   console.log(user) 
//   // if (!user || !user.isAdmin) {
//   if (user.isAdmin === false) {
//     console.log("Going from Admin Route to Login Page")
//     return <Navigate to="/login" replace />;
//   }
//   console.log("Cleared the admin route")
  
//   return <Outlet />;
// };

// export default AdminRoute;


import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  console.log("AdminRoute - User:", user);

  if (!user || user.isAdmin === false) {
    console.log("Going from Admin Route to Login Page");
    return <Navigate to="/login" replace />;
  }

  console.log("Cleared the admin route");
  return children;
};

export default AdminRoute;
