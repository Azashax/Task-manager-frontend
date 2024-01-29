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
    BuiltStatusOptions, TegOptions, TypeOptions, handleSaveClick, region}) {
    return (
        <div>
        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}
        <h1><Link to={'/projects-list/'}>Назад</Link></h1>
        <form className="update-project">
          <div className="block">
            <InputField label="Project Name" name="project_name" value={formData.project_name} onChange={handleInputChange} />
            <div>
              <label className="label-project-s">Built</label>
              <select
                className="select-project-s"
                name="built"
                value={formData.built}
                onChange={handleInputChange}
              >
                {BuiltStatusOptions.map((status, index) => (
                  <option key={index} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            
          </div>
          <div className="block">
            <div>
              <label className="label-project-s">Teg</label>
              <select
                className="select-project-s"
                name="project_teg"
                value={formData.project_teg}
                onChange={handleInputChange}
              >
                {TegOptions.map((status, index) => (
                  <option key={index} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-project-s">Type</label>
              <select
                className="select-project-s"
                name="project_type"
                value={formData.project_type}
                onChange={handleInputChange}
              >
                {TypeOptions.map((status, index) => (
                  <option key={index} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-project-s">Region</label>
              <select
                className="select-project-s"
                name="region"
                value={formData.region}
                onChange={handleInputChange}
              >
                <option value="" hidden>Выберите</option>
                {region.map((reg) => (
                  <option key={reg.id} value={reg.id}>
                    {reg.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="block">
            <InputField label="Link clickup" name="link_clickup" value={formData.link_clickup} onChange={handleInputChange} />
            <InputField label="Link cet3" name="link_cet3" value={formData.link_cet3} onChange={handleInputChange} />
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
