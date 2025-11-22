import "./App.css"
import "shepherd.js/dist/css/shepherd.css";

import Home from "./pages/Home"
import NavBar from "./components/NavBar"
import Community from "./pages/Community";
import Nutrition from "./pages/Nutrition";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import UserDetails from "./pages/UserDetails";
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
import socket from "../public/utils/SocketConnect";
import { createContext } from "react";
import MyContext from "../public/utils/MyContext";
import AllNotification from "./pages/AllNotification";
import TourGuide from "./components/TourGuide";
import FuturisticRobotBanner from "./components/CustomTourGuide";
function App() {
  const [isloginorsignup, setisloginorsignup] = useState(false)
  const [tourStep, setTourStep] = useState(0);

  const [NotActive, setNotActive] = useState(false)
   const [HasNotification, setHasNotification] = useState(false);
   function RouteWatcher() {
  const location = useLocation();

  useEffect(() => {
    console.log("Current path:", location.pathname);
  }, [location.pathname]);

  return null; // doesn’t render anything
}
 
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

  // useEffect
  // console.log("location.pathname=",location.pathname)


useEffect(() => {
  
  socket.emit("UserJoined",{Id:localStorage.getItem("UserId")})
  socket.on("OnlineUsers",(lst)=>{
    console.log('lst-',lst)
  })
  socket.on("Notification",(data)=>{
    console.log('Notification Data',data)
  })
  
  return () => socket.off("UserJoined");
}, []);

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
        localStorage.removeItem("UserId");

        navigate("/login");
      }
    }, [location.pathname, navigate]);

    return children;
  }
   const steps = [
    {
      text: "Click here to create your custom workout plan",
      target: ".WorkoutPlansCard",
    },
    {
      text: "Select your workout days",
      target: ".WorkoutDaysSection",
    },
    {
      text: "Click next to continue",
      target: ".NextButton",
    }
  ];
  return (
    <Router>
      <RouteWatcher></RouteWatcher>
      
      <MyContext.Provider value={{ HasNotification, setHasNotification}}>
            {/* <TourGuide> */}

      <div className="container">
        <div className="MainLayoutContainer">
          {/* <button onClick={() => setTourStep(1)}>Start App Tour</button>  */}
          


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
              <Route path="/UserDetail" element={< UserDetails></ UserDetails>}></Route>
              <Route path="/AllNotification" element={<AllNotification></AllNotification>}></Route>

              {/* /UserDetail */}

              {/* DetailWorkoutHistory */}

              <Route path="*" element={<NotFound />} />

            </Routes>
            <FuturisticRobotBanner  ></FuturisticRobotBanner>
            {/* <button onClick={() => window.startAppTour()}>
  Start Guide
</button>

<TourGuide /> */}

            <NavBar isLoginSignUp={isloginorsignup} Active={NotActive} NotActive={NotActive}></NavBar>
          </TokenChecker>
          {/* <Home></Home> */}
        </div>
      </div>
      {/* </TourGuide> */}
      </MyContext.Provider>
    </Router>

  )
}

export default App
