import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import SecureComponent from "./SecureHtml.jsx";

function Secure() {
  const { authTokens, logoutUser } = useContext(AuthContext);
  const [stocksSecure, setStockSecure] = useState([]);
  const [stocksOpen, setStocksOpen] = useState([]);
  const [selectUser, setSelectUser] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const GetSecure = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${process.env.REACT_APP_URL}/api/secure/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      });

      if (response.status === 200) {
        const data = await response.json();


        setStocksOpen(data.tasks_open);
        setSelectUser(data.team_members);
        setStockSecure(data.tasks);
      } else if (response.status === 401) {
        logoutUser();
      }
    } catch (error) {
      console.error("Error fetching stock:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetSecure();
  }, [authTokens.access, logoutUser]);

  const handleSelectChange = (index, value) => {
    const updatedSelectedUsers = [...selectedUsers];
    updatedSelectedUsers[index] = value;
    setSelectedUsers(updatedSelectedUsers);
  };

  const updateTaskStatus = async (id, UserTask) => {
    console.log(selectedUsers);
    const userConfirmed = window.confirm("Вы уверены, что хотите продолжить?");

    if (userConfirmed && !loading) {
      try {
        setLoading(true);

        const requestBody = {
          stock_active: "True",
        };

        if (UserTask !== null && UserTask !== undefined) {
          requestBody.task_employee_user = UserTask;
        }

        const response = await fetch(
          `${process.env.REACT_APP_URL}/api/secure/${id}/`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + String(authTokens.access),
            },
            body: JSON.stringify(requestBody),
          }
        );

        if (response.status === 200) {
          GetSecure();
        } else if (response.status === 401) {
          logoutUser();
        }
      } catch (error) {
        console.error("Error updating task status:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <SecureComponent
      stocksSecure={stocksSecure}
      stocksOpen={stocksOpen}
      selectUser={selectUser}
      selectedUsers={selectedUsers}
      handleSelectChange={handleSelectChange}
      updateTaskStatus={updateTaskStatus}
    />
  );
}

export default Secure;
