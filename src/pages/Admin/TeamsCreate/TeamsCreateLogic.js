import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../../context/AuthContext';
import TeamsCreate from './TeamsCreate';

const ProjectDetailUpdate = () => {
  const [formData, setFormData] = useState({
    name: '',
    teamlead: '',
  });
  
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

  const handleSaveClick = async () => {
    const projectUpdateConfirmed = window.confirm('Вы уверены, что хотите добавить данные проекта?');
    if (projectUpdateConfirmed) {
      try {
        console.log(formData);
        const response = await fetch(`${process.env.REACT_APP_URL}/user/teams-list/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + String(authTokens.access),
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setFormData({
            name: '',
            teamlead: '',

          });
          setSuccessMessage('Данные Группы успешно добавлены!');
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
    getTeamsList();
  }, []);

  return (
    <TeamsCreate
      handleSaveClick={handleSaveClick}
      handleInputChange={handleInputChange}
      formData={formData}
      successMessage={successMessage}
      teamsUser={teamsUser}
    />
  );
};

export default ProjectDetailUpdate;
