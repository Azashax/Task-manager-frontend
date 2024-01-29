import React from 'react';
import { FaUser, FaHome, FaUsers } from 'react-icons/fa';
import { TbProgressBolt, TbProgressCheck } from 'react-icons/tb';
import { SiProgress } from "react-icons/si";
import { VscSourceControl } from "react-icons/vsc";
import { PiBuildingsFill , PiBuildingsBold   , PiBuildings   } from "react-icons/pi";
import { FaMedal } from "react-icons/fa6";
import { MdOutlineStorage } from "react-icons/md";
import { ImCheckboxChecked } from "react-icons/im";
import { FaUserGroup } from "react-icons/fa6";
import "./Navbar.css";

export const TeamleadData = [
  {
    title: 'Profile',
    path: '/profile/teamlead',
    icon: <FaUser className="active-icon" />,
    cName: 'nav-text'
  },
  {
    title: 'In Progress',
    path: '/in-progress',
    icon: <TbProgressBolt className="active-icon" />,
    cName: 'nav-text'
  },
  {
    title: 'Secure',
    path: '/secure',
    icon: <VscSourceControl className="active-icon" />,
    cName: 'nav-text'
  },
  {
    title: 'Complete',
    path: '/complete',
    icon: <TbProgressCheck className="active-icon" />,
    cName: 'nav-text'
  },
  {
    title: 'Checked',
    path: '/checked/all/',
    icon: <ImCheckboxChecked  className="active-icon" />,
    cName: 'nav-text'
  },
  {
    title: 'Rating',
    path: '/rating/',
    icon: <FaMedal className="active-icon" />,
    cName: 'nav-text'
  },
  {
    title: 'Projects',
    path: '/projects',
    icon: <PiBuildings   className="active-icon" />,
    cName: 'nav-text'
  },
  {
    title: 'ProjectsStock',
    path: '/project/team-lead/list/stock/',
    icon: <PiBuildingsFill  className="active-icon" />,
    cName: 'nav-text'
  },
  {
    title: 'My Projects',
    path: '/project/team-lead/list/',
    icon: <PiBuildingsBold    className="active-icon" />,
    cName: 'nav-text'
  },
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <SiProgress className="active-icon" />,
    cName: 'nav-text'
  },
  {
    title: 'Home',
    path: '/',
    icon: <FaHome className="active-icon" />,
    cName: 'nav-text'
  },
];

export const EmployeeData = [
  {
    title: 'Profile',
    path: '/profile/employee',
    icon: <FaUser className="active-icon" />,
    cName: 'nav-text'
  },
  {
    title: 'Stock',
    path: '/stock/employee',
    icon: <TbProgressBolt className="active-icon" />,
    cName: 'nav-text'
  },
  {
    title: 'Complete',
    path: '/complete-load/',
    icon: <TbProgressCheck className="active-icon" />,
    cName: 'nav-text'
  },
  {
    title: 'Checked',
    path: '/checked/employee/',
    icon: <ImCheckboxChecked  className="active-icon" />,
    cName: 'nav-text'
  },
  {
    title: 'Rating',
    path: '/rating/',
    icon: <FaMedal className="active-icon" />,
    cName: 'nav-text'
  },

  {
    title: 'Home',
    path: '/',
    icon: <FaHome className="active-icon" />,
    cName: 'nav-text'
  },
];

export const AdminData = [
  {
    title: 'Storage',
    path: '/storage/',
    icon: <MdOutlineStorage  className="active-icon" />,
    cName: 'nav-text'
  },
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <SiProgress className="active-icon" />,
    cName: 'nav-text'
  },
  {
    title: 'In Progress',
    path: '/in-progress-all/',
    icon: <TbProgressBolt className="active-icon" />,
    cName: 'nav-text'
  },
  {
    title: 'Projects',
    path: '/projects-list',
    icon: <PiBuildingsFill className="active-icon" />,
    cName: 'nav-text'
  },
  {
    title: 'Stock Exterior',
    path: '/projects-list/stock',
    icon: <PiBuildingsFill className="active-icon" />,
    cName: 'nav-text'
  },
  {
    title: 'Complete',
    path: '/complete-all/',
    icon: <TbProgressCheck className="active-icon" />,
    cName: 'nav-text'
  },
  {
    title: 'Checked',
    path: '/checked/all/',
    icon: <ImCheckboxChecked  className="active-icon" />,
    cName: 'nav-text'
  },
  {
    title: 'Teams',
    path: '/teams-list',
    icon: <FaUsers className="active-icon" />,
    cName: 'nav-text'
  },
  {
    title: 'Users',
    path: '/users-list/',
    icon: <FaUserGroup className="active-icon" />,
    cName: 'nav-text'
  },
  {
    title: 'Rating',
    path: '/rating/',
    icon: <FaMedal className="active-icon" />,
    cName: 'nav-text'
  },
  {
    title: 'Home',
    path: '/',
    icon: <FaHome className="active-icon" />,
    cName: 'nav-text'
  },
];

export const ManagerData = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <SiProgress className="active-icon" />,
    cName: 'nav-text'
  },
  {
    title: 'In Progress',
    path: '/in-progress-all/',
    icon: <TbProgressBolt className="active-icon" />,
    cName: 'nav-text'
  },
  {
    title: 'Stock Exterior',
    path: '/projects-list/stock',
    icon: <PiBuildingsFill  className="active-icon" />,
    cName: 'nav-text'
  },
  {
    title: 'Rating',
    path: '/rating/',
    icon: <FaMedal className="active-icon" />,
    cName: 'nav-text'
  },
  {
    title: 'Home',
    path: '/',
    icon: <FaHome className="active-icon" />,
    cName: 'nav-text'
  },
];

export const QAData = [
  {
    title: 'Complete',
    path: '/complete-all/',
    icon: <TbProgressCheck className="active-icon" />,
    cName: 'nav-text'
  },
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <SiProgress className="active-icon" />,
    cName: 'nav-text'
  },
  {
    title: 'Home',
    path: '/',
    icon: <FaHome className="active-icon" />,
    cName: 'nav-text'
  },
];
