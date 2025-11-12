import "./App.css"
import Home from "./pages/Home"
import NavBar from "./components/NavBar"
import Community from "./pages/Community";
import Nutrition from "./pages/Nutrition";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import HeaderTop from "./components/Header";
import React, { useState } from "react";
import CustomWorkoutPlan from "./pages/WorkoutPlansPages/CustomWorkoutPlans";
import LogWorkoutScreen from "./pages/LogWorkoutScreen";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import WorkoutHistory from "./pages/WorkoutHistory";
import DetailWorkoutHistory from "./pages/DetailWorkoutHistory";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
function App() {
  const [isloginorsignup, setisloginorsignup] = useState(false)

  const [NotActive, setNotActive] = useState(false)
  function isTokenExpired() {
    const token = localStorage.getItem("token");
    if (!token) return true;

    try {
      const parts = token.split(".");
      if (parts.length !== 3) return true; // invalid structure

      const payload = JSON.parse(atob(parts[1]));
      const currentTime = Date.now() / 1000;

      // If no exp field, consider it invalid too
      if (!payload.exp) return true;

      return payload.exp < currentTime;
    } catch (err) {
      console.error("Invalid or tampered token:", err);
      return true;
    }
  }


  // Component wrapper that checks token on route change
  function TokenChecker({ children }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
      const publicRoutes = ["/login", "/signup"];
      if (publicRoutes.includes(location.pathname)) return; // ✅ Skip check for login/signup

      if (isTokenExpired()) {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/login");
      }
    }, [location.pathname, navigate]);

    return children;
  }
  return (
    <Router>
      <div className="container">
        <div className="MainLayoutContainer">

          <TokenChecker>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={< Login ></Login>}></Route>
              <Route path="/signup" element={<SignUp></SignUp>}></Route>
              <Route path="/Community" element={<Community />} />
              <Route path="/Nutrition" element={<Nutrition />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/WorkoutHistory" element={< WorkoutHistory />} />

              {/* /WorkoutHistory */}
              <Route path="/CustomWorkoutPlan" element={<CustomWorkoutPlan setNotActive={setNotActive}></CustomWorkoutPlan>}>

              </Route>
              <Route path="/LogWorkoutScreen" element={<LogWorkoutScreen></LogWorkoutScreen>}></Route>
              <Route path="/DetailWorkoutHistory" element={<DetailWorkoutHistory></DetailWorkoutHistory>}></Route>

              {/* DetailWorkoutHistory */}

              <Route path="*" element={<NotFound />} />

            </Routes>
            <NavBar isLoginSignUp={isloginorsignup} Active={NotActive} NotActive={NotActive}></NavBar>
          </TokenChecker>
          {/* <Home></Home> */}
        </div>
      </div>
    </Router>

  )
}

export default App
