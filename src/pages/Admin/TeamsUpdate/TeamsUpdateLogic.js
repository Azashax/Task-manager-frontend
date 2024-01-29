import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../../context/AuthContext';
import TeamsUpdate from './TeamsUpdate';
import { useParams } from 'react-router-dom';

const ProjectDetailUpdate = () => {
  const [formData, setFormData] = useState({
    employees: '',
  });
  const { id } = useParams(); 

  const [teamsList, setTeamsList] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);
  const [teamsUser, setTeamsUser] = useState({ teamlead: [], employee: [] });
  const { authTokens, logoutUser } = useContext(AuthContext);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = async (employee) => {
    const projectUpdateConfirmed = window.confirm('Вы уверены, что хотите добавить данные проекта?');
    console.log(String(employee));
    let req = formData
    if (String(employee) !== "[object Object]"){
        req = {employees:`${employee}`}
        console.log("a");
    }
    console.log(formData);
    if (projectUpdateConfirmed) {
      try {
        const response = await fetch(`${process.env.REACT_APP_URL}/user/teams-list/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + String(authTokens.access),
          },
          body: JSON.stringify(req),
        });

        if (response.ok) {
          setFormData({
            employees: '',
          });
            getTeamsDetail()
            getTeamsList()
          setSuccessMessage('Данные Группы успешно изменены!');
        } else if (response.status === 401) {
          logoutUser();
        }
      } 
      catch (error) {

        console.error('Error updating project details:', error);
      }
    }
  };

  const getTeamsList = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/user/teams-user/`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setTeamsUser(data);
      } else if (response.status === 401) {
        logoutUser();
      } else {
        console.error(
          'Error fetching projects:',
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const getTeamsDetail = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/user/teams-list/${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setTeamsList(data);
      } else if (response.status === 401) {
        logoutUser();
      } else {
        console.error(
          'Error fetching projects:',
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    if (successMessage) {
      const timerId = setTimeout(() => {
        setSuccessMessage(null);
      }, 5000);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [successMessage]);

  useEffect(() => {
    getTeamsDetail()
    getTeamsList();
  }, []);

  return (
    <TeamsUpdate
      handleSaveClick={handleSaveClick}
      handleInputChange={handleInputChange}
      formData={formData}
      successMessage={successMessage}
      teamsUser={teamsUser}
      teamsList={teamsList}
    />
  );
};

export default ProjectDetailUpdate;
