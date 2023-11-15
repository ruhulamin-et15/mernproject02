import React from "react";
import { useAuth } from "../../context/auth";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";

const UserDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Best offers - ecommerce app"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-sm-4">
            <UserMenu />
          </div>
          <div className="col-sm-8">
            <h2 className="text-center">User Dashboard</h2>
            <pre>{JSON.stringify(auth, null, 4)}</pre>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserDashboard;
