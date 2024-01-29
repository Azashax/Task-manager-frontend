import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import TaskChecked from './TaskChecked'
import { Link } from 'react-router-dom';

function Complete() {
    const [complete, setComplete] = useState([]);
    const {user, authTokens, logoutUser } = useContext(AuthContext);
    const [startDate, setStartDate] = useState(localStorage.getItem('startDate_checked') || '');
    const [endDate, setEndDate] = useState(localStorage.getItem('endDate_checked') || '');


    const handleStartDateChange = (event) => {
        const newStartDate = event.target.value;
        setStartDate(newStartDate);
        localStorage.setItem('startDate_checked', newStartDate);
      };
      
      const handleEndDateChange = (event) => {
        const newEndDate = event.target.value;
        setEndDate(newEndDate);
        localStorage.setItem('endDate_checked', newEndDate);
      };
      const filteredStorage = complete.filter(element => {
        const elementDate = new Date(element.checked_time);
        const start = startDate ? new Date(startDate) : new Date('1970-01-01');
        const end = endDate ? new Date(endDate) : new Date('2999-12-31');
        return elementDate >= start && elementDate <= end;
      });

    useEffect(() => {
        GetCheckedTask();
    }, []);

    const totalPoints = (filteredStorage.reduce((acc, current) => acc + current.point, 0)).toFixed(2);
    const GetCheckedTask = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/api/checked/employee/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access)
                }
            });

            if (response.status === 200) {
                const data = await response.json();
                setComplete(data);
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
            </div>
            <div className="complete-grid">

                       <TaskChecked filteredStorage={filteredStorage} formatDate={formatDate} user={user}/>
            </div>

        </div>
    );
}

export default Complete;
