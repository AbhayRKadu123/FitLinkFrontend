// import dotenv from "dotenv";
// dotenv.config();

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
import {useGetUserWeightChartQuery} from "../src/features/api/WeightTrackingApi.js"
import LogWorkoutScreen from "./pages/LogWorkoutScreen";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useGetUserDetailsQuery } from "../src/features/api/UserApi"
import { useRef } from "react";

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
import Notification from "./components/ToastNotification";
import WeightHistoryChart from "./pages/WeightHistoryChart";
import BannerContext from "../public/utils/BannerContext";
import MessagePage from "./pages/MessagePage.jsx";
import SpecificPlanWorkoutHistory from "./pages/SpecificPlanWorkoutHistory.jsx";
import { ToastContainer } from 'react-toastify';
import PremiumPlanContainer from "./pages/PremiumPlanExercisePlan.jsx";
import 'react-toastify/dist/ReactToastify.css';
import AddProgressPhoto from "./pages/AddProgressPhoto.jsx";
import { enablePush } from "../public/utils/push.js";
import ForgotPasswordscreen from "./pages/ForgotPasswordscreen.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";
import TermsAndCondition from "./pages/TermsAndCondition.jsx";
import ProfileSetting from "./pages/ProfileSetting.jsx";
function App() {
  //  function getFormattedToday() {
  //       const today = new Date();

  //       const year = today.getFullYear();
  //       const month = String(today.getMonth() + 1).padStart(2, "0"); // 0-based month
  //       const day = String(today.getDate()).padStart(2, "0");

  //       return `${year}-${month}-${day}`;
  //   }
  function getFormattedToday() {
  // const utcNow = new Date().toISOString();
  const utcDate = new Date();
  console.log('utcDate',utcDate)
const istDate = new Date(utcDate.getTime() + (5.5 * 60 * 60 * 1000));
console.log('isodate',istDate.toISOString()?.split('T')[0]);

  return istDate.toISOString()?.split('T')[0]
}
  const [isloginorsignup, setisloginorsignup] = useState(false)
  const [tourStep, setTourStep] = useState(0);
  const [ShowNotification, setShowNotification] = useState(false);
  const [NotificatonType, setNotificatioinType] = useState('success');
  const [NotificationMessage, setNotificationMessage] = useState("")
  const [selecteddays, setselecteddays] = useState([])
  const [expanded, setExpanded] = useState(true);
  const[HasNotification, setHasNotification]=useState(false)

  const [NotActive, setNotActive] = useState(false)
  const [ShowBot, setShowBot] = useState(false)
  const [bannerText, setbannerText] = useState("")
  const [WeightUpdated,setWeightUpdated]=useState(false)
  const [ShowTourGuide,setShowTourGuide]=useState(false)
  // const bannerTextRef = useRef("");

  const [useDiffBannerText, setuseDiffBannerText] = useState(false);
  let { data, refetch, isLoading, error } = useGetUserDetailsQuery({ Id: null })
const {data:UserWeight,isLoading:LoadingUserWeight,refetch:refetchUserWt,isError:ErrorGettingWeight}=useGetUserWeightChartQuery({TodaysDate:getFormattedToday()})

  function RouteWatcher() {
    const location = useLocation();

    useEffect(() => {
      console.log("Current path:", location.pathname);
      if (location.pathname == '/') {
        setbannerText('Click on CustomWorkoutCard')
        // bannerTextRef.current='Click on CustomWorkoutCard'
        // setExpanded(true)
      } if (location.pathname == '/CustomWorkoutPlan' && useDiffBannerText == false) {
        setbannerText('Now Select The Days You Want to workout and click on Save and Next')
        // setExpanded(true)

        // bannerTextRef.current='Now Select The Days You Want to workout and click on Save and Next'


      } if(location.pathname=='/Community'){
        setbannerText('Buy Premium to access Social Tab')


      }
      if(location.pathname=='/Nutrition'){
        setbannerText('Buy Premium to access Nutrition Tab')


      }
        if(location.pathname=='/Profile'){
        setbannerText('Update Your Profile ')


      }
      if(location.pathname=='/signup'||location.pathname=="/login"|| location.pathname=="/ForgotPassword  qa"){
        setShowBot(false)
      }
    }, [location.pathname]);

    return null; // doesn’t render anything
  }
  useEffect(() => {
    console.log('data from APP.jsx', data?.Detail[0]?.LoginCount)
    if (data?.Detail && data?.Detail[0]?.LoginCount < 2 && data?.Detail[0]?.CustomWorkoutPlanActivated!=true ) {
      setShowTourGuide(true)
      setShowBot(true)


    }else if(WeightUpdated==false){
      setShowTourGuide(false)
      setShowBot(true)

    }
  }, [data])
  
  useEffect(()=>{
    if(UserWeight && UserWeight?.Data){
setShowBot(false)

    }
  },[UserWeight])
  // function isTokenExpired() {
  //   const token = localStorage.getItem("token");
  //   if (!token) return true;

  //   try {
  //     const parts = token.split(".");
  //     if (parts.length !== 3) return true; // invalid structure

  //     const payload = JSON.parse(atob(parts[1]));
  //     const currentTime = Date.now() / 1000;

  //     // If no exp field, consider it invalid too
  //     if (!payload.exp) return true;

  //     return payload.exp < currentTime;
  //   } catch (err) {
  //     console.error("Invalid or tampered token:", err);
  //     return true;
  //   }
  // }
  function isTokenExpired() {
  const token = localStorage.getItem("token");
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    // If JWT has no expiration, consider it VALID
    if (!payload.exp) return false;

    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  } catch {
    return true;
  }
}


  // useEffect
  // console.log("location.pathname=",location.pathname)


  useEffect(() => {

    socket.emit("UserJoined", { Id: localStorage.getItem("UserId") })
    socket.on("OnlineUsers", (lst) => {
      console.log('lst-', lst)
    })
    socket.on("Notification", (data) => {
      console.log('Notification Data', data)
    })

    return () => socket.off("UserJoined");
  }, []);

  // Component wrapper that checks token on route change
  function TokenChecker({ children }) {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
      const publicRoutes = ["/login", "/signup","/ForgotPassword"];
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

      <MyContext.Provider value={{HasNotification, setHasNotification, ShowNotification, setShowNotification, NotificatonType, setNotificatioinType, NotificationMessage, setNotificationMessage, selecteddays, setselecteddays }}>
        {/* <TourGuide> */}
        <BannerContext.Provider value={{ bannerText, setbannerText, useDiffBannerText, setuseDiffBannerText }}>


          <div  className="container">
            <div  className="MainLayoutContainer">
            {/* <button onClick={()=>{enablePush()}}>Enable Notification</button> */}

             <ToastContainer  toastStyle={{ width: "80%",top:'1rem' }} position="top-center" />

            
              {/* <button onClick={() => setTourStep(1)}>Start App Tour</button>  */}
              {ShowNotification && <Notification type={NotificatonType} message={NotificationMessage} onClose={() => { setShowNotification(false) }} ></Notification>}



              <TokenChecker>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={< Login ></Login>}></Route>
                  <Route path="/signup" element={<SignUp></SignUp>}></Route>
                  <Route path="/ForgotPassword" element={<ForgotPasswordscreen></ForgotPasswordscreen>}></Route>
                  <Route path="/Community" element={<Community />} />
                  <Route path="/Nutrition" element={<Nutrition />} />
                  <Route path="/Profile" element={<Profile />} />
                  <Route path="/WorkoutHistory" element={< WorkoutHistory />} />
                  <Route path="/AddProgressPhoto" element={< AddProgressPhoto />} />
                  <Route path="/ChangePassword" element={< ChangePassword />}></Route>
                  <Route path="/ProfileSetting" element={< ProfileSetting></ProfileSetting>}></Route>
                  <Route path="/TermsAndCondition" element={<TermsAndCondition></TermsAndCondition>}></Route>
              

                  <Route path="/WeightHistory" element={< WeightHistoryChart />} />
                  <Route path="/SpecificPlanWorkoutHistory" element={< SpecificPlanWorkoutHistory />} />
                  {/* MessagePage */}
                  <Route path="/MessagePage" element={<MessagePage />} />
                  <Route path="/Premium/PushPullLegPlan" element={<PremiumPlanContainer/>} />

                 


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
                {/* {ShowBot && <FuturisticRobotBanner bannerText={bannerText}  ></FuturisticRobotBanner>}
              
              */}
                {/* {ShowBot && <FuturisticRobotBanner refetchUserWt={refetchUserWt} setShowTourGuide={setShowTourGuide} ShowTourGuide={ShowTourGuide} WeightUpdated={WeightUpdated} expanded={expanded}  setExpanded={setExpanded}  bannerText={bannerText} />} */}


                

                <NavBar isLoginSignUp={isloginorsignup} Active={NotActive} NotActive={NotActive}></NavBar>
              </TokenChecker>
              {/* <Home></Home> */}
            </div>
          </div>
          {/* </TourGuide> */}
        </BannerContext.Provider>

      </MyContext.Provider>
    </Router>

  )
}

export default App
