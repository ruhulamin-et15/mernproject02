import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const { id } = useParams();

  //handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in input form");
    }
  };

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

  useEffect(() => {
    getAllCategory();
  }, []);

  //delete category by id
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(`/api/category/delete-category/${pId}`, {name} );
      if(data.success){
        toast.success(`this category is deleted`);
        getAllCategory();
      }
    } catch (error) {
      console.log(error)
      toast.error("something went wrong when deleted")
    }
  }

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-sm-4">
            <AdminMenu />
          </div>
          <div className="col-sm-8">
            <h2>Manage Category</h2>
            <div className="p-3">
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter New Category"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary form-control mb-3"
                >
                  Add Category
                </button>
              </form>
            </div>
            <div className="w-90">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <Link
                            className="btn btn-success px-4"
                            to={`/manage-category/update-category/${c._id}`}
                          >
                            Edit
                          </Link>

                          <button
                            onClick={(e) => handleDelete(c._id)}
                            className="btn btn-danger mx-1"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ManageCategory;
