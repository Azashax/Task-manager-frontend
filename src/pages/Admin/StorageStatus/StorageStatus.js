import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../../context/AuthContext";
import "../../../assets/css/AllStyle.css"

function StorageStatus() {
  const [storage, setStorage] = useState([]);
  const [uniqueUsers, setUniqueUsers] = useState([]);
  const [startDate, setStartDate] = useState(localStorage.getItem('startDate') || '');
  const [endDate, setEndDate] = useState(localStorage.getItem('endDate') || '');

  const [selectedUser, setSelectedUser] = useState([]);

  const { authTokens, logoutUser } = useContext(AuthContext);

  
  const handleStartDateChange = (event) => {
    const newStartDate = event.target.value;
    setStartDate(newStartDate);
    localStorage.setItem('startDate', newStartDate);
  };
  
  const handleEndDateChange = (event) => {
    const newEndDate = event.target.value;
    setEndDate(newEndDate);
    localStorage.setItem('endDate', newEndDate);
  };

  const filteredStorage = storage.filter(element => {
    const elementDate = new Date(element.create_data);
    const start = startDate ? new Date(startDate) : new Date('1970-01-01');
    const end = endDate ? new Date(endDate) : new Date('2999-12-31');
    const userName = `${element.update_user.first_name} ${element.update_user.last_name}`;
    
    return elementDate >= start && elementDate <= end && (selectedUser.length === 0 || selectedUser.includes(userName));
  });
  

  const totalPoints = (filteredStorage.reduce((acc, current) => acc + current.storage_task.point, 0)).toFixed(2);
  
  const resetFilters = () => {
    localStorage.removeItem('startDate');
    localStorage.removeItem('endDate');
    setStartDate('');
    setEndDate('');
    setSelectedUser([]);
  };
  
  
  useEffect(() => {
    const GetStorage = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_URL}/api/storage/`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + String(authTokens.access),
            },
          }
        );

        if (response.status === 200) {
          const data = await response.json();
          setStorage(data);
          const users = [...new Set(data.map(item => `${item.update_user.first_name} ${item.update_user.last_name}`))];
          setUniqueUsers(users);
        } else if (response.status === 401) {
          logoutUser();
        }
      } catch (error) {
        console.error("Error fetching project task:", error);
      }
    };

    GetStorage();
  }, [authTokens, logoutUser]);

  function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  }
  
  return (

    <div className="container">
      
                <div className="div-title">
                    <h1 className="title">Storage</h1>
                </div>
                <div className="div-title">
                    <h2 className="title">Total Points: {totalPoints}</h2>
                </div>
                <div className="div-search">
<div className="select-dashboard-filter">
<input className="date-storage" type="date" value={startDate} onChange={handleStartDateChange}></input>
<input className="date-storage" type="date" value={endDate} onChange={handleEndDateChange}></input>

<select 
  className="user-dropdown" 
  value={selectedUser} 
  onChange={e => setSelectedUser([...e.target.selectedOptions].map(o => o.value))}
>
  <option value="">Select a User</option>
  {uniqueUsers.map(user => (
    <option key={user} value={user}>{user}</option>
  ))}
</select>

{/* <SelectUserStorage uniqueUsers={uniqueUsers} setSelectedUser={setSelectedUser} selectedUser={selectedUser} /> */}

<button onClick={resetFilters} className="btn-reset-filter">Reset Filters</button>


</div>
</div>
      <table className="table-projects">
        <thead>
          <tr>
            <th >Date</th>
            <th>User</th>
            <th >Task</th>
            <th className="project_build">Point</th>
            <th className="project_build">Before </th>
            <th className="project_build">After </th>
          </tr>
        </thead>
        {filteredStorage.map((element) => (
          <tbody key={element.id}>
            <tr>
              <td data-label="id">{formatDate(element.create_data)}</td>
              <td data-label="name">{element.update_user.first_name} {element.update_user.last_name}</td>
              <td data-label="built">{element.storage_task.project_task_name} {element.storage_task.task_type}</td>
              <td data-label="built">{element.storage_task.point}</td>
              <td data-label="e-status"><p className={`${element.before_status.split(' ').join('-')}`}> <div>{element.before_status}</div></p></td>
              <td data-label="e-status"><p className={`${element.after_status.split(' ').join('-')}`}> <div>{element.after_status}</div></p></td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}

export default StorageStatus;