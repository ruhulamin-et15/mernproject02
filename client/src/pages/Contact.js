import React from "react";
import Layout from "../components/layout/Layout";

const Contact = () => {
  return (
    <Layout title={"Contact us - ecommerce app"}>
      <div className="container">
        <div className="row">
          <div className="col-sm-6 mt-3">
            <img
              src="./images/contactus.jpeg"
              alt="contactus"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-sm-6 mt-3">
            <h1 className="bg-dark p-2 text-white text-center">Contact Us</h1>
            <p className="text-justify mt-2">
              any query and info about product feel free to call anytime we 24X7
              vaialible
            </p>
            <p className="mt-3">📧: www.help@ecommerceapp.com</p>
            <p className="mt-3">📞: 01762717397</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
