import React, { useState, useContext, useRef, useEffect } from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import SidebarLinks from "./SidebarLinks";
import { EmployeeData, TeamleadData, AdminData, ManagerData, QAData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";
import AuthContext from "../context/AuthContext";

function Navbar() {
  const [sidebar, setSidebar] = useState(true);
  const { user } = useContext(AuthContext);
  const toggleSidebar = () => setSidebar(!sidebar);

  // Ref for the navbar element
  const navbarRef = useRef(null);

  const roleData = {
    Admin: AdminData,
    Employee: EmployeeData,
    Teamlead: TeamleadData,
    Manager: ManagerData,
    QA: QAData,
    // Add more roles as needed
  };
  
  // Toggle sidebar when clicking on the button
  const handleButtonClick = (event) => {
    event.stopPropagation(); // Prevents the handleOutsideClick from being triggered
    toggleSidebar();
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setSidebar(true);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [sidebar]);

  return (
    <>
      <IconContext.Provider value={{ color: "#c5977e"}}>
        <nav ref={navbarRef} className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items">
            <li className="navbar-toggle">
              <span className="username" style={sidebar ? { display: "none" } : {}}>
              <img className="log-side" src="/logo192.jpg" alt="Logo" />
              </span>
              <Link to="#" className="menu-bars" onClick={handleButtonClick}>
                {sidebar ? (
                  <AiOutlineDoubleRight className="active-icon"/>
                ) : (
                  <AiOutlineDoubleLeft className="active-icon"/>
                )}
              </Link>
            </li>

            <SidebarLinks user={user} sidebar={sidebar} roleData={roleData} />
         
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
