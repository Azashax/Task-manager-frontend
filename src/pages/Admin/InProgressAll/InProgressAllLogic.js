import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../../context/AuthContext';
import {Link} from "react-router-dom";

function InProgress() {
    const [inProgress, setInProgress] = useState([]);
    const { user, authTokens, logoutUser } = useContext(AuthContext);
    // const { id } = useParams();
    useEffect(() => {
        GetStock();
    }, []);

    const GetStock = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/api/in-progress-all/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access)
                }
            });

            if (response.status === 200) {
                const data = await response.json();
                setInProgress(data);
            } else if (response.status === 401) {
                logoutUser();
            }
        } catch (error) {
            console.error("Error fetching stock:", error);
        }
    };


    const updateTaskStatus = async (id, task_status) => {
        const userConfirmed = window.confirm("Вы уверены, что хотите продолжить?");
        if (userConfirmed){
            try {
                const requestBody = {
                    stock_active: "False"
                };
                console.log(task_status)

                if (task_status !== "correcting") {
                    requestBody.task_employee_user = null;
                }
                if (task_status !== "in progress") {
                    requestBody.task_employee_user = null;
                    
                }
                console.log(requestBody)
                const response = await fetch(`${process.env.REACT_APP_URL}/api/in-progress/update/${id}/`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + String(authTokens.access)
                    },
                    body: JSON.stringify(requestBody)
                });

                if (response.status === 200) {
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

    return (
        <div className="container">
        <div className="div-title">
            <h1 className="title">In Progress</h1>
        </div>

        <div className="grid-blog">
                {inProgress.map((inProgress1) => (
                    <div className="grid-blog-block" key={inProgress1.id}>
                        <div className="grid-blog-user">
                            <h2 className="block-name-project">
                                <Link className="name-projects" style={{backgroundColor: 'black'}} to={`/users-list/${inProgress1.id}/`}>
                                    {inProgress1.first_name}<br/>
                                    {inProgress1.last_name}
                                </Link>
                            </h2>
                        </div>

                        <div className="">
                            <div className="in-progress-grid-block">
                                {inProgress1.array.map((inProgress2) => (

                            <div className="complete-content" key={inProgress2.id}>
                                <hr className="hr-c" style={{ marginTop: '30px', marginBottom:'30px' }} />
                                <h2 className="block-name-project p hight-60">
                                    <Link className="complete-name-projects p" to={`/project/${inProgress2.project_id}/`}>
                                        {inProgress2.project_task_name.slice(0, 38)}
                                        {inProgress2.project_task_name.length > 40 ? '..' : ''}
                                    </Link>
                                </h2>
                                <div className='complete-type-date'>
                                    <p className="name-type p">{inProgress2.task_type}</p>
                                    <p className={`${inProgress2.task_status.split(' ').join('-')} name-status`}> <div>{inProgress2.task_status}</div></p>
                                </div>
      
                                <p className="name-user p">point:{inProgress2.point}</p>
                                <p className="name-user p">time:{inProgress2.time_point}</p>
                                {user.role === "Teamlead" && <button className='complete-btn' onClick={() => updateTaskStatus(inProgress2.id, inProgress2.task_status)}>убрать</button>}
                                {/* <button className='complete-btn' onClick={() => updateTaskStatus(inProgress2.id, inProgress2.task_status)}>убрать</button> */}

                                {/* <p style={{borderTop: '3px solid black', padding: '5px'}}></p> */}
                            </div>

                                ))}
                            </div>
                        </div>
                    </div>
                ))}
        </div>
    </div>
    );
}

export default InProgress;
