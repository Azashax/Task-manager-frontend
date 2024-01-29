import React, { useState, useEffect, useContext, useCallback } from "react";
import AuthContext from "../../../context/AuthContext";
import ProjectTable from "./ProjectAnalyzeHtml";
import { Link } from "react-router-dom";
import "./ProjectAnalyze.css"

function Projects() {
  const { authTokens, logoutUser } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [searchName, setSearchName] = useState("");

  // Перенесено в useEffect
  const GetProjects = useCallback(async () => {
    try {
      const searchParams = new URLSearchParams();
      if (searchName) {
        searchParams.append("project-name", searchName);
      }

      const queryString = searchParams.toString();

      const response = await fetch(
        `${process.env.REACT_APP_URL}/api/projects-list/?${queryString}`,
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
        setProjects(data);
      } else if (response.status === 401) {
        logoutUser();
      }else {
        console.error(
          "Error fetching projects:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }, [authTokens.access, logoutUser, searchName]);

  useEffect(() => {
    GetProjects();
  }, [GetProjects]);

  const handleSearchChange = (e) => {
    setSearchName(e.target.value);
  };

  return (
    <div className="container">
      <div className="div-search">

      <form className="form-search">
      <label className="div-search-label" >Project Name</label>
        <input
          className="div-search-input"
          type="text"
          value={searchName}
          onChange={handleSearchChange} // Использование обработчика изменения
        />
      </form>

      <div className="div-btn-pr">
        
          <div>
          <label className="div-search-label" ><br></br></label>
            <Link className="btn-cre-reg complete-btn p" to={`/projects-list/create`}>Project create</Link>
          </div>
          <div>
          <label className="div-search-label" ><br></br></label>
            <Link className="btn-cre-pr complete-btn p" to={`/region`}>Region create</Link>
          </div>
      </div>
      </div>
      <ProjectTable projects={projects} />
    </div>
  );
}

export default Projects;
