import "../styles/PremiumPlanContainer.css"
import UserWorkoutHistory from "../components/UserWorkoutHistory.jsx"
import { useNavigate } from "react-router-dom"
export default function PremiumPlanContainer(){
    const navigate=useNavigate()
    return <div className="PremiumPlanContainer">
        <div onClick={() => { navigate(-1) }} className="PremiumPlanBackBtn"><img className="backarrow" src="/Images/left-arrow.png" alt="back"></img></div>
<UserWorkoutHistory></UserWorkoutHistory>
    </div>
}