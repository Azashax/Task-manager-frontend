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

function TeamsCreate({ successMessage, formData, handleInputChange, handleSaveClick, teamsUser }) {
    return (
      <div>
        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}
        <h1>
          <Link to={'/teams-list/'}>Назад</Link>
        </h1>
        <form className="update-project">
          <div className="block">
            <InputField label="Name" name="name" value={formData.name} onChange={handleInputChange} />
          </div>
          <div className="block">
            <div>
              <label className="label-project-s">Teamlead</label>
              <select
                className="select-project-s"
                name="teamlead"
                // value={formData.teamlead.id}
                onChange={handleInputChange}
              >
                <option value="" hidden>Выберите</option>
                {teamsUser.teamlead && teamsUser.teamlead.map((userTeamLead) => (
                  <option key={userTeamLead.id} value={userTeamLead.id}>
                    {userTeamLead.first_name}
                  </option>
                ))}
              </select>
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
  