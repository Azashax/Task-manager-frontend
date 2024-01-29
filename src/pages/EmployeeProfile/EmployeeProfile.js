import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import './EmployeeProfile.css'
import * as Check from 'react-icons/ai';

import { Link } from "react-router-dom";

function EmployeeProfile() {
    const [profileEmployee, setProfileEmployee] = useState({});
    const [projectTask, setProjectTask] = useState([]);
    const {
        authTokens, logoutUser } = useContext(AuthContext);
    const GetProfile = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/user/profile/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + String(authTokens.access),
                },
            });

            if (response.status === 200) {
                const data = await response.json();
                console.log(data);
                setProfileEmployee(data);
            } else if (response.status === 401) {
                logoutUser();
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const GetProjectTask = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/user/project-task/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + String(authTokens.access),
                },
            });

            if (response.status === 200) {
                const data = await response.json();
                console.log(data);
                setProjectTask(data);
            } else if (response.status === 401) {
                logoutUser();
            }
        } catch (error) {
            console.error('Error fetching project task:', error);
        }
    };
    const link_telegram_1 = profileEmployee.link_telegram ? profileEmployee.link_telegram.split("/").pop() : "";
    useEffect(() => {
        GetProfile();
    }, []);

    useEffect(() => {
        GetProjectTask();
    }, []);

    return (
        <div className="container">
                <div className="div-title">
                <h1 className="title">Profile</h1>
                </div>
        <table className="table-projects">
            <thead>
            <tr>
                <th>Id</th>
                <th>First name</th>
                <th>Last name</th>
                <th>Role</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td data-label="id">{profileEmployee.id}</td>
                <td data-label="first_name">{profileEmployee.first_name}</td>
                <td data-label="last_name">{profileEmployee.last_name}</td>
                <td data-label="role">{profileEmployee.role}</td>
            </tr>
            </tbody>
        </table>
    <table className="table-projects">
        <thead>
        <tr>
            <th>all point</th>
            <th>Month point</th>
            <th>Month Task</th>
            <th>Telegram</th>
            <th>Telephone</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td data-label="average_point">{profileEmployee.avg_point}</td>
            <td data-label="month_point">{profileEmployee.month_point}</td>
            <td data-label="month_point">{profileEmployee.count_task}</td>
            <td data-label="telegram"><a className="telegram_link" target="_blank" rel="noreferrer" href={profileEmployee.link_telegram}>{link_telegram_1}</a></td>
            <td data-label="telephone">{profileEmployee.phone_number}</td>
        </tr>
        </tbody>
    </table>
    <br/>
            <table className="table-projects">
            <thead>
            <tr>
                <th>Id</th>
                <th>Project</th>
                <th>Region</th>
                <th>Assamble</th>
                <th>Without</th>
                <th>With</th>
                <th>gltf</th>
                <th>upload</th>
            </tr>
            </thead>
                {projectTask.map((projectTasks) => (
            <tbody>
            <tr key={projectTask.id}>
                <td data-label="average_point">{projectTasks.id}</td>
                <td data-label="name">                
                    <Link to={`/project/${projectTasks.id}`} className="name-projects">
                        {projectTasks.project_name}
                    </Link>
                </td>
                <td data-label="telegram">{projectTasks.region}</td>
                <td data-label="telephone">{projectTasks.task_assemble === 1 ? <Check.AiOutlineCheck/>:<Check.AiOutlineMinus/>}</td>
                <td data-label="telephone">{projectTasks.task_without === 1 ? <Check.AiOutlineCheck/>:<Check.AiOutlineMinus/>}</td>
                <td data-label="telephone">{projectTasks.task_with === 1 ? <Check.AiOutlineCheck/>:<Check.AiOutlineMinus/>}</td>
                <td data-label="telephone">{projectTasks.task_gltf === 1 ? <Check.AiOutlineCheck/>:<Check.AiOutlineMinus/>}</td>
                <td data-label="telephone">{projectTasks.task_upload=== 1 ? <Check.AiOutlineCheck/>:<Check.AiOutlineMinus/>}</td>
                {/*<td data-label="telephone">{new Date(projectTasks.checked_time).toLocaleString()}</td>*/}
            </tr>
            </tbody>
                ))}
        </table>
    </div>
    );
}

export default EmployeeProfile;
