import React from "react";
import { Select } from "antd";

const { Option } = Select;

const ProductUpdateForm = ({
  handleCategoryChange,
  handleChange,
  handleSubmit,
  setValues,
  subOptions,
  arrayOfSubs,
  setArrayOfSubs,
  categories,
  values,
}) => {
  // destructure
  const {
    title,
    description,
    price,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

  return (
    <form onSubmit={handleSubmit}>
      <div className='form-group'>
        <label>Title</label>
        <input
          type='text'
          name='title'
          className='form-control'
          value={title}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <label>Description</label>
        <input
          type='text'
          name='description'
          className='form-control'
          value={description}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <label>Price</label>
        <input
          type='number'
          name='price'
          className='form-control'
          value={price}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <label>Shipping</label>
        <select
          // reason we are doing ternary operator at `value`,
          // because it default to `Yes` which we want to prevent that
          value={shipping === "Yes" ? "Yes" : "No"}
          name='shipping'
          className='form-control'
          onChange={handleChange}
        >
          <option value='No'>No</option>
          <option value='Yes'>Yes</option>
        </select>
      </div>

      <div className='form-group'>
        <label>Quantity</label>
        <input
          type='number'
          name='quantity'
          className='form-control'
          value={quantity}
          onChange={handleChange}
        />
      </div>

      <div className='form-group'>
        <label>Color</label>
        {/* value=colors will bring or prepopulate the default value */}
        <select
          value={colors}
          name='color'
          className='form-control'
          onChange={handleChange}
        >
          {colors.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className='form-group'>
        <label>Brand</label>
        <select
          value={brand}
          name='brand'
          className='form-control'
          onChange={handleChange}
        >
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div className='form-group'>
        <label>Category</label>
        {/* onChange 는 option 에서 내가 고른 value 값을 setCategory 에 지정하여 category 값을 업데이트한다 */}
        <select
          name='category'
          className='form-control'
          onChange={handleCategoryChange}
        >
          <option>{category ? category.name : "Please select"}</option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div>
        <label>Sub Categories</label>
        <Select
          mode='multiple' // mode 는 어떤 유형의 select 를 사용하는지 설정해준다
          style={{ width: "100%" }}
          placeholder='Please select'
          value={arrayOfSubs} // whenever we select one of the options, it automatically added into subs as 'value' from each option
          onChange={(value) => setArrayOfSubs(value)} // Ant Design use 'value' instead 'e', whenever we picked option, that value from option would automatically added (ONLY mode='multiple' add automatically to value) into subs
          // so if mode == multiple, then the `value` will automatically create array and add whenever we click the subs into 'value'
        >
          {subOptions.length &&
            subOptions.map((s) => (
              <Option key={s._id} value={s._id}>
                {s.name}
              </Option>
            ))}
        </Select>
      </div>
      <br />
      <button className='btn btn-outline-info'>Save</button>
    </form>
  );
};

export default ProductUpdateForm;
