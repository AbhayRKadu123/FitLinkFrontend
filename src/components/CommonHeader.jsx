import "../styles/CommonHeader.css"
import { useNavigate } from "react-router-dom"
import HeartBadge from "./HeartBadge"
import { useContext } from "react"
import MyContext from "../../public/utils/MyContext"
import { toast } from "react-toastify"
export default function CommonHeader({ Title, ShowBadge,SocketStatus,VideoCall }) {
    let navigate = useNavigate()
    const { HasNotification, setHasNotification } = useContext(MyContext);


    return <div className="CommunityContainerHeader">
        <div className="BackBtn"><img onClick={() => { navigate(-1) }} style={{ width: "2rem", height: '2rem' }} src="Images/backwhite.png"></img></div><div style={{ fontWeight: '600', fontSize: "1.6rem" }} className="Heading">{Title}</div><div className="LastSpace">
            {VideoCall&&<img onClick={()=>{return toast.warning("Video Calling feature is not available yet!")}} style={{width:'1.3rem',height:'1.3rem',marginRight:'0.3rem'}} src="Images/video-camera (1).png"></img>}
           {ShowBadge? <HeartBadge HasNotification={HasNotification} heartImage="Images/heart.png"
            count={7} onClick={() => { navigate("/AllNotification") }}></HeartBadge>:<div className="heart-container"></div>}
            {SocketStatus&&<span>{SocketStatus}</span>}
            
            </div>
    </div>
}
