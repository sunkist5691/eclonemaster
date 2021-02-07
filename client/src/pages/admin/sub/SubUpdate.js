import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import { updateSub, getSub } from "../../../functions/sub";
import CategoryForm from "../../../components/forms/CategoryForm";

const SubUpdate = ({ history, match }) => {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState(""); // must be more than three characters
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState("");

  useEffect(() => {
    loadCategories();
    loadSub();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSub = () =>
    getSub(match.params.slug).then((s) => {
      setName(s.data.name);
      setParent(s.data.parent);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // parent: category 는 subCategory model schema 에 들어있는 parent 에 category ObjectId 를 보낸다
    updateSub(match.params.slug, { name, parent }, user.token)
      .then((res) => {
        console.log("Created Category succesfully: ", res);
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}" is updated`);
        history.push("/admin/sub");
      })
      .catch((err) => {
        console.log("created category ERROR: ", err);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };

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
            <h4>Update Sub category</h4>
          )}

          <div className='form-group'>
            <label>Parent category</label>
            {/* onChange 는 option 에서 내가 고른 value 값을 setCategory 에 지정하여 category 값을 업데이트한다 */}
            <select
              name='category'
              className='form-control'
              onChange={(e) => setParent(e.target.value)}
            >
              <option>Please Select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id} selected={c._id === parent}>
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
        </div>
      </div>
    </div>
  );
};

export default SubUpdate;
