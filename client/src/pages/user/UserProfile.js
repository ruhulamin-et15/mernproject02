import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";

const UserProfile = () => {
  //context
  const [auth, setAuth] = useAuth();

  //state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  //get user data
  useEffect(()=>{
    const {name, email, phone, address} = auth?.user || {}
    setName(name)
    setEmail(email)
    setPassword("")
    setPhone(phone)
    setAddress(address)
  },[auth?.user])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put(`/api/auth/profile`, {
        name,
        email,
        password,
        phone,
        address,
      });
      if(data?.error){
        toast.error(data?.error)
      } else {
        setAuth({...auth, user:data?.updatedUser})
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data?.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("profile updated successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid m-2 p-2">
        <div className="row">
          <div className="col-sm-4">
            <UserMenu />
          </div>
          <div className="col-sm-8">
            <div className="pnf">
              <form onSubmit={handleSubmit} className="bg-success p-2 rounded">
                <h3 className="text-center">User Profile</h3>
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Enter Name"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    placeholder="Enter Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="form-control"
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="form-control"
                  
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="tel"
                    placeholder="Enter Phone"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Enter Address"
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn btn-primary form-control">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfile;
