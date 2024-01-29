import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import medal from "../../assets/image/medal.png"
import medal2 from "../../assets/image/medal2.png"
import medal3 from "../../assets/image/medal3.png"
function UsersList() {
    const [userList, setUserList] = useState([]);
    const { user, authTokens, logoutUser } = useContext(AuthContext);

    useEffect(() => {
        GetProjects();
    }, [])
    const GetProjects = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/user/rating/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + String(authTokens.access),
                },
            });

            if (response.status === 200) {
                const data = await response.json();
                console.log(data);
                setUserList(data);
            } else if (response.status === 401) {
                logoutUser();
            }
        } catch (error) {
            console.error('Error fetching project task:', error);
        }
    };

    useEffect(() => {
        GetProjects();
    }, []);

    return (
        <div className="container">
                        <div className="div-title">
                <h1 className="title">Rating</h1>
                </div>
            <table className="table-projects">
                <thead>
                <tr>
                    <th className="project_name">Name</th>
                    <th className="project_region">Point</th>
                    <th className="project_region">total Task</th>
                </tr>
                </thead>
                <tbody>
                {userList.map((userL, index) => (
  <tr key={userL.id}>
    <td data-label="name">
      {index === 0 && <img className='medal-image' src={medal} alt={`Photo of ${userL.first_name}`} />}
      {index === 1 && <img className='medal-image' src={medal2} alt={`Photo of ${userL.first_name}`} />}
      {index === 2 && <img className='medal-image' src={medal3} alt={`Photo of ${userL.first_name}`} />}
      
      {user.role !== "Employee" ? (
        <Link to={`/users-list/${userL.id}`} className="name-projects">
          {userL.first_name} {userL.last_name}
        </Link>
      ) : (
        `${userL.first_name} ${userL.last_name}`
      )}
    </td>
    <td data-label="region">{userL.total_points}</td>
    <td data-label="region">{userL.tasks_completed}</td>
  </tr>
))}

                 </tbody>
            </table>
        </div>
    );
}

export default UsersList;
