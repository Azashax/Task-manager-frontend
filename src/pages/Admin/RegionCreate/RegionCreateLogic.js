import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../../context/AuthContext';
import TeamsCreate from './RegionCreate';

const ProjectDetailUpdate = () => {
  const [formData, setFormData] = useState({
    name: '',
  });
  
  const [successMessage, setSuccessMessage] = useState(null);
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
        const response = await fetch(`${process.env.REACT_APP_URL}/api/region/`, {
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

          });
          setSuccessMessage('Данные Region успешно добавлеы!');
        } else if (response.status === 401) {
          logoutUser();
        }
      } 
      catch (error) {

        console.error('Error updating project details:', error);
      }
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


  return (
    <TeamsCreate
      handleSaveClick={handleSaveClick}
      handleInputChange={handleInputChange}
      formData={formData}
      successMessage={successMessage}

    />
  );
};

export default ProjectDetailUpdate;
