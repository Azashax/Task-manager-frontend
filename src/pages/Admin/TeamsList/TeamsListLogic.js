import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import "../../../assets/css/Teams.css"
function TeamsListLogic() {
  const [teamsList, setTeamsList] = useState([]);
  const { authTokens, logoutUser } = useContext(AuthContext);

  useEffect(() => {
    GetTeamsList();
  }, []);

  const GetTeamsList = async () => {
    try {

      const response = await fetch(
        `${process.env.REACT_APP_URL}/user/teams-list/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        setTeamsList(data);
      } else if (response.status === 401) {
        logoutUser();
      } else {
        console.error(
          "Error fetching projects:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  return (
    <div className="container">
      <Link to={`/teams-list/create`}><button className="btn-create-team">Create</button></Link>
<div className="teams">
  {teamsList.map((team) => (
    <div className="team" key={team.id}>
            <h2>"{team.name}" <br></br> {team.teamlead && team.teamlead.first_name}</h2>

        {team.employees && team.employees.length > 0 && (
          team.employees.map((employee) => (
            <div key={employee.id}>
              <p>{employee.first_name}</p>
              </div>
          ))
        )}
      <Link to={`/teams-list/${team.id}`}><button className="btn-create-team">Update</button></Link>
      </div>
  ))}
  </div>
</div>
);
}

export default TeamsListLogic;
