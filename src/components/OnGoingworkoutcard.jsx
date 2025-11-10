import "../styles/OnGoingworkoutcard.css";
import Button from "../components/Button";
import { useGetUserWorkoutRoutinQuery } from "../features/api/WorkoutApi";
import ProgressBar from "./ProgressBarComponent";
// import LogWorkoutScreen from "../pages/LogWorkoutScreen";
import { useNavigate } from "react-router-dom";


export default function OnGoingworkoutcard({ value, ele }) {
    const { data: GetExerciseData,isError} = useGetUserWorkoutRoutinQuery();
    let navigate=useNavigate();

    const daysOfWeek = {
        Monday: 'mon',
        Tuesday: 'tue',
        Wednesday: 'wed',
        Thursday: 'thur',
        Friday: 'fri',
        Saturday: 'sat',
        Sunday: 'sun'
    };
    function StartWorkout() {
        let ID = GetExerciseData?.result?._id;
        let NestedId=GetExerciseData?.result?.[ReqDay]?._id
        console.log('ID=',ID)
        navigate(`/LogWorkoutScreen?Id=${ID}&NestedId=${NestedId}&ReqDay=${ReqDay}`)



    }
    const ReqDay = daysOfWeek[ele?.day];
    let Heading = "";

    if (GetExerciseData?.result?.[ReqDay]) {
        Heading = GetExerciseData?.result?.[ReqDay]?.Title || "Rest Day";
        console.log("Found Title:", Heading);
    } else {
        console.log("Not found, rest day");
        Heading = "Rest";
    }
    console.log('on going workout card=', GetExerciseData)

    return (
        <div
            style={{
                backgroundImage:
                    'url("https://www.healthkart.com/connect/wp-content/uploads/2016/03/banner-7.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
            className="WorkoutCard"
            data-id={value}
            onClick={()=>{StartWorkout()}}
        >
            <h2>{Heading}</h2>
            <h4>Plan type - (Custom)</h4>
            {console.log("ele value=", ele)}
            <Button label="Complete" />
            <ProgressBar></ProgressBar>

        </div>
    );
}
