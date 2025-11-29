import { useNavigate } from "react-router-dom";
import "../styles/WorkoutPlanType_History.css";

function WorkoutPlanType_History({To}) {
    const navigate = useNavigate();

    const goToHistory = () => {
        navigate(To); // route to your custom workout history page
    };

    return (
        <div style={{
            marginTop: '0.5rem',
            marginBottom: '0.5rem'
        }} className="PlanCardWorkoutHistory" onClick={goToHistory}>
            <h2 className="card-heading">Custom Workout</h2>
            <p className="card-subtext">View your past custom workouts</p>
        </div>
    );
}

export default WorkoutPlanType_History;
