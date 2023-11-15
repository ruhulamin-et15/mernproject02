import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import toast from 'react-hot-toast';
import { useAuth } from "../../context/auth";


const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth()
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });
      if(response && response.data.success){
        toast.success(response.data && response.data.message);
        setAuth({
          ...auth,
          user: response.data.user,
          token: response.data.accessToken,
        });
        localStorage.setItem("auth", JSON.stringify(response.data));
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <Layout title={"login - ecommerce app"}>
      <div className="pnf">
        <form onSubmit={handleLogin} className="bg-success p-2 rounded">
        <h3 className="text-center">Login Form</h3>
          <div className="mb-2">
            <input
              type="email"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-control"
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary form-control mb-2">
            Login
          </button>
          <button type="button" onClick={()=> {navigate("/forgot-password")}} className="btn btn-primary form-control">
            Forgot Password
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;