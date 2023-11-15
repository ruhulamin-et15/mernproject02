import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  //get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/get-products");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      // toast.error("something went wrong")
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-sm-4">
            <AdminMenu />
          </div>
          <div className="col-sm-8">
            <h2 className="text-center">All Products List</h2>
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    style={{ maxHeight: "90px" }}
                    className="card-image-top m-2 rounded-2"
                    src={`/api/product/get-photo/${p._id}`}
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">{p.description}</p>
                    <Link
                      to={`/update-product/${p.slug}`}
                      key={p._id}
                      className="btn btn-success"
                    >
                      Update/Delete
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
