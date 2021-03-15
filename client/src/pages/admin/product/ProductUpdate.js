import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Toshiba", "Microsoft", "Lenovo", "Hewlett-Packard"],
  color: "",
  brand: "",
};

const ProductUpdate = ({ match }) => {
  // state
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));
  const [arrayOfSubs, setArrayOfSubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // router
  const { slug } = match.params;
  console.log(arrayOfSubs);
  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadProduct = () => {
    getProduct(slug).then((p) => {
      // 1 load single product
      setValues({ ...values, ...p.data[0] });

      // 2 load single product category subs
      getCategorySubs(p.data[0].category._id).then((res) => {
        setSubOptions(res.data); // on first load, show default subs
      });
      // 3 prepare array of sub ids to show as default sub values in Antd `select`
      let arr = [];
      p.data[0].subs.map((s) => {
        arr.push(s._id);
      });
      console.log("ARR", arr);
      setArrayOfSubs((prev) => arr); // required for ant design 'select' to work
      // `prev` is a previous value and that 'prev' will replaced with new 'arr' value
    });
  };

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleCategoryChange = (e) => {
    e.preventDefault(); // why do we need default at here?
    console.log("CLICKED CATEGORY: ", e.target.value);
    setValues({
      ...values,
      subs: [],
    });
    setSelectedCategory(e.target.value);
    // whenever you change category, the new sub-categories will fetched
    getCategorySubs(e.target.value).then((res) => {
      setSubOptions(res.data);
    });
    console.log("EXISTING CATEGORY values.category: ", values.category);

    // if user clicks back to the original category
    // show its sub categories in default
    if (values.category._id === e.target.value) {
      loadProduct();
    } else {
      setArrayOfSubs([]);
    }
  };
  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <div className='col-md-10'>
          <h4>Product update</h4>
          <ProductUpdateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleCategoryChange={handleCategoryChange}
            setValues={setValues}
            values={values}
            categories={categories}
            subOptions={subOptions}
            arrayOfSubs={arrayOfSubs}
            setArrayOfSubs={setArrayOfSubs}
            selectedCategory={selectedCategory}
          />
          <hr />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
