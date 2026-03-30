import "../styles/CustomWorkoutPlannew.css"
import HeadingContainer from "../components/HeadingContainer"
import Input from "../components/Input"
import { useEffect, useState } from "react"
import Button from "../components/Button"
import { useGetRelatedExerciseDataQuery } from "../features/api/WorkoutApi"
import Exercisedetail from "../components/Exercisedetail"
// import Input from "../components/Input"
export default function CustomWorkoutPlannew() {
    const [ExerciseName, setExerciseName] = useState("");
    const [ExerciseListOpen, setExerciseListOpen] = useState(false);
    const [debouncedExercise, setDebouncedExercise] = useState("")
    const [isSelected, setisSelected] = useState(false)
    const [ShowDetail, setShowDetail] = useState(false);
    const [ExpandSets, setExpandSets] = useState(false);

    const [exercisedate, setexercisedate] = useState(null)
    const [TodaysSession, setTodaysSession] = useState({})
    useEffect(() => {
        console.log('exercisedate', exercisedate)
    }, [exercisedate])
    useEffect(() => {
        console.log("ExerciseName")
        if (ExerciseName.trim() != "") {

            setExerciseListOpen(true)



        } else {
            setExerciseListOpen(false)

        }
        const timer = setTimeout(() => {
            setDebouncedExercise(ExerciseName)
        }, 500)
        return () => clearTimeout(timer)



    }, [ExerciseName])
    const { data: RelatedExercise, isLoading: LoadingExercise } = useGetRelatedExerciseDataQuery({ Val: debouncedExercise })

    console.log("RelatedExercise", RelatedExercise?.message)

    return <div className="NewCustomWorkplancontainer">
        <HeadingContainer isColorBlack={true} Title={"Custom Plan"}></HeadingContainer>
        <div className="NewCustomWorkplaninnercontainer">
            <h3 className="CustomWorkoutTitle">Chest Day</h3>
            <div className="NewCustomSetsContainer">
                {ShowDetail && <Exercisedetail showDetail={ShowDetail} setshowDetail={setShowDetail} exercisedata={exercisedate} setexercisedata={setexercisedate}></Exercisedetail>}

                {ExerciseListOpen && <div className="ExerciseListContainer">
                    {/* <h1 style={{ color: "white" }}>{ExerciseName}</h1> */}
                    {RelatedExercise?.message.length == 0 && <h1 style={{ color: 'white', fontSize: '1.3rem' }}>Exercise does not exists</h1>}
                    {RelatedExercise?.message?.map((ele) => {
                        return <span className={`ExerciseListItem ${isSelected ? "Selected" : ""}`}>
                            {/* {RelatedExercise?.message} */}

                            <img onClick={() => { setShowDetail(true); setexercisedate(ele) }} src={ele?.gifUrl}></img><p>{ele?.name}</p><span className="AddExerciseBox"><img onClick={() => {
                                setisSelected((prev) => {
                                    return !prev;
                                })
                            }} src={isSelected ? `Images/closered.png` : `Images/add-button.png`}></img></span>
                        </span>
                    })}


                </div>}
                <div className="TodaysSessionContainer">
                    {!TodaysSession ? <div className="Nosession">
                        <h1>Select Some Exercises for todays session </h1>
                        <img src="Images/CustomWorkoutNoSessionAvailable.png"></img>
                    </div> : <div className="SessionContainer">
                        <span className="OuterSessionContainerExercise">
                            <span className="SessionContainerExercise">
                                <p>Dips</p>
                                <img onClick={() => {
                                    console.log("Expand sets exercise");
                                    setExpandSets((prev) => {
                                        return !prev;
                                    })
                                }} src={ExpandSets ? "Images/up-arrows.png" : "Images/up-arrows.png"}></img>
                            </span>
                            {ExpandSets && <div className="SessionContainerExerciseSets">
                                <div className="SessionContainerExerciseSetsSetContainer">
                                    <Input placeholder={"Reps"} isLogWorkout={true}></Input>
                                    <Input placeholder={"Weight"} isLogWorkout={true}></Input>
                                </div>
                                <div className="SessionContainerExerciseSetsSetContainer">
                                    <Input placeholder={"Reps"} isLogWorkout={true}></Input>
                                    <Input placeholder={"Weight"} isLogWorkout={true}></Input>
                                </div> <div className="SessionContainerExerciseSetsSetContainer">
                                    <Input placeholder={"Reps"} isLogWorkout={true}></Input>
                                    <Input placeholder={"Weight"} isLogWorkout={true}></Input>
                                </div> <div className="SessionContainerExerciseSetsSetContainer">
                                    <Input placeholder={"Reps"} isLogWorkout={true}></Input>
                                    <Input placeholder={"Weight"} isLogWorkout={true}></Input>
                                </div>

                            </div>}
                        </span>
                        <span className="OuterSessionContainerExercise">
                            <span className="SessionContainerExercise">
                                <p>Dips</p>
                                <img src="Images/up-arrows.png"></img>
                            </span></span>

                    </div>

                    }
                    <button disabled={!ExpandSets} style={!ExpandSets ? { backgroundColor: "gray", color: "black" } : { backgroundColor: "yellow", color: "black" }}>+ Add Set</button>
                </div>




            </div>
            {/* <ExerciseDetail ></ExerciseDetail> */}

            <div className="ExerciseInputContainer">
                <Input onChange={(e) => { console.log(e.target.value); setExerciseName(e.target.value) }} value={ExerciseName} placeholder={"Enter Exercise name"}></Input>
                <Button label={"Save"}></Button>
            </div>
        </div>


    </div>
}