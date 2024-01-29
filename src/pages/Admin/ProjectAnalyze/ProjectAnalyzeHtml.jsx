import React from "react";
import { Link } from "react-router-dom";

function ProjectTableRow({ project }) {
  return (
    <tr className="p-odd"  key={project.id}>
      <td data-label="id">{project.id}</td>
      <td data-label="name">
        <Link to={`/project/${project.id}`} className="name-projects">
          {project.project_name}
        </Link>
      </td>
      <td data-label="region">
        {project.region ? project.region.name : "No Region"}
      </td>
      <td data-label="built">{project.built}</td>
      <td data-label="teg">{project.project_teg}</td>
      <td data-label="p-status"><p className={`${project.project_status.split(' ').join('-')}`}> <div>{project.project_status}</div></p></td>
      <td data-label="e-status"><p className={`${project.exterior_status.split(' ').join('-')}`}> <div>{project.exterior_status}</div></p></td>
    </tr>
  );
}

function ProjectTable({ projects }) {
  return (
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
      <tbody>
        {projects.map((project) => (
          <ProjectTableRow key={project.id} project={project} />
        ))}
      </tbody>
    </table>
  );
}

export default ProjectTable;
