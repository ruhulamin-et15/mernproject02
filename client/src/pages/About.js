import React from "react";
import Layout from "../components/layout/Layout";

const About = () => {
  return (
    <Layout title={"About us - ecommerce app"}>
      <div className="container">
        <div className="row">
          <div className="col-sm-6 mt-3">
            <img
              src="./images/about.jpeg"
              alt="about"
              style={{ width: "100%" }}
            />
          </div>
          <div className="col-sm-6 mt-5">
            <p className="mt-5">
              Your about page summarizes your history, values, and mission — all
              in one place. That’s a tall order for just a few paragraphs. If
              you’re feeling stuck, turn to these What makes a good about page?
              How to Write an About Page
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
