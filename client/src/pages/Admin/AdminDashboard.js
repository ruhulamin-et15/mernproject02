import React from "react";
import { useAuth } from "../../context/auth";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Best offers - ecommerce app"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-sm-4">
            <AdminMenu/>
          </div>
          <div className="col-sm-8 align-items-center">
            <h1 className="text-center">Admin Dashboard</h1>
            <pre>{JSON.stringify(auth, null, 4)}</pre>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
