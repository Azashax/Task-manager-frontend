import React, { useState, useEffect, useContext, useCallback } from "react";
import AuthContext from "../../../context/AuthContext";
import ProjectTable from "./DashboardAll";
function Projects() {
  const { authTokens, logoutUser } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [projectsStatus, setProjectsStatus] = useState({});

  const [searchName, setSearchName] = useState("");

  // const option = ["assemble", "Without", "With", "Gltf", "Upload"];

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // Функции обработчики изменений фильтров
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
  };

  // Фильтрация проектов
  const filteredProjects = projects.filter((project) => {
    const taskKey = `task_${selectedCategory.toLowerCase()}`;
    const task = project[taskKey];
    return (!selectedCategory || (task && task.task_type === selectedCategory)) &&
           (!selectedStatus || (task && task.task_status === selectedStatus));
  });



  // Перенесено в useEffect
  const GetProjects = useCallback(async () => {
    try {
      const searchParams = new URLSearchParams();
      if (searchName) {
        searchParams.append("project-name", searchName);
      }

      const queryString = searchParams.toString();

      const response = await fetch(
        `${process.env.REACT_APP_URL}/api/dashboard/?${queryString}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setProjects(data);
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
  }, [authTokens.access, logoutUser, searchName]);


  const GetProjectsStatusCount = useCallback(async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_URL}/api/dashboard/status-count/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        setProjectsStatus(data);
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
    GetProjectsStatusCount();
  }, [GetProjects, GetProjectsStatusCount]);

  const handleSearchChange = (e) => {
    setSearchName(e.target.value);
  };

  if (!projectsStatus.task_assemble_status_counts) {
    // Выводите загрузочное состояние или возвращайте null
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="div-search">

      <form>
        <input
          className="div-search-input"
          type="text"
          value={searchName}
          onChange={handleSearchChange} // Использование обработчика изменения
        />
      </form>
      <div className="select-dashboard-filter">
        <select className="user-dropdown" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Select Category</option>
          {["assemble", "without", "with", "gltf", "upload"].map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <select className="user-dropdown" value={selectedStatus} onChange={handleStatusChange}>
          <option value="">Select Status</option>
          {["open", "in progress", "complete", "checked", "correcting", "waiting"].map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>
      </div>
      <ProjectTable projects={filteredProjects} projectsStatus={projectsStatus}/>
    </div>
  );
}

export default Projects;




// import React, { useState, useEffect, useContext, useCallback } from "react";
// import AuthContext from "../../../context/AuthContext";
// import ProjectTable from "./DashboardAll";
// function Projects() {
//   const { authTokens, logoutUser } = useContext(AuthContext);
//   const [projects, setProjects] = useState([]);
//   const [projectsStatus, setProjectsStatus] = useState({});
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);
//   const [searchName, setSearchName] = useState("");
  
//   const GetProjects = useCallback(async () => {
//     try {
//       const searchParams = new URLSearchParams();
//       if (searchName) {
//         searchParams.append("project-name", searchName);
//       }
//       // Устанавливаем параметры пагинации
//       searchParams.append("page", currentPage);
//       searchParams.append("page_size", pageSize);

//       // Формируем строку запроса
//       const queryString = searchParams.toString();

//       const response = await fetch(
//         `${process.env.REACT_APP_URL}/api/dashboard/?${queryString}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${authTokens.access}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         const data = await response.json();
//         console.log(data);
//         setProjects(data.results);
//       } else if (response.status === 401) {
//         logoutUser();
//       } else {
//         console.error(
//           "Error fetching projects:",
//           response.status,
//           response.statusText
//         );
//       }
//     } catch (error) {
//       console.error("Error fetching projects:", error);
//     }
//   }, [currentPage, pageSize, authTokens.access, logoutUser, searchName]);


//   const handlePreviousPage = () => {
//     setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
//   };

//   const handleNextPage = () => {
//     setCurrentPage(currentPage => currentPage + 1); // Обновите это, если у вас есть информация об общем количестве страниц
//   };

//   const GetProjectsStatusCount = useCallback(async () => {
//     try {
//       const response = await fetch(
//         `${process.env.REACT_APP_URL}/api/dashboard/status-count/`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${authTokens.access}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         const data = await response.json();
//         console.log(data);
//         setProjectsStatus(data);
//       } else if (response.status === 401) {
//         logoutUser();
//       }else {
//         console.error(
//           "Error fetching projects:",
//           response.status,
//           response.statusText
//         );
//       }
//     } catch (error) {
//       console.error("Error fetching projects:", error);
//     }
//   }, [authTokens.access, logoutUser]);


//   useEffect(() => {
//     GetProjects();
//     GetProjectsStatusCount();
//   }, [GetProjects, GetProjectsStatusCount]);

//   const handleSearchChange = (e) => {
//     setSearchName(e.target.value);
//   };

//   if (!projectsStatus.task_assemble_status_counts) {
//     // Выводите загрузочное состояние или возвращайте null
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container">
//       <form className="search">
//         <label className="label-project-s">Project Name</label>
//         <input
//           className="input-project-s"
//           type="text"
//           value={searchName}
//           onChange={handleSearchChange} // Использование обработчика изменения
//         />
//       </form>
//       <div className="pagination-controls">
//         <button onClick={handlePreviousPage} disabled={currentPage === 1}>
//           Назад
//         </button>
//         <span>Страница {currentPage}</span>
//         <button onClick={handleNextPage}>
//           Вперед
//         </button>
//       </div>
//       <ProjectTable projects={projects} projectsStatus={projectsStatus}/>
//     </div>
//   );
// }

// export default Projects;