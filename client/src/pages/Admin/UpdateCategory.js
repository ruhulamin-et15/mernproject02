import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCategory = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const {id} = useParams();

  //get single category by id
  const getCategory = async () => {
    try {
      const { data } = await axios.get(
        `/api/category/get-category/${id}`
      );
      setName(data.category.name);
    } catch (error) {
      console.log(error);
    }
  };

  //lifecycle method
  useEffect(() => {
    getCategory();
    //eslint-disable-next-line
  }, []);

  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/category/update-category/${id}`,{ name}
      );
      if (data?.success) {
        toast.success(`${name} category updated successfully`);
        navigate("/manage-category");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something weng wrong updating category");
    }
  };

  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-sm-4">
            <AdminMenu />
          </div>
          <div className="col-sm-8">
            <div className="container">
              <h2>Category Update</h2>
              <form onSubmit={handleUpdate}>
                <div className="mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Update Category Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary form-control mb-3"
                >
                  Update Category
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateCategory;
