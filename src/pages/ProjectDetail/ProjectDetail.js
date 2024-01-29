import React, { useState, useEffect, useContext } from 'react';
import AuthContext from "../../context/AuthContext";
import {Link, useParams} from "react-router-dom";
import { ProjectDetailForm } from "./ProjectDetailForm.jsx";
import { ProjectDetailTask } from "./ProjectDetailTask.jsx";
import "../../assets/css/ProjectDetail.css";

const ProjectDetail = () => {
    const { id } = useParams();
    const [projectDetails, setProjectDetails] = useState(null);
    const {user, authTokens, logoutUser } = useContext(AuthContext);

    const initialTextareaData = {
        deskAssemble: '',
        deskWithout: '',
        deskWith: '',
        deskGltf: '',
        deskUpload: '',
    };

    const [textareaData, setTextareaData] = useState(initialTextareaData);

    useEffect(() => {
        fetchProjectDetails();
    }, [id, authTokens, logoutUser]);

    async function fetchProjectDetails() {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/api/project/${id}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access)
                }
            });
            const data = await response.json();
            if (response.status === 200) {
                setProjectDetails(data);
                setTextareaData(
                    {
                        deskAssemble: data.task_assemble.description,
                        deskWithout: data.task_without.description,
                        deskWith: data.task_with.description,
                        deskGltf: data.task_gltf.description,
                        deskUpload: data.task_upload.description,
                    }
                )
            } else if (response.status === 401) {
                logoutUser();
            }
        } catch (error) {
            console.error("Error fetching project details:", error);
        }
    }

    const handleTextareaChange = (name, value) => {
        setTextareaData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSaveClick = async (id_task, desk) => {
        const ProjectUpdateConfirmed = window.confirm("Вы уверены, что хотите изменить данные Таска?");
        const requestBody = {
            description: textareaData[id_task],
        };

        if (ProjectUpdateConfirmed) {
            try {
                const response = await fetch(`${process.env.REACT_APP_URL}/api/stock/employee/${id_task}/`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + String(authTokens.access),
                    },
                    body: JSON.stringify(requestBody),

                });
                if (response.status === 200) {
                    fetchProjectDetails();
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

    return (
        <div className="container">
            <div className="div-title">

            {
                user.role === "Manager" || user.role === "Teamlead" || user.role === "Admin"?
                    <h1><Link className="title" to={`/project/update/${projectDetails.id}`}>Update</Link></h1>:null
            }

            </div>
            <ProjectDetailForm projectDetails={projectDetails}/>
            <div className="div-title">

            {
                user.role !== "Employee" && user.role !== "Manager" && user.role !== "QA" ?
            <h1><Link className="title" to={`/project/${projectDetails.id}/${projectDetails.project_type.toLowerCase()}/gltf`}>Update Time</Link></h1>
            :null
            }
            
            </div>
            <div className="div-scroll">
            <ProjectDetailTask  projectDetails={projectDetails} textareaData={textareaData} handleSaveClick={handleSaveClick} 
            user={user} handleTextareaChange={handleTextareaChange}/>
            </div>
        </div>
    );
};

export default ProjectDetail;
