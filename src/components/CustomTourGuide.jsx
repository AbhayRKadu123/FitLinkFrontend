import React, { useEffect, useState } from "react";
import "../styles/CustomTourGuide.css"
import MyContext from "../../public/utils/MyContext";
import { useContext } from "react";
import { useGetUserWeightChartQuery,useAddUserWeightMutation } from "../features/api/WeightTrackingApi";
 function getFormattedToday() {
        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0"); // 0-based month
        const day = String(today.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }
function LogWeightFunc({Input,SetInput,AddWeight}){
  return <div style={{
  display: "flex",
  gap: "8px",
  marginTop: "8px",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  flexDirection:'column'
}}>
  <input
    placeholder="Enter Your Weight"
    style={{
      padding: "8px 12px",
      borderRadius: "8px",
      border: "2px solid #8e44ad",
      background: "rgba(255,255,255,0.85)",
      width: "60%",
      fontSize: "0.9rem",
      outline: "none",
      boxShadow: "0 0 8px rgba(142, 68, 173, 0.5)",
      transition: "0.2s",
      color:'black'
    }}
    value={Input}
    onChange={(event)=>{SetInput(event.target.value)}}
    onFocus={(e) => e.target.style.boxShadow = "0 0 10px rgba(0,255,255,0.9)"}
    onBlur={(e) => e.target.style.boxShadow = "0 0 8px rgba(142, 68, 173, 0.5)"}
  />

  <button
    style={{
      padding: "8px 12px",
      borderRadius: "8px",
      fontSize: "0.9rem",
      border: "none",
      background: "linear-gradient(45deg, #8e44ad, #00ffff)",
      color: "#000",
      fontWeight: "bold",
      cursor: "pointer",
      boxShadow: "0 0 10px rgba(255,255,255,0.7)",
      transition: "0.2s"
    }}
    onMouseOver={(e) => e.target.style.transform = "scale(1.05)"}
    onMouseOut={(e) => e.target.style.transform = "scale(1)"}
    onClick={async ()=>{await AddWeight(Input)}}
  >
    Log Weight
  </button>
</div>

}
export default function TopRightFloatingRobot({ refetchUserWt,expanded,setShowTourGuide, setExpanded,ShowTourGuide,WeightUpdated, bannerText = "" }) {
const {data,isLoading,isError:ErrorGettingWeight,error}=useGetUserWeightChartQuery({TodaysDate:getFormattedToday()})
const [AddUserBodyWeight,{data:AddedWeight,isSuccess,isError}]=useAddUserWeightMutation()
const [Input,SetInput]=useState(0)
const {
        ShowNotification,
        setShowNotification,
        NotificatonType,
        setNotificatioinType,
        NotificationMessage,
        setNotificationMessage,
        

    } = useContext(MyContext);
async function  AddWeight(num=0) {
  if(!num || num==0)return
  console.log('num=',num)
  await AddUserBodyWeight({weight:num,TodaysDate:getFormattedToday()})
  
}
useEffect(()=>{
if(data && data?.Data){
  console.log('data?.Data',data?.Data)
  setShowTourGuide(false)
}
},[data])
useEffect(()=>{
if(isSuccess==true){
   setShowNotification(true)
        // NotificatonType('success')
        setNotificatioinType('success')
        // NotificationMessage('Weight Logged Successfully')
        setNotificationMessage('Weight Logged Successfully')
        refetchUserWt()

}
},[isSuccess])
console.log('useGetUserWeightChartQuery',data)
  return (
   <div
  style={{
    position: "fixed",
    top: expanded ? "20px" : "10px",
    left: expanded ? "auto" : "50%",
    right: expanded ? "40%" : "auto",
    transform: expanded ? "translate(-50%, -50%)" : "translateX(-50%)",
    zIndex: 9999,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    animation: "float 3s ease-in-out infinite",
    maxWidth: "220px",
  }}
>
      {/* Robot */}
      <svg
        width={expanded?'80':"20"}
        height={expanded?'120':"30"}
        viewBox="0 0 80 120"
        xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)"
        style={{ cursor: "pointer" }}
        onClick={() => setExpanded(!expanded)}
      > <rect x="20" y="40" width="40" height="50" fill="#00ffff" rx="5" stroke="#fff" strokeWidth="2" /> <rect x="25" y="10" width="30" height="30" fill="#ff00ff" rx="5" stroke="#fff" strokeWidth="2" /> <circle cx="35" cy="25" r="3" fill="#fff" /> <circle cx="55" cy="25" r="3" fill="#fff" /> <line x1="20" y1="50" x2="0" y2="70" stroke="#00ffcc" strokeWidth="5" /> <line x1="60" y1="50" x2="80" y2="70" stroke="#00ffcc" strokeWidth="5" /> <line x1="20" y1="60" x2="60" y2="60" stroke="#ffcc00" strokeWidth="2" /> </svg>


      {/* Toggle button */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          marginTop: "5px",
          padding: "2px 6px",
          fontSize: "0.6rem",
          borderRadius: "4px",
          border: "none",
          background: "#8e44ad",
          color: "#fff",
          cursor: "pointer"
        }}
      >
        {expanded ? "Minimise" : "Expand"}
      </button>

      {/* Banner (expandable with smooth transition) */}
      <div
        style={{
          marginTop: "5px",
          padding: expanded ? "8px 12px" : "0px",
          background: "linear-gradient(90deg, #ff00ff, #00ffff)",
          color: "#000",
          fontWeight: "bold",
          borderRadius: "6px",
          textAlign: "center",
          boxShadow: "0 0 10px rgba(255,255,255,0.7)",
          maxHeight: expanded ? "150px" : "0",
          overflowY: "auto",
          transition: "all 0.3s ease"
        }}
        className="RobotBanner"
      >
   {expanded && (
  ShowTourGuide ? (
    bannerText
  ) : !WeightUpdated ? (
    <LogWeightFunc Input={Input} SetInput={SetInput} AddWeight={AddWeight}  />
  ) : null
)}



      </div>

      {/* Floating animation */}
      <style>
        {`
      @keyframes float {
        0% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0); }
      }
    `}
      </style>
    </div>


  );
}
