import { useState, useEffect } from 'react';
import { UseAuth } from "../Context/Auth";
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Spinner from "../Spinner";

export const AdminRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth] = UseAuth();

  useEffect(() => {
    const authCheck = async () => {
      console.log("Checking user-auth route...");
      console.log("Token being sent:", auth?.token);

      try {
        const res = await axios.get('/api/v1/auth/admin-auth', {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        });

        console.log(" Response from backend:", res.data);
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.log("Error calling user-auth:", error.response?.data || error.message);
        setOk(false);
      }
    };

    if (auth?.token) {
      authCheck();
    } else {
      console.log(" No token found in auth context.");
      setOk(false);
    }
  }, [auth?.token]);

  return ok ? <Outlet /> : <Spinner path=""/>;
};