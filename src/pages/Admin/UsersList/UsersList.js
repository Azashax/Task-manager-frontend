import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../../context/AuthContext';
import { Link } from 'react-router-dom';
import './UsersList.css'
function UsersList() {
    const [userList, setUserList] = useState([]);
    const { authTokens, logoutUser } = useContext(AuthContext);
    const [searchName, setSearchName] = useState('');

    console.log(userList);
    useEffect(() => {
        GetProjects();
    }, [searchName])
    const GetProjects = async () => {
        const searchParams = new URLSearchParams();
        if (searchName) {
            searchParams.append('user-name', searchName);
        }

        const queryString = searchParams.toString();
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/user/users-list/?${queryString}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + String(authTokens.access),
                },
            });
            if (response.status === 200) {
                const data = await response.json();
                setUserList(data);
            } else if (response.status === 401) {
                logoutUser();
            }
        } catch (error) {
            console.error('Error fetching project task:', error);
        }
    };
    const link_telegram_1 = userList.link_telegram ? userList.link_telegram.split("/").pop() : "";

    return (
        <div className='container'>
            <div className='div-search'>
                <div>
                    <label className="div-search-label" >Project Name</label>
                    <input className="div-search-input" type="text" value={searchName}
                       onChange={(e) => setSearchName(e.target.value)}/>
                </div>
                <div>
                    <label className="div-search-label" >Create User</label>
                    <Link className='btn-cre-reg complete-btn' to={`/user/create`}>create</Link>
                </div>
            </div>
            <table className="table-projects">
                <thead>
                <tr>
                    <th className="project_name">Username</th>
                    <th className="project_region">Role</th>
                    <th className="project_name">Last Name</th>
                    <th className="project_region">First Name</th>
                    <th className="project_region">telegram</th>
                    <th className="project_region">tel</th>
                </tr>
                </thead>
                <tbody>
                {userList.map((user) => (
                    
                    <tr key={user.id}>
                        <td data-label="name"><Link to={`/users-list/${user.id}`} className="name-projects">{user.username}</Link></td>
                        <td data-label="region">{user.role}</td>
                        <td data-label="region">{user.last_name}</td>
                        <td data-label="region">{user.first_name}</td>
                        <td data-label="region"><a className="telegram_link" target="_blank" rel="noreferrer" href={user.link_telegram}>{user.link_telegram ? user.link_telegram.split("/").pop() : ""}</a></td>
                        <td data-label="region">{user.phone_number}</td>
                    </tr>
                   
                ))}
                 </tbody>
            </table>
        </div>
    );
}

export default UsersList;
