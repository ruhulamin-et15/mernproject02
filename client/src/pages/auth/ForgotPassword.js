import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/auth/forgot-password`, {
        email,
        newPassword,
        answer,
      });
      if (response && response.data.success) {
        toast.success(response.data && response.data.message);
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <Layout title={"Forgot password - ecommerce app"}>
      <div className="pnf">
        <form onSubmit={handleReset} className="bg-success p-2 rounded">
          <h3 className="text-center">Reset Password</h3>
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
              placeholder="Enter New Password"
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              className="form-control"
              required
            />
          </div>
          <div className="mb-2">
            <input
              type="text"
              placeholder="Enter Your Favourite Sport"
              onChange={(e) => setAnswer(e.target.value)}
              value={answer}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary form-control mb-1">
            Reset Password
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
