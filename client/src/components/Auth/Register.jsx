import React, {useState } from "react";
import Layout from "../Layout/Layout";
import "./Register.css";
import { toast } from "react-toastify";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
const apiUrl = import.meta.env.VITE_API;

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer,setAnswer] = useState();

  
  const navigate = useNavigate();

  // handle form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res= await axios.post(
        `${apiUrl}/api/v1/auth/register`,
        { name, email, password, phone, address,answer }
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
    <Layout title='Register Page | Ecommerce App'>
      <div className="register">
        <h1>Register Form</h1>


        <form onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputName">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Your Name"
              className="form-control"
              id="exampleInputName"
              required
            />
          </div>

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
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPhone">Phone</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputPhone"
              placeholder="Enter Your Phone"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputAddress">Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputAddress"
              placeholder="Enter Your Address"
              required
            />
          </div>


          <div className="mb-3">
            <label htmlFor="exampleInputAddress">Answer</label>
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputAddress"
              placeholder="Enter Your Favorite Color"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>



        
      </div>
    </Layout>
  );
};

export default Register;
