import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/auth/register`, {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if(response && response.data.success){
        toast.success(response.data && response.data.message);
        console.log(response.data.message)
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
    <Layout title={"Register - ecommerce app"}>
      <div className="pnf">
        <form onSubmit={handleSubmit} className="bg-success p-2 rounded">
        <h3 className="text-center">Register Form</h3>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Enter Name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="tel"
              placeholder="Enter Phone"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Enter Address"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="What is your favourite sport?"
              onChange={(e) => setAnswer(e.target.value)}
              value={answer}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary form-control">
            Registration
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
