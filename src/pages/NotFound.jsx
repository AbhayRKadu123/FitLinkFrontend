import { useEffect } from "react";
import "../styles/NotFoundContainer.css"
import { useNavigate } from "react-router-dom";

export default function NotFound({Active,setNotActive}){
    let navigate=useNavigate();
    useEffect(()=>{
let token=localStorage.getItem('token')
if(!token){
    navigate("/login")
}
    },[])
useEffect(()=>{
setNotActive(true)
    },[Active])
    return <div className="NotFoundContainer"><h1>NotFound</h1></div>
}