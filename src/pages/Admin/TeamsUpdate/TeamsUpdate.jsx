import React from 'react';
import { Link } from 'react-router-dom';

function TeamsUpdate({ successMessage, formData, handleInputChange, handleSaveClick, teamsUser, teamsList }) {
    return (
      <div className='container'>
        {successMessage && (
          <div className="success-message">
            {successMessage}
          </div>
        )}
        <h1 className='team-employee' style={{background:"black"}}> Team: {teamsList.name}
        </h1>


        {teamsList.employees?.length > 0 && (
  <div className='team-employee'>
    <h1>Employees:</h1>
    {teamsList.employees.map((employee) => (
      <h1  key={employee.id} value={employee.id}>
        {employee.first_name}
        <button onClick={() => handleSaveClick(employee.id)}>
    delete
</button>

      </h1>
    ))}
  </div>
)}



        <form className="update-project">
          {/* <div className="block">
            <InputField label="Name" name="name" value={formData.name} onChange={handleInputChange} />
          </div> */}
          <div className="block">
            <div>
              <label className="label-project-s">Employee</label>
              <select
                className="select-project-s"
                name="employees"
                value={formData.employees}
                onChange={handleInputChange}
              >
                <option value="" hidden>Выберите</option>
                {teamsUser.employee && teamsUser.employee.map((userEmployee) => (
                  <option key={userEmployee.id} value={userEmployee.id}>
                    {userEmployee.first_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </form>
        <div>
          <button className="btn-create-team" onClick={handleSaveClick}>
            Save
          </button>
        </div>
      </div>
    );
  }
  
  
  export default TeamsUpdate;
  