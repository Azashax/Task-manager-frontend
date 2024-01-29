import React from 'react';
import { Link } from 'react-router-dom';

function TeamsCreate({ successMessage, formData, handleSaveClick, handleInputChange }) {
    return (
      <div>
        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}
        <h1>
          <Link to={'/projects-list/'}>Назад</Link>
        </h1>
        <form className="update-project">
          <div className="block">
            <div>
            <label className="label-project-s">Name</label>
                <input
                    className="input-project-s"
                    type="text"
                    name="name"
                    value={formData.name} onChange={handleInputChange}
                />
            </div>
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
  
  
  export default TeamsCreate;
  