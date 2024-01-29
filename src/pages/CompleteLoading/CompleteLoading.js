import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import { Link } from 'react-router-dom';

function Complete() {
    const [complete, setComplete] = useState([]);
    const { authTokens, logoutUser } = useContext(AuthContext);

    useEffect(() => {
        GetComplete();
    }, []);

    const GetComplete = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/api/complete-load/`, {
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

    return (
        <div className="container">
            <div className="div-title">
                <h1 className="title">Complete</h1>
            </div>
            <div className="complete-grid">
                    {complete.map((completes) => (
                        <div className="complete-grid-block_check" key={completes.id}>
                            <div className="complete-content">
                                <h2 className="block-name-project p hight-60"><Link className="complete-name-projects p" to={`/project/${completes.project_id}`}>    
                                        {completes.project_task_name.slice(0, 36)}
                                        {completes.project_task_name.length > 36 ? '..' : ''}</Link></h2>
                                <hr className="hr-c" />
                                <div className='complete-type-date'>
                                    <input
                                        className="check-out"
                                        type="radio"
                                        checked={completes.check_out}
                                        value={completes.id}  
                                    />
                                        <p className='p'>
                                            {completes.check_out_user ? completes.check_out_user.first_name +" ": "-"}
                                            {completes.check_out_user ? completes.check_out_user.last_name: "-"}
                                        </p>
                                    </div>
                                <div className='complete-type-date'>
                                <p className="name-type p"> {completes.task_type}</p>
                                <p className="name-date p"> {completes.complete_time ? completes.complete_time.slice(0, 10): "+"}</p>
                                </div>
                                <p className="p name-user"> {completes.task_employee_user.first_name}</p>
                                <p className="p name-user"> {completes.task_employee_user.last_name}</p>

                            </div>
                        </div>
                    ))}
            </div>

        </div>
    );
}

export default Complete;
