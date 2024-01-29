import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import './UsersListDetail.css'
import {Link, useParams} from "react-router-dom";
import * as Check from "react-icons/ai";
function UsersListDetail() {
    const { id } = useParams();
    const [userProfile, setUserProfile] = useState({});
    const { authTokens } = useContext(AuthContext)
    const [projectTask, setProjectTask] = useState([]);
    const GetUsersListDetailProfile = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/user/users-list/${id}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + String(authTokens.access),
                },
            });
            if (response.status === 200) {
                const data = await response.json();
                console.log(data);
                setUserProfile(data);
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    useEffect(() => {
        GetUsersListDetailProfile();
    }, []);


    const GetProjectTask = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/user/users-list/task/${id}/`, {
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
            }
        } catch (error) {
            console.error('Error fetching project task:', error);
        }
    };
    useEffect(() => {
        GetProjectTask();
    }, [])

    const link_telegram_1 = userProfile.link_telegram ? userProfile.link_telegram.split("/").pop() : "";

    return (
        <div className="container">
                                    <div className="div-title">
                <h1 className="title">Profile Employee</h1>
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
                    <td data-label="id">{userProfile.id}</td>
                    <td data-label="first_name">{userProfile.first_name}</td>
                    <td data-label="last_name">{userProfile.last_name}</td>
                    <td data-label="role">{userProfile.role}</td>
                </tr>
                </tbody>
            </table>
            <table className="table-projects">
                <thead>
                <tr>
                    <th>Avg point</th>
                    <th>Month point</th>
                    <th>Month Task</th>
                    <th>Telegram</th>
                    <th>Telephone</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td data-label="average_point">{userProfile.avg_point}</td>
                    <td data-label="month_point">{userProfile.month_point}</td>
                    <td data-label="month_point">{userProfile.count_task}</td>
                    <td data-label="telegram"><a className="telegram_link" target="_blank" rel="noreferrer" href={userProfile.link_telegram}>{link_telegram_1}</a></td>
                    <td data-label="telephone">{userProfile.phone_number}</td>
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
                    <tr>
                        <td data-label="average_point">{projectTasks.id}</td>
                        <td data-label="month_point"><Link to={`/project/${projectTasks.id}`} className="name-projects">{projectTasks.project_name}</Link></td>
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

export default UsersListDetail;
