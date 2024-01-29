import React from "react";
import "../../assets/css/ProjectDetail.css";

function ProjectDetailForm({ projectDetails }) {
  return (
    <>
            <table className="table-projects">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Project</th>
                    <th>Region</th>
                    <th>Build</th>
                    <th>Priority</th>
                    <th>Type</th>
                    <th>P-Status</th>
                    <th>Ex-Status</th>
                </tr>
                </thead>
                    <tbody>
                    <tr>
                        <td data-label="id">{projectDetails.id}</td>
                        <td data-label="name">{projectDetails.project_name}</td>
                        <td data-label="region">{projectDetails.region ? projectDetails.region.name:"No Region"}</td>
                        <td data-label="built">{projectDetails.built}</td>
                        <td data-label="teg">{projectDetails.project_teg}</td>
                        <td data-label="teg">{projectDetails.project_type}</td>
                        <td className={projectDetails.project_status.split(' ').join('-')} data-label="p-status"><div>{projectDetails.project_status}</div></td>
                        <td className={projectDetails.exterior_status.split(' ').join('-')} data-label="e-status"><div>{projectDetails.exterior_status}</div></td>
                    </tr>
                    </tbody>
                </table>
                <table className="table-projects">
                <thead>
                    
                <tr>
                    <th>Team Lead</th>
                    <th>Clickup</th>
                    <th>Cet3</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td data-label="team_lead">{projectDetails.project_teamlead_user ? projectDetails.project_teamlead_user.first_name + " " + projectDetails.project_teamlead_user.last_name:null}</td>
                    <td data-label="link_clickup"><a className="telegram_link" target="_blank" rel="noreferrer" href={projectDetails.link_clickup}>app.clickup.com</a></td>
                    <td data-label="link_cet3"><a className="telegram_link" target="_blank" rel="noreferrer" href={projectDetails.link_cet3}>cp.axdev.cloud</a></td>
                </tr>
                </tbody>
            </table>
            </>
  );
}

export { ProjectDetailForm };

