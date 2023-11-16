import React from "react";
import { Link } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div className="admin-panel">
        <h5 className="text-center">User Menu</h5>
        <Link to="/user/profile" className="item">
          Edit Profile
        </Link>
        <Link to="/user/verify" className="item">
          Verify Phone
        </Link>
        <Link to="/user/orders" className="item">
          Your Orders
        </Link>
        <Link to="/user/orders" className="item">
          Your Products
        </Link>
      </div>
    </>
  );
};

export default UserMenu;
