import React from "react";
import Layout from "./../components/layout/Layout";
import { useSearch } from "../context/search";
import { Link } from "react-router-dom";

const Search = () => {
  const [values, setValues] = useSearch([]);
  return (
    <Layout title={"Search results"}>
      <div>
        <div>
          <h1 className="text-center">Search Results</h1>
          <h6 className="text-center">
            {values?.results.length < 1
              ? "No products found"
              : `Found: ${values?.results.length} Results`}
          </h6>
          <div className="d-flex flex-wrap mt-4">
            {values?.results.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  className="card-image-top m-2 rounded-1"
                  style={{ maxHeight: "90px" }}
                  src={`/api/product/get-photo/${p._id}`}
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <Link to={`/product/${p.slug}`} className="btn btn-primary">
                    See More
                  </Link>
                  <button className="btn btn-secondary ms-1">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
