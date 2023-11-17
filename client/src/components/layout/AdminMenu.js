import React from "react";
import { Link } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="admin-panel">
        <h5 className="text-center">Admin Panel</h5>
        <Link to="/admin/profile" className="item active">
          Edit Profile
        </Link>
        <Link to="/manage-category" className="item active">
          Manage Category
        </Link>
        <Link to="/create-product" className="item">
          Create Product
        </Link>
        <Link to="/manage-products" className="item">
          Manage Product
        </Link>
        <Link to="/admin/orders" className="item">
          Orders
        </Link>
      </div>
    </>
  );
};

export default AdminMenu;
