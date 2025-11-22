// import { act, useEffect, useState } from "react"
// import "../styles/NavBar.css"
// // import { useNavigate } from "react-router-dom"
// import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";

// function NavIcon({url,label,isActiveTab,OnClick}) {
//      const location = useLocation();
//     console.log('location.pathname=',location.pathname)
//     return <span onClick={OnClick}  className={`${isActiveTab ? "BackgroundColorActiveTab" : ""}`} style={{
//         display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center",height:'100%',width:"4rem"
//     }}><img style={{ width: '2rem', height: '2rem' }} src={url}></img><span style={{ fontSize: "0.8rem", marginTop: "0.2rem" }}>{label}</span></span>
// }

// export default function NavBar({NotActive,isLoginSignUp}) {
//     let [activetab,setactivetab]=useState('home')
//     useEffect(()=>{
//         if(NotActive){
// setactivetab('')

//         }
//     },[NotActive])
//     const navigate=useNavigate();
// //     useEffect(()=>{
// // navigate(`/${activetab}`)
// //     },[activetab])
//     return <div style={(location.pathname === '/login'||location.pathname === '/signup') ? { display: 'none' } : {}}  className="NavBar">
//         {/* <span style={{
//             display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center", marginTop: "0.2rem", marginBottom: "0.1rem"
//         }}><img style={{ width: '2rem', height: '2rem' }} src="../../public/Images/homewhite.png"></img><span style={{ fontSize: "0.8rem", marginTop: "0.2rem" }}>Home</span></span> */}
//         <NavIcon url={activetab==="home"?"Images/homeRed.png":"Images/homewhite.png"} label={'Home'} isActiveTab={activetab==='home'} OnClick={()=>{setactivetab('home'),navigate("/");}}></NavIcon>
//         <NavIcon url={activetab==="social"?'Images/peoplegroupred.png':"Images/peoplegroup.png"} label={'Social'} isActiveTab={activetab==="social"} OnClick={()=>{setactivetab('social'),navigate("/Community")}}></NavIcon>
//         <NavIcon url={activetab==="nutrition"?'Images/applered.png':"Images/applewhite.png"} label={'Nutrition'} isActiveTab={activetab==="nutrition"} OnClick={()=>{setactivetab('nutrition'),navigate("/Nutrition")}}></NavIcon>
//         <NavIcon url={activetab==="profile"?'Images/avatarred.png':"Images/avatarwhite.png"} label={'Profile'} isActiveTab={activetab==="profile"} OnClick={()=>{setactivetab('profile'),navigate("/Profile")}}></NavIcon>


//     </div>
// }
// // #F5290B

import { act, useEffect, useState } from "react"
import "../styles/NavBar.css"
// import { NavLink, useLocation } from "react-router-dom";
// 
// import { useNavigate } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { NavLink } from "react-router-dom";

function NavIcon({ to, label, activeIcon, inactiveIcon }) {
  return (
    <NavLink
      to={to}
      style={{
        textDecoration: "none",
        color: "inherit",
      }}
      className={({ isActive }) =>
        isActive ? "BackgroundColorActiveTab" : ""
      }
    >
      {({ isActive }) => (
        <span
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "4rem",
          }}
        >
          <img
            src={isActive ? activeIcon : inactiveIcon}
            style={{ width: "2rem", height: "2rem" }}
          />
          <span className={isActive&&'ActiveLabel'}  style={{ fontSize: "0.8rem", marginTop: "0.2rem" }}>
            {label}
          </span>
        </span>
      )}
    </NavLink>
  );
}



export default function NavBar() {
  const location = useLocation();

  const hide =
    location.pathname === "/login" || location.pathname === "/signup";

  if (hide) return null;

  return (
    <div className="NavBar">
      <NavIcon
        to="/"
        label="Home"
        activeIcon="Images/homeRed.png"
        inactiveIcon="Images/homewhite.png"
      />

      <NavIcon
        to="/Community"
        label="Social"
        activeIcon="Images/peoplegroupred.png"
        inactiveIcon="Images/peoplegroup.png"
      />

      <NavIcon
        to="/Nutrition"
        label="Nutrition"
        activeIcon="Images/applered.png"
        inactiveIcon="Images/applewhite.png"
      />

      <NavIcon
        to="/Profile"
        label="Profile"
        activeIcon="Images/avatarred.png"
        inactiveIcon="Images/avatarwhite.png"
      />
    </div>
  );
}