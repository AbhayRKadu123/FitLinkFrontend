import "../styles/NutritionContainer.css"
import Premium from "./Premium"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react"

export default function Nutrition(){
    let navigate=useNavigate();
        useEffect(()=>{
    let token=localStorage.getItem('token')
    if(!token){
        navigate("/login")
    }
        },[])
    return <div className="NutritionContainer">
        <Premium></Premium>
    </div>
}