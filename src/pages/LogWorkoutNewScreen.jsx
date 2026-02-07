// import "styles/LogWorkoutNewScreen.css"
import "../styles/log-workout-new-screen.css"

import CommonHeader from "../components/CommonHeader"
import HeadingContainer from "../components/HeadingContainer"
import { useEffect, useState } from "react"
import Input from "../components/Input"
import Button from "../components/Button"
import { useGetWorkoutSessoinQuery } from "../features/api/WorkoutApi"
import { useSearchParams } from "react-router-dom"
import LoadingSpinner from "../components/LoadingSpinner"
import { toast } from "react-toastify"
// import 
function LogWorkoutExerciseNewCard({ Title, openOptionname, OptionOpen, OnClick, SessionObject, ind, setSessionObject }) {
    return <><div className="LogWorkoutNewCard">
        <h3>{Title}</h3>
        <span className="DropDown">
            <img onClick={OnClick} style={{ width: '2rem', height: "2rem" }} src={OptionOpen && openOptionname.trim() == Title.trim() ? "Images/chevron.png" : "Images/up-arrows.png"}></img>
        </span>
    </div>
        {OptionOpen && openOptionname.trim() == Title.trim() && <SetHolder SessionObject={SessionObject} openOptionname={openOptionname} ind={ind} setSessionObject={setSessionObject}></SetHolder>}

    </>

}
function SetHolder({ openOptionname, ind, SessionObject, setSessionObject }) {
    console.log(SessionObject?.exercises[ind]?.sets)
    return <> <div className="SetHolderContainer">
        <div className="SetsContainer">
            {SessionObject?.exercises[ind]?.sets?.map((ele, idx) => {
                return <div className="Sets">
                    <input onChange={(event) => { console.log(event.target.value) }} type={"Number"} placeholder="set no" style={{ textAlign: "center", border: '1px solid white', backgroundColor: 'black', width: '25%', height: '2.5rem', color: "white", borderRadius: "1rem" }}></input>
                    <input onChange={(event) => { console.log(event.target.value) }} type={"Number"} placeholder="Reps" style={{ textAlign: "center", border: '1px solid white', backgroundColor: 'black', width: '25%', height: '2.5rem', color: "white", borderRadius: "1rem" }}></input>
                    <img onClick={() => { setSessionObject((prev)=>{
                        let updatedExercises=SessionObject?.exercises.map((ex, i) =>
                    i === ind
                        ? { ...ex, sets: ex?.sets.filter((ele,I)=>{if(ex?.sets.length<=1){return toast.warning("sets cant be empty")};if(I!==idx)return ele;}) }
                        : ex
                );
                         setSessionObject((prev) => {
                    return {
                        ...prev, exercises: updatedExercises
                    }
                })

                    }) }} src="Images/delete.png" style={{ width: '1.6rem', height: "1.6rem" }}></img>

                </div>
            })}




        </div>
        <div className="AddsetsBtnContainer">
            <Button onClick={() => {
                const updatedExercises = SessionObject.exercises.map((ex, i) =>
                    i === ind
                        ? { ...ex, sets: [...ex.sets, { reps: "", weight: "", isSetCompleted: false }] }
                        : ex
                );

                setSessionObject((prev) => {
                    return {
                        ...prev, exercises: updatedExercises
                    }
                })
            }} label={"Add"}></Button>
            <Button onClick={() => { return toast.warning("feature is under development phase!") }} label={"View"}></Button>

        </div>



    </div>
    </>
}
function getISTDate() {
    // const utcNow = new Date().toISOString();
    const utcDate = new Date();
    console.log('utcDate', utcDate)
    const istDate = new Date(utcDate.getTime() + (5.5 * 60 * 60 * 1000));
    console.log('isodate', istDate.toISOString()?.split('T')[0]);

    return istDate.toISOString()?.split('T')[0]
}
export default function LogWorkoutNewScreen() {
    const [searchParams] = useSearchParams();

    const ID = searchParams.get("Id");
    const NestedId = searchParams.get("NestedId");
    const ReqDay = searchParams.get("ReqDay");
    let [OptionOpen, setOptionopen] = useState(false);
    let [openOptionname, setOpenOptionname] = useState("");
    const [SessionObject, setSessionObject] = useState(null);
    //     const [SessionObject,setSessionObject]=useState(
    // {
    //     isCompleted: false,
    //   Title: "Back and biceps",
    //   day: "tue",
    //   date: "2026-01-13",
    //   exercises: [
    //     {
    //       name: "Sumo Deadlift",

    //       sets: [
    //         { reps: 8, weight: 1, isSetCompleted: true },

    //       ]
    //     }]
    // }
    //     );
    const {
        data: workoutData,
        isLoading: isWorkoutLoading,
        error: workoutError,
    } = useGetWorkoutSessoinQuery({ ID, NestedId, ReqDay });
    useEffect(() => {
        console.log("workoutData", workoutData?.result)
        // set
        setSessionObject({
            Title: workoutData?.result?.Title,
            day: workoutData?.result?.day,
            isCompleted: true,
            date: getISTDate(),
            exercises: workoutData?.result?.exercises.map((ele) => {
                return { name: ele, sets: [{ reps: 0, weight: 0, isSetCompleted: true }] }

            })

        })
    }, [workoutData])
    useEffect(() => {
        console.log("SessionObject", SessionObject)
    }, [SessionObject])

    return <div className="LogWorkoutNewScreencontainer">
        <HeadingContainer isColorBlack={true} Title={"Chest workout"}></HeadingContainer>
        <div className="Logworkoutnewscreeninnercontainer">
            {isWorkoutLoading && <LoadingSpinner></LoadingSpinner>}
            {workoutData?.result?.exercises.map((ele, index) => {
                return <LogWorkoutExerciseNewCard Title={ele} openOptionname={openOptionname} OptionOpen={OptionOpen} OnClick={() => {
                    setOpenOptionname(ele);
                    setOptionopen((prev) => {
                        return !prev;
                    })
                }} SessionObject={SessionObject} setSessionObject={setSessionObject} ind={index}></LogWorkoutExerciseNewCard>
            })}




        </div>
    </div>
}