import "../styles/CommonHeader.css"
import { useNavigate } from "react-router-dom"
import HeartBadge from "./HeartBadge"
import { useContext } from "react"
import MyContext from "../../public/utils/MyContext"
export default function CommonHeader({ Title, ShowBadge }) {
    let navigate = useNavigate()
    const { HasNotification, setHasNotification } = useContext(MyContext);


    return <div className="CommunityContainerHeader">
        <div className="BackBtn"><img onClick={() => { navigate(-1) }} style={{ width: "2rem", height: '2rem' }} src="Images/backwhite.png"></img></div><div style={{ fontWeight: '600', fontSize: "1.6rem" }} className="Heading">{Title}</div><div className="LastSpace">
            
           {ShowBadge? <HeartBadge HasNotification={HasNotification} heartImage="Images/heart.png"
            count={7} onClick={() => { navigate("/AllNotification") }}></HeartBadge>:<div className="heart-container"></div>}
            
            </div>
    </div>
}
