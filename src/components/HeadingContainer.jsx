import "../styles/HeadingContainer.css"
import { useNavigate } from "react-router-dom"
export default function HeadingContainer({isColorBlack,Title}){
    const navigate=useNavigate()
    return  <div style={{backgroundColor:isColorBlack?"black":"white"}} className="LogWorkoutScreenHeading">
                <img
                    onClick={() => navigate(-1)}
                    style={{ width: "1.5rem", height: "1.5rem", cursor: "pointer" }}
                    src={isColorBlack?"Images/backwhite.png":"Images/left-arrow.png"}
                    alt="back"
                />
                <h4 style={{ color:isColorBlack? "white":"black", marginLeft: "0.5rem", fontSize: "1.5rem" }}>
                    {Title}
                </h4>
            </div>
}