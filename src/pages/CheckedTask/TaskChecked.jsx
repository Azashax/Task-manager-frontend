import React from 'react';
import { Link } from 'react-router-dom';

function TaskChecked({ filteredStorage, formatDate, user }) {
  // Функция для обрезки длинных названий задач
  const truncateTaskName = (name) => {
    const maxLength = 36;
    return name.length > maxLength ? `${name.slice(0, maxLength)}..` : name;
  };

  return (
    <>
      {filteredStorage.map((task) => (
        <div className="complete-grid-block_check" key={task.id}>
          <div className="complete-content">
            <h2 className="block-name-project p hight-60">
              <Link className="complete-name-projects p" to={`/project/${task.project_id}`}>    
                {truncateTaskName(task.project_task_name)}
              </Link>
            </h2>
            <hr className="hr-c" />
            <div className='complete-type-date'>
              <p className="name-type p"> {task.task_type}</p>
              <p className="name-date p"> {task.point}</p>
            </div>
              <p className="p name-user">checked date: {formatDate(task.checked_time)}</p>

            {user.role !== "Employee" && (
                <>
                    <p className="p name-user">{task.task_employee_user.first_name}</p>
                    <p className="p name-user">{task.task_employee_user.last_name}</p>
                </>
            )}


          </div>
        </div>
      ))}
    </>
  );
}

export default TaskChecked;
