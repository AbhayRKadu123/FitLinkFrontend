
import "../styles/ExerciseLibrary.css"
import HeadingContainer from "../components/HeadingContainer"
import Input from "../components/Input"
import { useGetRelatedExerciseDataQuery } from "../features/api/WorkoutApi"
import { useEffect, useState } from "react"
import LoadingSpinner from "../components/LoadingSpinner"
import ExerciseImageCard from "../components/ExerciseImageCard"
import Exercisedetail from "../components/Exercisedetail"
export default function ExerciseLibrary(){
    const [exercisename,setexercisename]=useState("")
    const [debouncedExercise,setDebouncedExercise]=useState("")
    const [ShowDetail,setShowDetail]=useState(false);
    const [exercisedate,setexercisedate]=useState(null);

        const { data: RelatedExercise, isLoading: LoadingExercise } = useGetRelatedExerciseDataQuery({ Val: debouncedExercise })
    useEffect(()=>{
console.log("RelatedExercise",RelatedExercise)
    },[RelatedExercise])
     useEffect(() => {
            const timer = setTimeout(() => {
                setDebouncedExercise(exercisename)
            }, 500)
    
            return () => clearTimeout(timer)
        }, [exercisename])
    return <div className="ExerciseLibrary">
        <HeadingContainer Title={'Exercise Library'}></HeadingContainer>
        <div className="AllExerciseContainer">
        <div className="SearchBoxContainer">
            <Input value={exercisename} onChange={(event)=>{setexercisename(event.target.value)}} placeholder={"Enter Exercise name"}></Input>
        </div>
        <div className="AllExerciseContainer">
           {ShowDetail&& <Exercisedetail  showDetail={ShowDetail} setshowDetail={setShowDetail}  exercisedata={exercisedate} setexercisedata={setexercisedate}></Exercisedetail>}
            {LoadingExercise?<LoadingSpinner></LoadingSpinner>:
                RelatedExercise?.message?.map((ele)=>{
                    return  <ExerciseImageCard OnClick={()=>{setShowDetail(true);setexercisedate(ele)}} name={ele?.name} gifUrl={ele?.gifUrl} ></ExerciseImageCard>;
                })
            }

           

        </div>

        </div>
    </div> 
}