import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import { Link } from "react-router-dom";

function ProjectsStockTeamLead() {
  const [projects, setProjects] = useState([]);
  const { authTokens, logoutUser } = useContext(AuthContext);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    GetProjectsStockTeamLead();
  }, [searchName]);
  const GetProjectsStockTeamLead = async () => {
    const searchParams = new URLSearchParams();
    if (searchName) {
      searchParams.append("project-name", searchName);
    }

    const queryString = searchParams.toString();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/api/projects-list/stock/?${queryString}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + String(authTokens.access),
          },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        setProjects(data);
      } else if (response.status === 401) {
        logoutUser();
      }
    } catch (error) {
      console.error("Error fetching project task:", error);
    }
  };

  useEffect(() => {
    GetProjectsStockTeamLead();
  }, []);

  return (
    <div className="container">
      {/* <form className="search">
        <label className="label-project-s">Project Name</label>
        <input
          className="input-project-s"
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </form> */}
      <div className="div-search">

<form className="form-search">
  <label className="div-search-label" >Project Name</label>
  <input
    className="div-search-input"
    type="text"
    value={searchName}
    onChange={(e) => setSearchName(e.target.value)} // Использование обработчика изменения
  />
</form>
</div>
      <table className="table-projects">
        <thead>
          <tr>
            <th className="project_id">Id</th>
            <th className="project_name">Project</th>
            <th className="project_region">Region</th>
            <th className="project_build">Build</th>
            <th className="project_teg">Teg</th>
            <th className="project_status">Project Status</th>
            <th className="project_ex_status">Exterior Status</th>
          </tr>
        </thead>
        {projects.map((project) => (
          <tbody key={project.id}>
            <tr>
              <td data-label="id">{project.id}</td>
              <td data-label="name">
                <Link to={`/project/${project.id}`} className="name-projects">
                  {project.project_name}
                </Link>
              </td>
              <td data-label="region">
                {project.region ? project.region.name : "No Region"}{" "}
                {/* Проверка на null */}
              </td>
              <td data-label="built">{project.built}</td>
              <td data-label="teg">{project.project_teg}</td>
              <td data-label="p-status"><p className={`${project.project_status.split(' ').join('-')}`}> <div>{project.project_status}</div></p></td>
              <td data-label="e-status"><p className={`${project.exterior_status.split(' ').join('-')}`}> <div>{project.exterior_status}</div></p></td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default ProjectsStockTeamLead;
