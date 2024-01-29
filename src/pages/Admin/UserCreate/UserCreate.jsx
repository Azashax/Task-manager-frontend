import React from 'react';
import { Link } from 'react-router-dom';

function InputField({ label, name, value, onChange }) {
  return (
    <div>
      <label className="label-project-s">{label}</label>
      <input
        className="input-project-s"
        type="text"
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

function ProjectsCreateX({ successMessage, formData, handleInputChange, 
     handleSaveClick}) {
    return (
        <div>
        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}
                <div className="div-title">
                <h1 className="title">Create User</h1>
                </div>
        {/* <h1><Link to={'/users-list/'}>Назад</Link></h1> */}
        <form className="update-project">
          <div className="block">
            <InputField label="Username" name="username" value={formData.username} onChange={handleInputChange} />
          </div>
          <div className="block">
            <InputField label="Password" name="password" value={formData.password} onChange={handleInputChange} />
          </div>
        </form>
        <div className="update-project-div-b">
          <button className="update-project-button" onClick={handleSaveClick}>
            Save
          </button>
        </div>
      </div>
    );
  }
  
  export default ProjectsCreateX;
