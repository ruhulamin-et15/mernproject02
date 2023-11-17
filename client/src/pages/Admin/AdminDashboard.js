import React from "react";
import Layout from "../../components/layout/Layout";
import { useAuth } from "../../context/auth";
import { Link } from "react-router-dom";
import AdminMenu from "./../../components/layout/AdminMenu";

const UserDashboard = () => {
  //context
  const [auth] = useAuth();

  return (
    <Layout title={"Your Profile"}>
      <div className="container-fluid m-2 p-2">
        <div className="row">
          <div className="col-sm-4">
            <AdminMenu />
          </div>
          <div className="col-sm-8">
            <div className="pnf">
              <form className="bg-secondary p-2 rounded">
                <h3 className="text-center">Your Profile</h3>
                <div className="mb-3">
                  <h4 className="text-white ">Name: {auth?.user?.name}</h4>
                </div>
                <div className="mb-3">
                  <h4 className="text-white ">Email: {auth?.user?.email}</h4>
                </div>
                <div className="mb-3">
                  <h4 className="text-white ">Phone: {auth?.user?.phone}</h4>
                </div>
                <div className="mb-3">
                  <h4 className="text-white ">
                    Address: {auth?.user?.address}
                  </h4>
                </div>
                <Link
                  to="/admin/profile"
                  className="btn btn-primary form-control"
                >
                  Click Here to Edit Your Profile
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
