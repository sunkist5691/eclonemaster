import React from "react";

const CategoryForm = ({ name, setName, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <div className='form-group'>
      <label>name</label>
      <input
        className='form-control'
        onChange={(e) => setName(e.target.value)}
        value={name}
        autoFocus
        required // admin cannot submit with empty form
      />
      <br />
      <button className='btn btn-outlined-primary'>Save</button>
    </div>
  </form>
);

export default CategoryForm;
