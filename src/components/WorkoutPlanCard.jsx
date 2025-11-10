
import "../styles/WorkoutPlanCard.css"
import { useNavigate } from "react-router-dom"
export default function WorkoutPlanCard({ Url, Title, Description,comingSoon,NavGateTo }) {
    const navigate=useNavigate();
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