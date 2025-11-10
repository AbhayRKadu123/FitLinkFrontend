import "../styles/HeadingContainer.css"
import { useNavigate } from "react-router-dom"
export default function HeadingContainer({Title}){
    const navigate=useNavigate()
    return  <div className="LogWorkoutScreenHeading">
                <img
                    onClick={() => navigate(-1)}
                    style={{ width: "1.5rem", height: "1.5rem", cursor: "pointer" }}
                    src="Images/left-arrow.png"
                    alt="back"
                />
                <h4 style={{ color: "black", marginLeft: "0.5rem", fontSize: "1.5rem" }}>
                    {Title}
                </h4>
            </div>
}