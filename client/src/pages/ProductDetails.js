import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //get single product by slug
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/product/get-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //initial p details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="row">
        <div className="col-sm-6 text-center">
          <img
            className="card-image-top m-2 rounded-1"
            height={"300px"}
            width={"300px"}
            src={`/api/product/get-photo/${product._id}`}
            alt={product.name}
          />
        </div>
        <div className="col-sm-6">
          <h1 className="text-center">Product Details</h1>
          <h4>Name: {product.name}</h4>
          <h5>Category: {product?.category?.name}</h5>
          <h5>Description: {product.description}</h5>
          <h5>Price: {product.price}</h5>
          <h5>Quantity: {product.quantity}</h5>
        </div>
      </div>
      <hr />
      <div className="row container">
        <h4>Similar Product</h4>
        {relatedProducts.length < 1 && (
          <p className="text-center">No similar products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }}>
              <img
                className="card-image-top m-2 rounded-1"
                style={{ maxHeight: "90px" }}
                src={`/api/product/get-photo/${p._id}`}
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 30)}...</p>
                <p className="card-text"> $ {p.price}</p>
                <Link to={`/product/${p.slug}`} className="btn btn-primary">
                  See More
                </Link>
                <button className="btn btn-secondary ms-1">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
