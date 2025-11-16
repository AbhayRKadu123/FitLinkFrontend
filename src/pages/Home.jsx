import "../styles/Home.css"
import OnGoingworkoutcard from "../components/OnGoingworkoutcard"
import HeaderTop from "../components/Header"
import { useEffect, useRef, useState } from "react";
import WorkoutPlanCard from "../components/WorkoutPlanCard";
import NavBar from "../components/NavBar";
import { useAddWorkoutRoutinMutation } from "../features/api/WorkoutApi";
import Getimage from "../../public/utils/Getimage";
import { useGetUserWorkoutRoutinQuery } from "../features/api/WorkoutApi";
import { useNavigate } from "react-router-dom";
export default function Home() {
    const containerRef = useRef(null);
    const [visibleBox, setVisibleBox] = useState(null);
    const { data: GetExerciseData, refetch, error, isError, isSuccess: dataFetched } = useGetUserWorkoutRoutinQuery();
    let navigate = useNavigate()
    const Dates = getNext10Days()

    useEffect(() => {
        console.log('visibleBox=', visibleBox)
    }, [visibleBox])

    useEffect(() => {
        console.log("isError", isError)
        console.log("isError", error?.data?.message)
        if (error?.data?.message == 'Invalid Token') {
            localStorage.removeItem('username')
            localStorage.removeItem('token')

            navigate("/login")

        }
    }, [isError])
    useEffect(() => {
        let token = localStorage.getItem('token')
        console.log("token=", token)
        if (!token) {
            navigate("/login")
        }
    }, [])
    console.log('hoome GetExerciseData', GetExerciseData?.result?.mon)
    // console.log('hoome GetExerciseData',Object.entries())

    useEffect(() => {
        const boxes = containerRef.current.querySelectorAll(".WorkoutCard");

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        console.log("Visible along X:", entry.target.dataset.id);
                        setVisibleBox(entry.target.dataset.id);
                    }
                });
            },
            {
                root: containerRef.current, // horizontal scroll container
                threshold: 0.5,
            }
        );

        boxes.forEach((box) => observer.observe(box));

        return () => observer.disconnect();
    }, []);
    const daysOfWeek = {
        Monday: 'mon',
        Tuesday: 'tue',
        Wednesday: "wed",
        Thursday: "thur",
        Friday: 'fri',
        Saturday: 'sat',
        Sunday: 'sun'
    }

    function getNext10Days() {
        const days = [];
        const today = new Date();

        for (let i = 0; i < 14; i++) {
            const nextDate = new Date(today);
            nextDate.setDate(today.getDate() + i);

            const day = nextDate.toLocaleDateString('en-US', { weekday: 'long' });
            const date = nextDate.toISOString().split('T')[0]; // YYYY-MM-DD format

            days.push({ date, day });
        }

        return days;
    }


    console.log('getTodayDateAndDay', getNext10Days())
    return <>
        <HeaderTop visibleBox={visibleBox} setVisibleBox={setVisibleBox} isHomeTab={true} Dates={Dates}></HeaderTop>


        <div className="HomePageContiner">
            {/* <div className="HomePageMainPage"></div> */}
            <div className="OngoingPlan" ref={containerRef}>

                {/* {Array.from({ length: 10 }).map((_, i) => (
                        <OnGoingworkoutcard key={i} value={i} />
                    ))} */}
                    {console.log("Dates",Dates)}
                {Dates.map((ele, index) => <OnGoingworkoutcard key={index} value={index} ele={ele} />

                )}

            </div>
            <WorkoutPlanCard Url={'/Images/CustomWorkoutRoutin.jpg'} Title={'Custom Workout'} Description={'Create Your Own Custom plan and follow it'} comingSoon={false}></WorkoutPlanCard>
            <WorkoutPlanCard Url={'/Images/fst7backgroundimage.jpeg'} Title={'Fst7 Workout'} Description={'Unlock new levels of size with the FST-7 (Fascia Stretch Training) system'} comingSoon={true}></WorkoutPlanCard>
            {/* High-Intensity Training (HIT) */}
            <WorkoutPlanCard Url={'/Images/HITIMAGE.webp'} Title={'High-Intensity Training (HIT)'} Description={'Unlock new levels of size with the FST-7 (Fascia Stretch Training) system'} comingSoon={true}></WorkoutPlanCard>
            <WorkoutPlanCard Url={'/Images/GERMANVOLUMETRAINING.webp'} Title={'German Volume Training (GVT)'} Description={'Unlock new levels of size with the FST-7 (Fascia Stretch Training) system'} comingSoon={true}></WorkoutPlanCard>





        </div>
        {/* <NavBar></NavBar> */}

    </>
}