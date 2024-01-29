import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Stock from "./pages/Stock/Stock";
import Login from "./pages/Login/LoginPage";
import EmployeeProfile from "./pages/EmployeeProfile/EmployeeProfile";
import TeamLeadProfile from "./pages/TeamLeadProfile/TeamLeadProfile";
import Projects from "./pages/Projects/Projects";

import ProjectAnalyze from "./pages/Admin/ProjectAnalyze/ProjectAnalyzeLogic";
import ProjectAnalyzeCreate from "./pages/Admin/ProjectsCreate/ProjectsCreateLogic";
import TeamsList from "./pages/Admin/TeamsList/TeamsListLogic";
import TeamsCreate from "./pages/Admin/TeamsCreate/TeamsCreateLogic";
import TeamsUpdate from "./pages/Admin/TeamsUpdate/TeamsUpdateLogic";
import StockProjectsExterior from "./pages/Admin/StockProjectsExterior/StockProjectsExteriorLogic";
import Region from "./pages/Admin/RegionCreate/RegionCreateLogic";
import UsersCreate from "./pages/Admin/UserCreate/UserCreateLogic";
import DashboardAll from "./pages/Admin/DashboardAll/DashboardAllLogic";
import InprogressAll from "./pages/Admin/InProgressAll/InProgressAllLogic";
import CompleteAll from "./pages/Admin/CompleteAll/CompleteAll";
import CheckedTaskAll from "./pages/Admin/CheckedTaskAll/CheckedTaskAll"

import RatingList from "./pages/RatingList/RatingListLogic";
import ProjectsStockTeamLead from "./pages/Projects/ProjectsStockTeamLead";
import ProjectsListTeamLead from "./pages/Projects/ProjectsListTeamLead";
import ProjectDetail from "./pages/ProjectDetail/ProjectDetail";
import UpdateProject from "./pages/ProjectDetail/UpdateProject";
import Complete from "./pages/Complete/Complete";
import InProgress from "./pages/InProgress/InProgress";
import UsersList from "./pages/Admin/UsersList/UsersList";
import UsersListDetail from "./pages/UsersListDetail/UsersListDetail";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Secure from "./pages/Secure/Secure";
import Assemble from "./pages/CalculatePage/pages/assemble";
import Gltf from "./pages/CalculatePage/pages/gltf";
import With from "./pages/CalculatePage/pages/with";
import Without from "./pages/CalculatePage/pages/without";
import VillaWithout from "./pages/CalculatePage/pages/villa_without";
import VillaWith from "./pages/CalculatePage/pages/villa_with";
import Upload from "./pages/CalculatePage/pages/upload";
import StorageStatus from "./pages/Admin/StorageStatus/StorageStatus";
import CompleteLoading from "./pages/CompleteLoading/CompleteLoading";
import CheckedTask from "./pages/CheckedTask/CheckedTask"
import RenderProperty from "./pages/CalculatePage/pages/renderProperty"
// import { routes } from "./routes";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Navbar />
              <Routes>
                <Route path="/login" element={<Login />} />
                        <Route path="/" element={<Home />} />
                        <Route path="/stock/employee/" element={<Stock />} />
                        <Route path="/profile/employee/" element={<EmployeeProfile />} />
                        <Route path="/profile/teamlead/" element={<TeamLeadProfile />} />
                        <Route path="/complete/" element={<Complete />} />
                        <Route path="/complete-load/" element={<CompleteLoading/>}/>
                        <Route path="/secure/" element={<Secure />} />
                        <Route path="/in-progress/" element={<InProgress />} />
                        <Route path="/checked/employee/" element={<CheckedTask />} />
                        <Route path="/checked/all/" element={<CheckedTaskAll />} />

                        <Route path="/teams-list/" element={<TeamsList />} />
                        <Route path="/teams-list/create" element={<TeamsCreate />} />
                        <Route path="/teams-list/:id/" element={<TeamsUpdate />} />

                        <Route path="/projects-list/" element={<ProjectAnalyze />} />
                        <Route path="/projects-list/create/" element={<ProjectAnalyzeCreate />} />
                        <Route path="/projects-list/stock/" element={<StockProjectsExterior />} />
                        <Route path="/region" element={<Region />} />
                        <Route path="/rating" element={<RatingList />} />
                        <Route path="/dashboard" element={<DashboardAll />} />
                        <Route path="/in-progress-all/" element={<InprogressAll />} />
                        <Route path="/complete-all/" element={<CompleteAll />} />
                        <Route path="/storage/" element={<StorageStatus />} />

                        <Route path="/projects/" element={<Projects />} />
                        <Route path="/project/team-lead/list/" element={<ProjectsListTeamLead />} />
                        <Route path="/project/team-lead/list/stock/" element={<ProjectsStockTeamLead />} />

                        <Route path="/users-list/" element={<UsersList />} />
                        <Route path="/users-list/:id/" element={<UsersListDetail />} />
                        <Route path="/user/create" element={<UsersCreate />} />

                        <Route path="/project/:id/" element={<ProjectDetail />} />
                        <Route path="/project/update/:id/" element={<UpdateProject />} />

                        <Route path="/project/:id/tower/" element={<Assemble />} />
                        <Route path="/project/:id/tower/assemble" element={<Assemble />} />
                        <Route path="/project/:id/tower/with" element={<With />} />
                        <Route path="/project/:id/tower/gltf" element={<Gltf />} />
                        <Route path="/project/:id/tower/upload" element={<Upload />} />
                        <Route path="/project/:id/tower/without" element={<Without />} />
                        <Route path="/project/:id/tower/render" element={<RenderProperty />} />

                        <Route path="/project/:id/villa/gltf" element={<Gltf />} />
                        <Route path="/project/:id/villa/upload" element={<Upload />} />
                        <Route path="/project/:id/villa/" element={<VillaWithout />} />
                        <Route path="/project/:id/villa/without" element={<VillaWithout />} />
                        <Route path="/project/:id/villa/with" element={<VillaWith />} />
                        <Route path="/project/:id/villa/render" element={<RenderProperty />} />

                  {/* {routes.map((page) => (
                  <Route key={page.path} path={page.path} element={page.Element} />
                  ))} */}
              </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
