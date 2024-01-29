import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../../context/AuthContext';
import { Link } from 'react-router-dom';
import "../../../assets/css/CompleteAll.css"
function CompleteAll() {
    const [complete, setComplete] = useState([]);
    const {user, authTokens, logoutUser } = useContext(AuthContext);
    const [startDate, setStartDate] = useState(localStorage.getItem('startDate_complete') || '');
    const [endDate, setEndDate] = useState(localStorage.getItem('endDate_complete') || '');
    const [uniqueUsers, setUniqueUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState('');

    const handleStartDateChange = (event) => {
        const newStartDate = event.target.value;
        setStartDate(newStartDate);
        localStorage.setItem('startDate_complete', newStartDate);
      };
      
    const handleEndDateChange = (event) => {
        const newEndDate = event.target.value;
        setEndDate(newEndDate);
        localStorage.setItem('endDate_complete', newEndDate);
      };

      const filteredStorage = complete.filter(element => {
        const elementDate = new Date(element.complete_time);
        const start = startDate ? new Date(startDate) : new Date('1970-01-01');
        const end = endDate ? new Date(endDate) : new Date('2999-12-31');
        
        if (!element.task_employee_user) {
          return false;
        }
      
        const userName = `${element.task_employee_user.first_name} ${element.task_employee_user.last_name}`;
        
        return elementDate >= start && elementDate <= end && (selectedUser.length === 0 || selectedUser.includes(userName));
      });

    const resetFilters = () => {
        localStorage.removeItem('startDate_complete');
        localStorage.removeItem('endDate_complete');
        setStartDate('');
        setEndDate('');
        setSelectedUser('');
      };

    const totalPoints = (filteredStorage.reduce((acc, current) => acc + current.point, 0)).toFixed(2);

    const GetComplete = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/api/complete-all/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access)
                }
            });

            if (response.status === 200) {
                const data = await response.json();
                setComplete(data);
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

    const updateTaskStatus = async (id, newStatus) => {
        const userConfirmed = window.confirm(`Вы уверены, что хотите зменить на ${newStatus}?`);

        if (userConfirmed){
            try {
                const response = await fetch(`${process.env.REACT_APP_URL}/api/complete-all/${id}/`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + String(authTokens.access)
                    },
                    body: JSON.stringify({
                        task_status: newStatus,
                        check_out: "False",
                    })
                });

                const response2 = await fetch(`${process.env.REACT_APP_URL}/api/storage/create`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + String(authTokens.access)
                    },
                    body: JSON.stringify({
                        before_status: "complete",
                        after_status: newStatus,
                        update_user: user.user_id,
                        storage_task: id,
                    })
                    
                });

                if (response2.status === 200) {
                    // Обновляем данные после успешного обновления
                    GetComplete();
                } else if (response.status === 401) {
                    logoutUser();
                }
            } catch (error) {
                console.error("Error updating task status:", error);
            }
        }
    };

    const CheckOut = async (id, bool) => {
        const userConfirmed = window.confirm(`Вы уверены, что хотите изменить на ${bool}?`);
        console.log(bool);
        if (userConfirmed){
            try {
                const data = {
                    check_out: bool,
                };
    
                if (bool) {
                    data.check_out_user = user.user_id;
                } else {
                    data.check_out_user = null;  // Или используйте пустую строку, в зависимости от вашего API
                }
    
                const response = await fetch(`${process.env.REACT_APP_URL}/api/complete-all/${id}/`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + String(authTokens.access)
                    },
                    body: JSON.stringify(data),
                });
                if (response.status === 200) {
                    // Обновляем данные после успешного обновления
                    GetComplete();
                } else if (response.status === 401) {
                    logoutUser();
                }
            } catch (error) {
                console.error("Error updating task status:", error);
            }
        }
    };
    
    useEffect(() => {
        GetComplete();
    }, []);

    return (
        <div className="container">
        <div className="div-title">
            <h1 className="title">Complete</h1>
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
                {filteredStorage.map((completes) => (
                    <div className="complete-grid-block_check" key={completes.id}>
                        <div className="complete-content">
                            <h2 className="block-name-project p hight-60"><Link className="complete-name-projects p" to={`/project/${completes.project_id}`}>    
                                    {completes.project_task_name.slice(0, 36)}
                                    {completes.project_task_name.length > 36 ? '...' : ''}</Link></h2>
                                    <div className='complete-type-date'>
                                    <input
    className="check-out"
    type="radio"
    checked={completes.check_out}
    onChange={() => CheckOut(completes.id, !completes.check_out)}
    value={completes.id}  
/>

                                        <p className='p'>
                                            {completes.check_out_user ? completes.check_out_user.first_name+" ": "-"}
                                            {completes.check_out_user ? completes.check_out_user.last_name: "-"}
                                        </p>
                                    </div>
                            <hr className="hr-c" />
                            <div className='complete-type-date'>
                            <p className="name-type p"> {completes.task_type}</p>
                            <p className="name-date p"> {completes.complete_time ? completes.complete_time.slice(0, 10): "+"}</p>
                            </div>
                            <p className="p name-user"> {completes.task_employee_user.first_name}</p>
                            <p className="p name-user"> {completes.task_employee_user.last_name}</p>

                            <div className="complete-div-btn p ">
                                <button className="complete-btn p bg-cor" onClick={() => updateTaskStatus(completes.id, "correcting")}>
                                Correcting
                                </button>

                                <button className="complete-btn p bg-check" onClick={() => updateTaskStatus(completes.id, "checked")}>
                                    Checked
                                </button>
                            </div>

                        </div>
                    </div>
                ))}
        </div>

    </div>
    );
}

export default CompleteAll;
