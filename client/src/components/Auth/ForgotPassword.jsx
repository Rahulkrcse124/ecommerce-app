import React, {useState } from "react";
import Layout from "../Layout/Layout";
import './Login.css';
import { toast } from "react-toastify";
import axios from "axios";
import {useNavigate} from 'react-router-dom'


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const[answer,setAnswer] = useState("");

  const navigate = useNavigate();

  // handle form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const res= await axios.post(
        `api/v1/auth/forgot-password`,
        {email, newPassword,answer}
      );

     

      if(res.data.success) {
        toast.success(res.data.message);
        navigate('/login')
      }
      else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong")
    }
  };





  return (
    <Layout title='Forgot Password Page | Ecommerce App'>
      <div className="register">
        <h1>Reset Password</h1>
        <form onSubmit={handleFormSubmit}>
          
          <div className="mb-3">
            <label htmlFor="exampleInputEmail">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail"
              placeholder="Enter Your Email"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your New Password"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1">Favorite Color</label>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Favorite Color"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Reset
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword

