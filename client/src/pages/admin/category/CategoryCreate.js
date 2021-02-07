import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const CategoryCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState(""); // must be more than three characters
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        console.log("Created Category succesfully: ", res);
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadCategories();
      })
      .catch((err) => {
        console.log("created category ERROR: ", err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

  const handleRemove = async (slug) => {
    // window.confirm 에 확인을 누르면 true 값을 반환
    if (window.confirm("Delete")) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          console.log(res);
          setLoading(false);
          toast.success(`${res.data.name} deleted`);
          loadCategories();
        })
        .catch((err) => {
          console.log(err);
          //  if (err.response.status === 400) {
          //    setLoading(false);
          //    toast.error(err.response.data);
          //  }
        });
    }
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col'>
          {loading ? (
            <h4 className='text-danger'>Loading...</h4>
          ) : (
            <h4>Create Category</h4>
          )}
          <CategoryForm
            name={name}
            setName={setName}
            handleSubmit={handleSubmit}
          />
          <LocalSearch setKeyword={setKeyword} keyword={keyword} />

          {categories.filter(searched(keyword)).map((c) => (
            <div className='alert alert-secondary' key={c._id}>
              {c.name}
              <span
                onClick={() => handleRemove(c.slug)}
                className='btn btn-sm float-right'
              >
                <DeleteOutlined className='text-danger' />
              </span>
              <Link to={`/admin/category/${c.slug}`}>
                <span className='btn btn-sm float-right'>
                  <EditOutlined className='text-warning' />
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
