import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import {Link} from "react-router-dom";

function TeamLeadProfile() {
    const [profile, setProfile] = useState({});
    const [teams1, setTeams] = useState([]);
    const { authTokens, logoutUser } = useContext(AuthContext);

    const GetProfile = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/user/profile-t/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + String(authTokens.access),
                },
            });

            if (response.status === 200) {
                const data = await response.json();
                console.log(data.profile1);
                console.log(data.teams1);
                setProfile(data.profile1);
                setTeams(data.teams1);
            } else if (response.status === 401) {
                logoutUser();
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };



    const link_telegram_1 = profile.link_telegram ? profile.link_telegram.split("/").pop() : "";


    useEffect(() => {
        GetProfile();
    }, []);

    return (
        <div className="container">

            <div className='div-title'>
                <h1 className='title' >Profile</h1>

            </div>
            <table className="table-projects">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>name</th>
                    <th>Role</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td data-label="id">{profile.id}</td>
                    <td data-label="first_name">{profile.first_name + " " + profile.last_name}</td>
                    <td data-label="role">{profile.role}</td>
                </tr>
                </tbody>
            </table>


            <table className="table-projects">
                <thead>
                <tr>
                    <th>Telegram</th>
                    <th>Telephone</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td data-label="telegram"><a className="telegram_link" href={profile.link_telegram} target="_blank" rel="noreferrer">@{link_telegram_1}</a></td>
                    <td data-label="telephone">{profile.phone_number}</td>
                </tr>
                </tbody>
            </table>

            <div className='margin-top'>

            <table className="table-projects">
                <thead>
                <tr>
                    <th>Employee is Group</th>

                </tr>
                </thead>
                {teams1.map((teams) => (
                    <tbody>
                    <tr key={teams.id}>
                        <td data-label="employee_name"><Link to={`/users-list/${teams.id}/`} className="name-projects">{teams.first_name} {teams.last_name}</Link></td>
                    </tr>
                    </tbody>
                ))}
            </table>
            </div>
        </div>
    );
}

export default TeamLeadProfile;
