import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import { createSub, removeSub, getSubs } from "../../../functions/sub";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const SubCreate = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState(""); // must be more than three characters
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subs, setSubs] = useState([]);

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSubs = () => getSubs().then((s) => setSubs(s.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // parent: category 는 subCategory model schema 에 들어있는 parent 에 category ObjectId 를 보낸다
    createSub({ name, parent: category }, user.token)
      .then((res) => {
        console.log("Created Category succesfully: ", res);
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is created`);
        loadSubs();
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
      removeSub(slug, user.token)
        .then((res) => {
          console.log(res);
          setLoading(false);
          toast.success(`${res.data.name} deleted`);
          loadSubs();
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
            <h4>Create Sub category</h4>
          )}

          <div className='form-group'>
            <label>Parent category</label>
            {/* onChange 는 option 에서 내가 고른 value 값을 setCategory 에 지정하여 category 값을 업데이트한다 */}
            <select
              name='category'
              className='form-control'
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Please Select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          {/* 스크린에 category 값이 무엇으로 업데이트 되는지 확인하기 위해 잠시 쓰는 방법 */}
          {/* {JSON.stringify(category)} */}

          <CategoryForm
            name={name}
            setName={setName}
            handleSubmit={handleSubmit}
          />
          <LocalSearch setKeyword={setKeyword} keyword={keyword} />

          {subs.filter(searched(keyword)).map((s) => (
            <div className='alert alert-secondary' key={s._id}>
              {s.name}
              <span
                onClick={() => handleRemove(s.slug)}
                className='btn btn-sm float-right'
              >
                <DeleteOutlined className='text-danger' />
              </span>
              <Link to={`/admin/sub/${s.slug}`}>
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

export default SubCreate;
