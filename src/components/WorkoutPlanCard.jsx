
import "../styles/WorkoutPlanCard.css"
import { useNavigate } from "react-router-dom"
import { useContext } from "react";
import MyContext from "../../public/utils/MyContext";
export default function WorkoutPlanCard({ Url, Title, Description,comingSoon,NavGateTo }) {
    const navigate=useNavigate();
    const {
  ShowNotification,
  setShowNotification,
  NotificatonType,
  setNotificatioinType,
  NotificationMessage,
  setNotificationMessage
} = useContext(MyContext);

    return (
        <div
            style={{
                backgroundImage: `url(${Url})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            className={`WorkoutPlansCard ${comingSoon ? 'coming-soon-card' : ''}`}
            onClick={()=>{
                navigate("/CustomWorkoutPlan")
            }}
        >
            {comingSoon && (
                <div className="coming-soon-badge">
                    COMING SOON
                </div>
            )}
            <h5 style={{ color: 'white', fontSize: '2rem', fontWeight: '600' }}>
                {Title}
            </h5>
            <span>{Description}</span>
        </div>
    )
}