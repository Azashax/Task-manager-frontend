import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import {Link} from "react-router-dom";

function Stock() {
    const [stocksEmployee, setStockEmployee] = useState([]);
    const {user, authTokens, logoutUser } = useContext(AuthContext);

    useEffect(() => {
        GetStock();
    }, []);

    const GetStock = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/api/stock/employee/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access)
                }
            });

            if (response.status === 200) {
                const data = await response.json();
                setStockEmployee(data);
            } else if (response.status === 401) {
                logoutUser();
            }
        } catch (error) {
            console.error("Error fetching stock:", error);
        }
    };

    const updateTaskStatus = async (id, newStatus) => {
        const userConfirmed = window.confirm("Вы уверены, что хотите продолжить?");
        console.log(userConfirmed)
        if (userConfirmed){
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/api/stock/employee/${id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access)
                },
                body: JSON.stringify({
                    task_status: "complete",
                    stock_active: "False",
                })
            });

            const response2 = await fetch(`${process.env.REACT_APP_URL}/api/storage/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access)
                },
                body: JSON.stringify({
                    before_status: "in progress",
                    after_status: "complete",
                    update_user: user.user_id,
                    storage_task: id,
                })
            });

            if (response2.status === 200) {
                // Обновляем данные после успешного обновления
                GetStock();
            } else if (response.status === 401) {
                logoutUser();
            }
        } catch (error) {
            console.error("Error updating task status:", error);
        }
        }
    };

    useEffect(() => {
        GetStock();
    }, []);

  return (

    <div className="container">
    <div className="div-title">
        <h1 className="title">Stock</h1>
    </div>
    <div className="complete-grid">
            {stocksEmployee.map((stocksEmploye) => (
                <div className="complete-grid-block" key={stocksEmploye.id}>
                    <div className="complete-content">
                        <h2 className="block-name-project p hight-60"><Link className="complete-name-projects p" to={`/project/${stocksEmploye.project_id}`}>    
                                {stocksEmploye.project_task_name.slice(0, 42)}
                                {stocksEmploye.project_task_name.length > 42 ? '...' : ''}</Link></h2>
                        <hr className="hr-c" />
                        <div className='complete-type-date'>
                        <p className="name-type p"> {stocksEmploye.task_type}</p>
                        <p className="name-date p"> {stocksEmploye.in_progress_time ? stocksEmploye.in_progress_time.slice(0, 10): "-"}</p>
                        </div>

                        <div className='complete-type-date'>
                        <p className="name-date p"> point: {stocksEmploye.point}</p>
                        <p className="name-date p"> time: {stocksEmploye.time_point}</p>
                        </div>
                        <div className='mr-center'>
                            
                        {stocksEmploye.task_status === "in progress" ?
                              <button className="complete-btn p bg_in_prog" onClick={() => updateTaskStatus(stocksEmploye.id)}>
                                  Complete
                              </button> :
                                    ""
                        }
                        </div>
                    </div>
                </div>
            ))}
    </div>

</div>


  );
}

export default Stock;
