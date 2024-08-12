import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner"; // Added import for LoadingSpinner

const Auth = ({ element: Component, ...rest }) => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_DOMAIN_NAME}/database/profile`,
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setAuth(true);
        }
      } catch (error) {
        setAuth(false);
      }
    };

    checkAuth();
  }, []);

  if (auth === null) {
    return <LoadingSpinner />; // Replaced 'Loading...' with LoadingSpinner component
  }

  return auth ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default Auth;
