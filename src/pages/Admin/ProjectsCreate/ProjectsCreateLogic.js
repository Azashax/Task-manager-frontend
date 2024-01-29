import React, { useState, useEffect, useContext, useCallback } from 'react';
import AuthContext from '../../../context/AuthContext';
import ProjectsCreateX from './ProjectsCreate';

const ProjectDetailUpdate = () => {
  const [formData, setFormData] = useState({
    project_name: '',
    built: 'finished',
    project_teg: 'None',
    link_clickup: '',
    link_cet3: '',
    project_type: 'Tower',
    region: '',
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const { authTokens, logoutUser } = useContext(AuthContext);

  const [region, setRegion] = useState([]);;
  const TegOptions = ['None', 'Priority', 'High priority'];
  const BuiltStatusOptions = ['finished', 'off plan'];
  const TypeOptions = ['Villa', 'Tower'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveClick = async () => {
    const projectUpdateConfirmed = window.confirm('Вы уверены, что хотите изменить данные проекта?');

    if (projectUpdateConfirmed) {
      try {
        console.log(formData);
        const response = await fetch(`${process.env.REACT_APP_URL}/api/projects-list/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + String(authTokens.access),
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setFormData({
            project_name: '',
            built: 'finished',
            project_teg: 'None',
            link_clickup: '',
            link_cet3: '',
            project_type: 'Tower',
            region: '',
          });
          setSuccessMessage('Данные проекта успешно обновлены!');
        } else if (response.status === 401) {
          logoutUser();
        }
      } catch (error) {
        console.error('Error updating project details:', error);
      }
    }
  };
  const GetProjects = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/api/region/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setRegion(data);
      } else if (response.status === 401) {
        logoutUser();
      }else {
        console.error(
          "Error fetching projects:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }, [authTokens.access, logoutUser]);

  useEffect(() => {
    GetProjects();
  }, [GetProjects]);

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
    <div className='container'>

    <ProjectsCreateX TegOptions={TegOptions} handleSaveClick={handleSaveClick} 
    BuiltStatusOptions={BuiltStatusOptions} handleInputChange={handleInputChange}
    TypeOptions={TypeOptions} formData={formData} successMessage={successMessage}
    region={region}/>
      </div>
  );
};

export default ProjectDetailUpdate;
