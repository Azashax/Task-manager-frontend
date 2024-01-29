import React from "react";
import { Link } from "react-router-dom";
import "../../../assets/css/DashboardAll.css"


function ProjectTableRow({ project }) {
  return (
    <tr key={project.id}>
      <td data-label="name">
        <Link to={`/project/${project.id}`} className="name-projects">
          {project.project_name}
        </Link>
      </td>

      <td data-label="p-status" className={project.project_status.split(' ').join('-')}><div>{project.project_status}</div></td>
      <td data-label="e-status" className={project.exterior_status.split(' ').join('-')}><div>{project.exterior_status}</div></td>
      
        <td data-label="assemble" className={project.task_assemble ? project.task_assemble.task_status.split(' ').join('-') : 'open'}>
            <div>{project.task_assemble ? project.task_assemble.task_status : 'none'}</div>
        </td>

      <td data-label="without" className={project.task_without.task_status.split(' ').join('-')}><div>{project.task_without.task_status}</div></td>
      <td data-label="with" className={project.task_with.task_status.split(' ').join('-')}><div>{project.task_with.task_status}</div></td>
      <td data-label="gltf" className={project.task_gltf.task_status.split(' ').join('-')}><div>{project.task_gltf.task_status}</div></td>
      <td data-label="upload" className={project.task_upload.task_status.split(' ').join('-')}><div>{project.task_upload.task_status}</div></td>

    </tr>

  );
}



function ProjectTable({ projects , projectsStatus}) {
  if (!Array.isArray(projects)) {
    return <div>Нет данных о проектах</div>;
  }
  return (
    <table className="table-dashboard">
      <thead className="fixed_project">
        <tr>

        <th className="pr_name">
    {/* Project */}
    <div class="dropdown">
        <button class="dropbtn">Project</button>
        <div class="dropdown-content">
            <a href="#">
             count {projects.length}</a>
        </div>
    </div>
</th>

          <th className="pr_status">
          <div class="dropdown">
        <button class="dropbtn">Project Status</button>
        <div class="dropdown-content">
            <a href="#" className="open-status"><span>open</span> <p>{projectsStatus.project_status_count.open}</p></a>
            <a href="#"className="in-progress-status"><span>in progress</span> <p>{projectsStatus.project_status_count.in_progress}</p></a>
            <a href="#"className="checked-status"><span>checked</span> <p>{projectsStatus.project_status_count.checked}</p></a>

        </div>
    </div></th>

          <th className="pr_ex_status">
          <div class="dropdown">
        <button class="dropbtn">Exterior Status</button>
        <div class="dropdown-content">
            <a href="#" className="open-status"><span>open</span> <p>{projectsStatus.exterior_status_count.open}</p></a>
            <a href="#"className="in-progress-status"><span>in progress</span> <p>{projectsStatus.exterior_status_count.in_progress}</p></a>
            <a href="#"className="checked-status"><span>checked</span> <p>{projectsStatus.exterior_status_count.checked}</p></a>

        </div>
    </div></th>

          <th className="project_assemble">
          <div class="dropdown">
        <button class="dropbtn">assemble</button>
        <div class="dropdown-content">
            <a href="#" className="open-status"><span>open</span> <p>{projectsStatus.task_assemble_status_counts.open}</p></a>
            <a href="#"className="waiting-status"><span>waiting</span> <p>{projectsStatus.task_assemble_status_counts.waiting}</p></a>
            <a href="#"className="in-progress-status"><span>in progress</span> <p>{projectsStatus.task_assemble_status_counts.in_progress}</p></a>
            <a href="#"className="complete-status"><span>complete</span> <p>{projectsStatus.task_assemble_status_counts.complete}</p></a>
            <a href="#"className="correcting-status"><span>correcting</span> <p>{projectsStatus.task_assemble_status_counts.correcting}</p></a>
            <a href="#"className="checked-status"><span>checked</span> <p>{projectsStatus.task_assemble_status_counts.checked}</p></a>
        </div>
    </div></th>

          <th className="project_with">
          <div class="dropdown">
        <button class="dropbtn">without</button>
        <div class="dropdown-content">
        <a href="#"  className="open-status"><span>open</span> <p>{projectsStatus.task_without_status_counts.open}</p></a>
            <a href="#" className="waiting-status"><span>waiting</span> <p>{projectsStatus.task_without_status_counts.waiting}</p></a>
            <a href="#" className="in-progress-status"><span>in progress</span> <p>{projectsStatus.task_without_status_counts.in_progress}</p></a>
            <a href="#" className="complete-status"><span>complete</span> <p>{projectsStatus.task_without_status_counts.complete}</p></a>
            <a href="#" className="correcting-status"><span>correcting</span> <p>{projectsStatus.task_without_status_counts.correcting}</p></a>
            <a href="#" className="checked-status"><span>checked</span> <p>{projectsStatus.task_without_status_counts.checked}</p></a>
        </div>
    </div></th>

          <th className="project_without">
          <div class="dropdown">
        <button class="dropbtn">with</button>
        <div class="dropdown-content">
        <a href="#"  className="open-status"><span>open</span> <p>{projectsStatus.task_with_status_counts.open}</p></a>
            <a href="#" className="waiting-status"><span>waiting</span> <p>{projectsStatus.task_with_status_counts.waiting}</p></a>
            <a href="#" className="in-progress-status"><span>in progress</span> <p>{projectsStatus.task_with_status_counts.in_progress}</p></a>
            <a href="#" className="complete-status"><span>complete</span> <p>{projectsStatus.task_with_status_counts.complete}</p></a>
            <a href="#" className="correcting-status"><span>correcting</span> <p>{projectsStatus.task_with_status_counts.correcting}</p></a>
            <a href="#" className="checked-status"><span>checked</span> <p>{projectsStatus.task_with_status_counts.checked}</p></a>
        </div>
    </div></th>

          <th className="project_gltf">
          <div class="dropdown">
        <button class="dropbtn">gltf</button>
        <div class="dropdown-content">
        <a href="#"  className="open-status"><span>open</span> <p>{projectsStatus.task_gltf_status_counts.open}</p></a>
            <a href="#" className="waiting-status"><span>waiting</span> <p>{projectsStatus.task_gltf_status_counts.waiting}</p></a>
            <a href="#" className="in-progress-status"><span>in progress</span> <p>{projectsStatus.task_gltf_status_counts.in_progress}</p></a>
            <a href="#" className="complete-status"><span>complete</span> <p>{projectsStatus.task_gltf_status_counts.complete}</p></a>
            <a href="#" className="correcting-status"><span>correcting</span> <p>{projectsStatus.task_gltf_status_counts.correcting}</p></a>
            <a href="#" className="checked-status"><span>checked</span> <p>{projectsStatus.task_gltf_status_counts.checked}</p></a>
        </div>
    </div></th>

          <th className="project_upload">
          <div class="dropdown">
        <button class="dropbtn">upload</button>
        <div class="dropdown-content">
        <a href="#"  className="open-status"><span>open</span> <p>{projectsStatus.task_upload_status_counts.open}</p></a>
            <a href="#" className="waiting-status"><span>waiting</span> <p>{projectsStatus.task_upload_status_counts.waiting}</p></a>
            <a href="#" className="in-progress-status"><span>in progress</span> <p>{projectsStatus.task_upload_status_counts.in_progress}</p></a>
            <a href="#" className="complete-status"><span>complete</span> <p>{projectsStatus.task_upload_status_counts.complete}</p></a>
            <a href="#" className="correcting-status"><span>correcting</span> <p>{projectsStatus.task_upload_status_counts.correcting}</p></a>
            <a href="#" className="checked-status"><span>checked</span> <p>{projectsStatus.task_upload_status_counts.checked}</p></a>
        </div>
    </div></th>

        </tr>
      </thead>
      <tbody className="tbody-dashboard">

        {projects.map((project) => (
          <ProjectTableRow key={project.id} project={project} />
        ))}

      </tbody>
    </table>
  );
}

export default ProjectTable;
