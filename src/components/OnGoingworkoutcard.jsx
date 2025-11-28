import "../styles/OnGoingworkoutcard.css";
import Button from "../components/Button";
import { useGetUserWorkoutRoutinQuery, useGetUserProgressQuery, useUpdateDailyWorkoutSessionMutation } from "../features/api/WorkoutApi";
import ProgressBar from "./ProgressBarComponent";
// import LogWorkoutScreen from "../pages/LogWorkoutScreen";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useRef } from "react";

export default function OnGoingworkoutcard({ value, ele }) {
    const { data: GetExerciseData, isError } = useGetUserWorkoutRoutinQuery();
    const [DailyUpdate, { data: Result, isLoading }] = useUpdateDailyWorkoutSessionMutation();


    let navigate = useNavigate();
    function getFormattedToday() {
        const today = new Date();

        // Convert to IST using toLocaleString
        const istString = today.toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

        const istDate = new Date(istString);

        const year = istDate.getFullYear();
        const month = String(istDate.getMonth() + 1).padStart(2, "0");
        const day = String(istDate.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }


    let TodayDate = getFormattedToday();
    const { data: GetProgressBarData } = useGetUserProgressQuery({ Date: TodayDate });


    console.log('GetProgressBarData', GetProgressBarData?.ProgressPercentage)
    const daysOfWeek = {
        Monday: 'mon',
        Tuesday: 'tue',
        Wednesday: 'wed',
        Thursday: 'thur',
        Friday: 'fri',
        Saturday: 'sat',
        Sunday: 'sun'
    };
    function StartWorkout(Heading) {
        let ID = GetExerciseData?.result?._id;
        let NestedId = GetExerciseData?.result?.[ReqDay]?._id
        console.log('ID=', ID)
        { Heading != "Rest Day" && navigate(`/LogWorkoutScreen?Id=${ID}&NestedId=${NestedId}&ReqDay=${ReqDay}`) }



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
    let isActive = TodayDate == ele?.date
    const hasCreatedSession = useRef(false);

    useEffect(() => {
        if (!isActive) return;

        if (hasCreatedSession.current) return; // prevent multiple calls

        hasCreatedSession.current = true;

        DailyUpdate({ TodayDate, ReqDay });

    }, [isActive]);


    return (
        <div
            style={{
                backgroundImage:
                    'url("https://www.healthkart.com/connect/wp-content/uploads/2016/03/banner-7.jpg")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
            className={`WorkoutCard ${isActive ? "active" : "inactive"}`}
            // className={`WorkoutCard`}

            data-id={value}
            // onClick={() => StartWorkout(Heading)}
            onClick={() => isActive && StartWorkout(Heading)}
        // 
        >
            <h2>{Heading}</h2>
            <h4>Plan type - (Custom)</h4>
            {!isActive && <span className="not-active-badge">Not Active</span>}


            <Button label="Complete" onClick={() => { console.log('complete workout') }} disabled={!isActive} />
            {isActive && <ProgressBar value={Heading == 'Rest Day' ? 100 : GetProgressBarData?.ProgressPercentage || 0}></ProgressBar>}
        </div>

    );
}



{/* <h3>{TodayDate == ele?.date ? 'Active' : "Not Active"}</h3> */ }