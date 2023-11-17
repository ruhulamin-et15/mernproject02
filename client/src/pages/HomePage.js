import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import axios from "axios";
import { Carousel, Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { Link } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const HomePage = () => {
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  //get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`/api/product/product-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  //lifecycle method
  useEffect(() => {
    getAllProducts();
    getTotal();
  }, []);

  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("api/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`/api/product/product-filters`, {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllCategory();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMore();
  }, [page]);

  //filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (all) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  const contentStyle = {
    height: "300px",
    color: "#fff",
    lineHeight: "300px",
    textAlign: "center",
    background: "#364d79",
  };

  return (
    <Layout title={"All Products - Best offers"}>
      <div className="container-fluid p-1">
        <Carousel autoplay>
          <div>
            <h3 style={contentStyle}>
              <img
                src="/images/voucher.jpg"
                style={{ height: "300px" }}
                className="w-100"
              />
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              <img
                src="/images/baby.jpg"
                style={{ height: "300px" }}
                className="w-100"
              />
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              <img
                src="/images/payment.jpg"
                style={{ height: "300px" }}
                className="w-100"
              />
            </h3>
          </div>
          <div>
            <h3 style={contentStyle}>
              <img
                src="/images/ride.jpg"
                style={{ height: "300px" }}
                className="w-100"
              />
            </h3>
          </div>
        </Carousel>

        <div className="row mt-3">
          <div className="col-sm-2">
            <h6 className="text-center">Filter By Category</h6>
            <div className="d-flex flex-column">
              {categories?.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>

            <h6 className="text-center mt-4">Filter By Price</h6>
            <div className="d-flex flex-column">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
            <div className="d-flex flex-column">
              <button
                className="btn btn-danger"
                onClick={() => window.location.reload()}
              >
                Reset Filter
              </button>
            </div>
          </div>
          <div className="col-sm-10">
            <h1 className="text-center">All Products</h1>
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div className="card m-2" style={{ width: "18rem" }}>
                  <img
                    className="card-image-top m-2 rounded-1"
                    style={{ maxHeight: "90px" }}
                    src={`/api/product/get-photo/${p._id}`}
                    alt={p.name}
                  />
                  <div className="card-body">
                    <h5 className="card-title">Name: {p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 50)}...
                    </p>
                    <h6 className="card-text">
                      Price:
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h6>
                    <Link to={`/product/${p.slug}`} className="btn btn-primary">
                      See More
                    </Link>
                    <button
                      className="btn btn-secondary ms-1"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added to cart");
                      }}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="m-2 p-3">
              {products && products.length < total && (
                <button
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading ..." : "Loadmore"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
