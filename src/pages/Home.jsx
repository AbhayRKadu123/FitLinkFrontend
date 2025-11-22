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
    const [Available, setAvailable] = useState(false);
    const { data: GetExerciseData, refetch, error, isError, isSuccess: dataFetched } = useGetUserWorkoutRoutinQuery();
    let navigate = useNavigate()
    const Dates = getNext10Days()

    useEffect(() => {
        console.log('GetExerciseData=', GetExerciseData)
        if (GetExerciseData && GetExerciseData?.result) {
            setAvailable(true)
            setVisibleBox((prev) => {
                return prev
            })
        }
    }, [GetExerciseData])
    // GetExerciseData&&GetExerciseData?.result

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
        if (!GetExerciseData?.result) return; // ensure cards exist
        if (!containerRef.current) return;

        const container = containerRef.current;

        // wait for DOM to paint
        const boxes = container.querySelectorAll(".WorkoutCard");
        if (!boxes || boxes.length === 0) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.dataset?.id;
                        if (id) {
                            setVisibleBox(id);
                        }
                    }
                });
            },
            {
                root: container,
                threshold: 0.5,
            }
        );

        boxes.forEach((box) => observer.observe(box));

        return () => observer.disconnect();
    }, [GetExerciseData]);

    const daysOfWeek = {
        Monday: 'mon',
        Tuesday: 'tue',
        Wednesday: "wed",
        Thursday: "thur",
        Friday: 'fri',
        Saturday: 'sat',
        Sunday: 'sun'
    }

    // function getNext10Days() {
    //     const days = [];
    //     const today = new Date();

    //     for (let i = 0; i < 14; i++) {
    //         const nextDate = new Date(today);
    //         nextDate.setDate(today.getDate() + i);

    //         const day = nextDate.toLocaleDateString('en-US', { weekday: 'long' });
    //         const date = nextDate.toISOString().split('T')[0]; // YYYY-MM-DD format

    //         days.push({ date, day });
    //     }

    //     return days;
    // }

    function getNext10Days() {
        const days = [];
        const today = new Date();

        for (let i = 0; i < 14; i++) {
            const nextDate = new Date(today);
            nextDate.setDate(today.getDate() + i);

            // Day name (local)
            const day = nextDate.toLocaleDateString('en-US', { weekday: 'long', timeZone: 'Asia/Kolkata' });

            // Date in IST (YYYY-MM-DD)
            const date = nextDate
                .toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
            // en-CA gives YYYY-MM-DD format

            days.push({ date, day });
        }

        return days;
    }

    // Dates.unshift({date: '2025-11-17', day: 'Monday'})

    console.log('Dates=', Dates)
    console.log('getTodayDateAndDay', getNext10Days())
    return <>
        <HeaderTop visibleBox={visibleBox} setVisibleBox={setVisibleBox} isHomeTab={true} Dates={Dates} IsPlanAvailable={Available}></HeaderTop>


        <div className="HomePageContiner">
            {/* <div className="HomePageMainPage"></div> */}
            {GetExerciseData && GetExerciseData?.result && <div className="OngoingPlan" ref={containerRef}>


                {console.log("Dates", Dates)}
                {Dates.map((ele, index) => <OnGoingworkoutcard key={index} value={index} ele={ele} />

                )}

            </div>}
            <WorkoutPlanCard Url={'/Images/CustomWorkoutRoutin.jpg'} Title={'Custom Workout'} Description={'Create Your Own Custom plan and follow it'} comingSoon={false}></WorkoutPlanCard>
            <WorkoutPlanCard Url={'/Images/fst7backgroundimage.jpeg'} Title={'Fst7 Workout'} Description={'Unlock new levels of size with the FST-7 (Fascia Stretch Training) system'} comingSoon={true}></WorkoutPlanCard>
            {/* High-Intensity Training (HIT) */}
            <WorkoutPlanCard Url={'/Images/HITIMAGE.webp'} Title={'High-Intensity Training (HIT)'} Description={'Unlock new levels of size with the FST-7 (Fascia Stretch Training) system'} comingSoon={true}></WorkoutPlanCard>
            <WorkoutPlanCard Url={'/Images/GERMANVOLUMETRAINING.webp'} Title={'German Volume Training (GVT)'} Description={'Unlock new levels of size with the FST-7 (Fascia Stretch Training) system'} comingSoon={true}></WorkoutPlanCard>





        </div>
        {/* <NavBar></NavBar> */}

    </>
}