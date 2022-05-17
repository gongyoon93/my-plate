import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


import LandingPage from "./components/views/LandingPage/Landingpage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import NavBar from "./components/views/NavBar/NavBar";
import Auth from "./hoc/auth";

function App() {
  const AuthRegisterPage = Auth(RegisterPage, false);
  const AuthLoginPage = Auth(LoginPage, false);
  const AuthLandingPage = Auth(LandingPage, true);

  return (
    <>
      
      <Router>
      <div>
        <Routes>
          <Route path="/register" element={<AuthRegisterPage />} />
          <Route path="/login" element={<AuthLoginPage />} />
          <Route path="/" element={<AuthLandingPage />} />
        </Routes>
      </div>
    </Router>
    </>
  );
}
 
export default App;
