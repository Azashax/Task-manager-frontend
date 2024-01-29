import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../../context/AuthContext';
import TaskChecked from '../../CheckedTask/TaskChecked'


function CheckedTaskAll() {
    const [complete, setComplete] = useState([]);
    const [uniqueUsers, setUniqueUsers] = useState([]);
    const [startDate, setStartDate] = useState(localStorage.getItem('startDate_checked_all') || '');
    const [endDate, setEndDate] = useState(localStorage.getItem('endDate_checked_all') || '');
  
    const [selectedUser, setSelectedUser] = useState([]);
  
    const {user, authTokens, logoutUser } = useContext(AuthContext);
  
    
    const handleStartDateChange = (event) => {
      const newStartDate = event.target.value;
      setStartDate(newStartDate);
      localStorage.setItem('startDate_checked_all', newStartDate);
    };
    
    const handleEndDateChange = (event) => {
      const newEndDate = event.target.value;
      setEndDate(newEndDate);
      localStorage.setItem('endDate_checked_all', newEndDate);
    };
  
    const filteredStorage = complete.filter(element => {
        const elementDate = new Date(element.checked_time);
        const start = startDate ? new Date(startDate) : new Date('1970-01-01');
        const end = endDate ? new Date(endDate) : new Date('2999-12-31');
        
        if (!element.task_employee_user) {
          return false;
        }
      
        const userName = `${element.task_employee_user.first_name} ${element.task_employee_user.last_name}`;
        
        return elementDate >= start && elementDate <= end && (selectedUser.length === 0 || selectedUser.includes(userName));
      });
      
    const resetFilters = () => {
        localStorage.removeItem('startDate_checked_all');
        localStorage.removeItem('endDate_checked_all');
        setStartDate('');
        setEndDate('');
        setSelectedUser([]);
      };

    useEffect(() => {
        GetCheckedTaskAll();
    }, []);

    const totalPoints = (filteredStorage.reduce((acc, current) => acc + current.point, 0)).toFixed(2);
    const GetCheckedTaskAll = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/api/checked/all/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access)
                }
            });

            if (response.status === 200) {
                const data = await response.json();
                console.log(data);
                setComplete(data);
                // const users = [...new Set(data.filter(item => `${item.task_employee_user.first_name} ${item.task_employee_user.last_name}`).map(item => `${item.task_employee_user.first_name} ${item.task_employee_user.last_name}`))];
                const users = [...new Set(data
                    .filter(item => item.task_employee_user && item.task_employee_user.first_name && item.task_employee_user.last_name)
                    .map(item => `${item.task_employee_user.first_name} ${item.task_employee_user.last_name}`)
                  )];
                  
                  
                setUniqueUsers(users);
            } else if (response.status === 401) {
                logoutUser();
            }
        } catch (error) {
            console.error("Error fetching stock:", error);
        }
    };

    function formatDate(dateString) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit'};
        return new Date(dateString).toLocaleDateString('ru-RU', options);
      }

    return (
        <div className="container">
            <div className="div-title">
                <h1 className="title">Checked</h1>
            </div>
            <div className="div-title">
                    <h2 className="title">Total Points: {totalPoints}</h2>
                </div>
            <div className="task-filters">
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
                <button className='btn-reset-filter' onClick={resetFilters}>Reset Filters</button>
            </div>
            <div className="complete-grid">
            <TaskChecked filteredStorage={filteredStorage} formatDate={formatDate} user={user}/>
            </div>

        </div>
    );
}

export default CheckedTaskAll;
