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
function App() {
  const [isloginorsignup,setisloginorsignup]=useState(false)

const [NotActive,setNotActive]=useState(false)
  return (
    <div className="container">
      <div className="MainLayoutContainer">
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={< Login ></Login>}></Route>
            <Route path="/signup" element={<SignUp></SignUp>}></Route>
            <Route path="/Community" element={<Community />} />
            <Route path="/Nutrition" element={<Nutrition />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/WorkoutHistory" element={< WorkoutHistory/>} />

            {/* /WorkoutHistory */}
            <Route path="/CustomWorkoutPlan" element={<CustomWorkoutPlan setNotActive={setNotActive}></CustomWorkoutPlan>}>
            
            </Route>
            <Route path="/LogWorkoutScreen" element={<LogWorkoutScreen></LogWorkoutScreen>}></Route>
            <Route path="/DetailWorkoutHistory" element={<DetailWorkoutHistory></DetailWorkoutHistory>}></Route>

            {/* DetailWorkoutHistory */}

            <Route path="*" element={<NotFound />} />

          </Routes>
        <NavBar isLoginSignUp={isloginorsignup} Active={NotActive} NotActive={NotActive}></NavBar>

        </Router>
        {/* <Home></Home> */}
      </div>
    </div>
  )
}

export default App
