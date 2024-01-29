import React from "react";
import {Link} from "react-router-dom";

function SecureComponent({ stocksSecure, stocksOpen, selectUser, selectedUsers, handleSelectChange, updateTaskStatus }) {
  return (
    <div className="container">
            <div className="div-title">
                <h1 className="title">Secure</h1>
            </div>

        <div className="complete-grid">
          {stocksSecure.map((stocksSecures) => (
            <div className="complete-grid-block" key={stocksSecures.id}>
             <div className="complete-content">
              <h2 className="block-name-project p hight-60">
              <Link className="complete-name-projects p" to={`/project/${stocksSecures.project_id}`}>
              {stocksSecures.project_task_name.slice(0, 40)}
                                        {stocksSecures.project_task_name.length > 40 ? '...' : ''}
                </Link>
              </h2>
              <div className='complete-type-date'>
              <p className="name-type p">{stocksSecures.task_type}</p>
              <p className={`${stocksSecures.task_status.split(' ').join('-')} name-status`}> <div>{stocksSecures.task_status}</div></p>
              </div>
              <p className="name-user p">{stocksSecures.task_employee_user.first_name}</p>
              <p className="name-user p">{stocksSecures.task_employee_user.last_name}</p>
              
              <div className="complete-div-btn p">
              <button
                className="complete-btn p"
                onClick={() =>
                  updateTaskStatus(
                    stocksSecures.id,
                    stocksSecures.task_employee_user.id
                  )
                }
              >
                Назначить
              </button>
              </div>
              </div>
            </div>
          ))}
          {stocksOpen.map((stocksOpen, index) => (
            <div className="complete-grid-block" key={stocksOpen.id}>
              <div className="complete-content">
                  <h2 className="block-name-project p hight-60">
                    <Link className="complete-name-projects p" to={`/project/${stocksOpen.project_id}`}>
                      {stocksOpen.project_task_name}
                    </Link>
                  </h2>
                  <div className='complete-type-date'>
                    <p className="name-type p">{stocksOpen.task_type}</p>
                    <p className={`${stocksOpen.task_status.split(' ').join('-')} name-status`}> <div>{stocksOpen.task_status}</div></p>
                  </div>
              <div className="complete-div-btn-sel p">
                <select
                  className="complete-div-sel"
                  value={selectedUsers[index]}
                  onChange={(e) => {
                    const selectedValue = e.target.value;
                    handleSelectChange(index, selectedValue);
                  }}
                >
                  {" "}
                  <option value="">Выберите пользователя</option>
                  {selectUser.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.first_name} {user.last_name}
                    </option>
                  ))}
                </select>

                <button
                  className="complete-btn p"
                  onClick={() => {
                    const selectedUser = selectedUsers[index];
                    if (selectedUser) {
                      // Проверка, что выбран пользователь
                      updateTaskStatus(stocksOpen.id, selectedUser);
                    }
                  }}
                  disabled={!selectedUsers[index]}
                >
                  Назначить
                </button>
                </div>
              </div>
              </div>
          ))}
        </div>
      </div>
  );
}

export default SecureComponent;
