import React from "react";
import "../../assets/css/ProjectDetail.css";

function ProjectDetailTask({ user, projectDetails, handleSaveClick, textareaData, handleTextareaChange }) {
  return (
    <>
    <div className="scrolled">
            <table className="table-task">
                <thead>
                <tr>
                    <th></th>
                    { projectDetails.project_type === "Tower" ? (
                    <th>Assamble</th>
                    ):null
                }
                    <th>Without</th>
                    <th>With</th>
                    <th>Gltf</th>
                    <th>Upload</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td data-label="team_lead">Status</td>
                    { projectDetails.project_type === "Tower" ? (
                    <td  className={projectDetails.task_assemble.task_status.split(' ').join('-')} data-label="link_clickup"><div>{projectDetails.task_assemble.task_status}</div></td>
                    ):null
                }
                    <td className={projectDetails.task_without.task_status.split(' ').join('-')} data-label="link_cet3"><div>{projectDetails.task_without.task_status}</div></td>
                    <td className={projectDetails.task_with.task_status.split(' ').join('-')} data-label="team_lead"><div>{projectDetails.task_with.task_status}</div></td>
                    <td className={projectDetails.task_gltf.task_status.split(' ').join('-')} data-label="link_clickup"><div>{projectDetails.task_gltf.task_status}</div></td>
                    <td className={projectDetails.task_upload.task_status.split(' ').join('-')} data-label="link_cet3"><div>{projectDetails.task_upload.task_status}</div></td>
                </tr>
                <tr>
                    <td data-label="team_lead">Time</td>
                    { projectDetails.project_type === "Tower" ? (
                    <td data-label="link_clickup">{projectDetails.task_assemble.time_point}</td>
                    ):null
                }
                    <td data-label="link_cet3">{projectDetails.task_without.time_point}</td>
                    <td data-label="team_lead">{projectDetails.task_with.time_point}</td>
                    <td data-label="link_clickup">{projectDetails.task_gltf.time_point}</td>
                    <td data-label="link_cet3">{projectDetails.task_upload.time_point}</td>
                </tr>
                <tr>
                    <td data-label="team_lead">point</td>
                    { projectDetails.project_type === "Tower" ? (
                    <td data-label="link_clickup">{projectDetails.task_assemble.point}</td>
                    ):null
                }
                    <td data-label="link_cet3">{projectDetails.task_without.point}</td>
                    <td data-label="team_lead">{projectDetails.task_with.point}</td>
                    <td data-label="link_clickup">{projectDetails.task_gltf.point}</td>
                    <td data-label="link_cet3">{projectDetails.task_upload.point}</td>
                </tr>
                <tr>
                    <td data-label="team_lead">User</td>
                    { projectDetails.project_type === "Tower" ? (
                    <td data-label="link_clickup">{projectDetails.task_assemble.task_employee_user ?
                        (projectDetails.task_assemble.task_employee_user.first_name +" "+ projectDetails.task_assemble.task_employee_user.last_name):null}</td>
                        ):null
                    }
                    <td data-label="link_cet3">{projectDetails.task_without.task_employee_user ?
                        (projectDetails.task_without.task_employee_user.first_name +" "+ projectDetails.task_without.task_employee_user.last_name):null}</td>
                    <td data-label="team_lead">{projectDetails.task_with.task_employee_user ?
                        (projectDetails.task_with.task_employee_user.first_name +" "+ projectDetails.task_with.task_employee_user.last_name):null}</td>
                    <td data-label="link_clickup">{projectDetails.task_gltf.task_employee_user ?
                        (projectDetails.task_gltf.task_employee_user.first_name +" "+ projectDetails.task_gltf.task_employee_user.last_name):null}</td>
                    <td data-label="link_cet3">{projectDetails.task_upload.task_employee_user ?
                        (projectDetails.task_upload.task_employee_user.first_name +" "+ projectDetails.task_upload.task_employee_user.last_name):null}</td>
                </tr>
                <tr className="">

                    <td data-label="team_lead">Desk</td>
                    { projectDetails.project_type === "Tower" ? (
                    <td data-label="link_cet3"><div class="scrollable-text">{projectDetails.task_assemble.description}</div></td>
                    ):null
                }
                    <td data-label="link_cet3"><div class="scrollable-text">{projectDetails.task_without.description}</div></td>
                    <td data-label="team_lead"><div class="scrollable-text">{projectDetails.task_with.description}</div></td>
                    <td data-label="link_clickup"><div class="scrollable-text">{projectDetails.task_gltf.description}</div></td>
                    <td data-label="link_cet3"><div class="scrollable-text">{projectDetails.task_upload.description}</div></td>
                </tr>
                { user.role === "Teamlead"?
                    <tr>
                        <td data-label="desk-table">desk</td>

                        { projectDetails.project_type === "Tower" ? (

                        <td key={projectDetails.task_assemble.id}  data-label="table-input-desk">
                                    <textarea className="table-input-desk-t" id="story"
                                              name="desk-assemle" rows="5" cols="33"
                                              value={textareaData[projectDetails.task_assemble.id]}
                                              onChange={(e) => handleTextareaChange(projectDetails.task_assemble.id, e.target.value)}>
                                    </textarea><br/>
                            <button className="button-deck" onClick={()=>handleSaveClick(projectDetails.task_assemble.id)}>save</button></td>
  ):null
                        }
                        <td key={projectDetails.task_without.id}  data-label="table-input-desk">
                                    <textarea className="table-input-desk-t" id="story"
                                              name="desk-without" rows="5" cols="33"
                                              value={textareaData[projectDetails.task_without.id]}
                                              onChange={(e) => handleTextareaChange(projectDetails.task_without.id, e.target.value)}>
                                    </textarea><br/>
                            <button className="button-deck" onClick={()=>handleSaveClick(projectDetails.task_without.id)}>save</button></td>

                        <td key={projectDetails.task_with.id}  data-label="table-input-desk">
                                    <textarea className="table-input-desk-t" id="story" name="desk-with" rows="5" cols="33"
                                              value={textareaData[projectDetails.task_with.id]}
                                              onChange={(e) => handleTextareaChange(projectDetails.task_with.id, e.target.value)}>

                                    </textarea><br/>
                            <button className="button-deck" onClick={()=>handleSaveClick(projectDetails.task_with.id)}>save</button></td>

                        <td key={projectDetails.task_gltf.id}  data-label="table-input-desk">
                                    <textarea className="table-input-desk-t" id="story" name="desk-gltf" rows="5" cols="33"
                                              value={textareaData[projectDetails.task_gltf.id]}
                                              onChange={(e) => handleTextareaChange(projectDetails.task_gltf.id, e.target.value)}>

                                    </textarea><br/>
                            <button className="button-deck" onClick={()=>handleSaveClick(projectDetails.task_gltf.id)}>save</button></td>

                        <td key={projectDetails.task_upload.id}  data-label="table-input-desk">
                                    <textarea className="table-input-desk-t" id="story" name="desk-upload" rows="5" cols="33"
                                              value={textareaData[projectDetails.task_upload.id]}
                                              onChange={(e) => handleTextareaChange(projectDetails.task_upload.id, e.target.value)}>

                                    </textarea><br/>
                            <button className="button-deck" onClick={()=>handleSaveClick(projectDetails.task_upload.id)}>save</button>
                        </td>

                    </tr>:null
                }
                </tbody>
            </table>
            </div>
            </>
  );
}

export {ProjectDetailTask} ;

