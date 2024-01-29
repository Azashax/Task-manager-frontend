import React, { useState, useEffect, useContext } from 'react';
import AuthContext from "../../context/AuthContext";
// import "../../assets/css/ProjectDetail.css"
import {Link, useParams} from "react-router-dom";

// Reusable InputField component
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

const ProjectDetailUpdate = () => {
    const { id } = useParams();
    const [projectDetails, setProjectDetails] = useState(null);
    let { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        project_name: '',
        project_teamlead_user: '',
        project_type:'',
        built: '',
        link_clickup: '',
        link_cet3: '',
        exterior_status: '',
        project_status: '',
        project_teg: '',
    });


    const projectStatusOptions = ["open", "in progress", "complete", "checked", "correcting", "waiting"]; // Replace with actual project status options
    const exteriorStatusOptions = ["open", "in progress", "checked"];
    const teamLeadOptions = [null, user.user_id];
    const TegOptions = ["None", "Priority", "High priority"];// Replace with actual region options
    const BuiltStatusOptions = ["finished", "off plan"]; // Replace with actual project status
    const { authTokens, logoutUser } = useContext(AuthContext);

    useEffect(() => {
        async function fetchProjectDetails() {
            try {
                const response = await fetch(`${process.env.REACT_APP_URL}/api/project/update/${id}/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + String(authTokens.access)
                    }
                });

                const data = await response.json();
                if (response.status === 200) {
                    setProjectDetails(data);
                    console.log(data)
                    setFormData({
                        project_name: data.project_name,
                        // project_teamlead_user: data.project_teamlead_user,
                        project_type:data.project_type,
                        built: data.built,
                        link_clickup: data.link_clickup,
                        link_cet3: data.link_cet3,
                        exterior_status: data.exterior_status,
                        project_status: data.project_status,
                        project_teg: data.project_teg,
                    });
                } else if (response.status === 401) {
                    logoutUser();
                }
            } catch (error) {
                console.error("Error fetching project details:", error);
            }
        }

        fetchProjectDetails();

    }, [id, authTokens, logoutUser]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSaveClick = async () => {
        const ProjectUpdateConfirmed = window.confirm("Вы уверены, что хотите изменить данные проекта?");

        if (ProjectUpdateConfirmed) {
            try {
                const response = await fetch(`${process.env.REACT_APP_URL}/api/project/update/${id}/`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + String(authTokens.access),
                    },
                    body: JSON.stringify(formData),

                });
                if (response.status === 200) {
                    // Handle successful update
                    // You might want to show a success message here
                } else if (response.status === 401) {
                    logoutUser();
                }
            } catch (error) {
                console.error("Error updating project details:", error);
            }
        }
    };

    if (projectDetails === null) {
        return <div>Loading...</div>;
    }

    const isManager = user.role === 'Manager';
    const isAdmin = user.role === 'Admin';
    const isTeamlead = user.role === 'Teamlead';

    return (
        <div className='container'>
            <div className="div-title">
                <h1 className="title">Update Project</h1>
            </div>
            <form className="update-project">
            {isAdmin | isTeamlead && (
                                    <InputField
                                    label="Project Name"
                                    name="project_name"
                                    value={formData.project_name}
                                    onChange={handleInputChange}
                                />
            )}
            {isAdmin | isTeamlead && (
                <div>
                <label className="label-project-s">Built</label>
                <select
                    className="select-project-s"
                    name="built"
                    value={formData.built}
                    onChange={handleInputChange}
                >
                    {BuiltStatusOptions.map((status, index) => (
                        <option key={index} value={status}>{status}</option>
                    ))}
                </select>
            </div>
            )}
            {isAdmin | isTeamlead && (
                projectDetails.project_teamlead_user ? (
                    <InputField
                        label="Team Lead"
                        name="project_teamlead_user"
                        value={projectDetails.project_teamlead_user.first_name}
                        // onChange={handleInputChange}
                    />

                ) : (
                    <div>
                        <label className="label-project-s">Team Lead</label>
                        <select
                            className="select-project-s"
                            name="project_teamlead_user"
                            value={formData.project_teamlead_user}
                            onChange={handleInputChange}
                        >
                            {teamLeadOptions.map((status, index) => (
                                <option key={index} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>

                )
            )}
            {isAdmin | isTeamlead | isManager && (
                <div>
                <label className="label-project-s">Exterior Status</label>
                <select
                    className="select-project-s"
                    name="exterior_status"
                    value={formData.exterior_status}
                    onChange={handleInputChange}
                >
                    {exteriorStatusOptions.map((status, index) => (
                        <option key={index} value={status}>{status}</option>
                    ))}
                </select>
            </div>
            )}
            {isAdmin | isTeamlead && (
                                    <div>
                                    <label className="label-project-s">Project Status</label>
                                    <select
                                        className="select-project-s"
                                        name="project_status"
                                        value={formData.project_status}
                                        onChange={handleInputChange}
                                    >
                                        {projectStatusOptions.map((status, index) => (
                                            <option key={index} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </div>
            )}
            {isAdmin | isTeamlead && (
                
                <div>
                <label className="label-project-s">Teg</label>
                <select
                    className="select-project-s"
                    name="project_teg"
                    value={formData.project_teg}
                    onChange={handleInputChange}
                >
                    {TegOptions.map((status, index) => (
                        <option key={index} value={status}>{status}</option>
                    ))}
                </select>
            </div>
            )}


            {isAdmin | isTeamlead && (
                <InputField
                        label="Link clickup"
                        name="link_clickup"
                        value={formData.link_clickup}
                        onChange={handleInputChange}
                    />
            )}

            {isAdmin | isTeamlead && (
                    <InputField
                    label="Link cet3"
                    name="link_cet3"
                    value={formData.link_cet3}
                    onChange={handleInputChange}
                />
            )}

            

            </form>
            <div className="update-project-div-b">
                <button className="update-project-button" onClick={handleSaveClick}>Save</button>
            </div>
        </div>
    );
};

export default ProjectDetailUpdate;
