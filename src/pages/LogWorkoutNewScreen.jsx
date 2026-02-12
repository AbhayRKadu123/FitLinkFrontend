// import "styles/LogWorkoutNewScreen.css"
import "../styles/log-workout-new-screen.css"
import { skipToken } from "@reduxjs/toolkit/query";

import CommonHeader from "../components/CommonHeader"
import HeadingContainer from "../components/HeadingContainer"
import { useEffect, useState } from "react"
import Input from "../components/Input"
import Button from "../components/Button"
import {  useGetWorkoutSessoinQuery,
    useAddWorkoutSessionMutation,
    useGetDailySessionQuery,
    useUpdateWorkoutSessionMutation,
    useGetLastSessionHistoryQuery,
    useGetAllExercisesLastSessionHistoryQuery,useGetCurrentexeriseQuery } from "../features/api/WorkoutApi"
import ViewWorkoutHistory from "../components/ViewWorkoutHistory";
import { useSearchParams } from "react-router-dom"
import LoadingSpinner from "../components/LoadingSpinner"
import { toast } from "react-toastify"
import Exercisedetail from "../components/Exercisedetail";
// import 
function LogWorkoutExerciseNewCard({ setshowexerciseDetail,Title,setCurrentexerise, openOptionname, OptionOpen, OnClick, SessionObject, ind, setSessionObject,handleInputChange }) {
    return <><div className="LogWorkoutNewCard">
        <h3>{Title}</h3>
        <span className="DropDown">
            <img onClick={OnClick} style={{ width: '2rem', height: "2rem" }} src={OptionOpen && openOptionname.trim() == Title.trim() ? "Images/chevron.png" : "Images/up-arrows.png"}></img>
        </span>
    </div>
        {OptionOpen && openOptionname.trim() == Title.trim() && <SetHolder setshowexerciseDetail={setshowexerciseDetail} handleInputChange={handleInputChange} SessionObject={SessionObject} openOptionname={openOptionname} ind={ind} setSessionObject={setSessionObject}></SetHolder>}

    </>

}
function SetHolder({handleInputChange,setshowexerciseDetail, openOptionname, ind, SessionObject, setSessionObject }) {
    console.log(SessionObject?.exercises[ind]?.sets)
    return <> <div className="SetHolderContainer">
        <div className="SetsContainer">
            {SessionObject?.exercises[ind]?.sets?.map((ele, idx) => {
                return <div key={idx}  className="Sets">
                    {/* exIndex, setIndex, field, value */}
                    <input  onChange={(event) => { handleInputChange(ind,idx,"reps", event.target.value) }} value={ele?.reps} type={"Number"} placeholder="Reps" style={{ textAlign: "center", border: '1px solid white', backgroundColor: 'black', width: '25%', height: '2.5rem', color: "white", borderRadius: "1rem" }}></input>
                    <input onChange={(event) => { handleInputChange(ind,idx,"weight", event.target.value) }} value={ele?.weight} type={"Number"} placeholder="Weight" style={{ textAlign: "center", border: '1px solid white', backgroundColor: 'black', width: '25%', height: '2.5rem', color: "white", borderRadius: "1rem" }}></input>
                    <img onClick={() => {
                        setSessionObject(prev => {
                            const updatedExercises = prev.exercises.map((ex, i) =>
                                i === ind
                                    ? {
                                        ...ex,
                                        sets:
                                            ex.sets.length <= 1
                                                ? (toast.warning("sets cant be empty"), ex.sets)
                                                : ex.sets.filter((_, I) => I !== idx)
                                    }
                                    : ex
                            );

                            return { ...prev, exercises: updatedExercises };
                        });
                    }}
                        src="Images/delete.png" style={{ width: '1.6rem', height: "1.6rem" }}></img>

                </div>
            })}




        </div>
        <div className="AddsetsBtnContainer">
            <Button onClick={() => {
                const updatedExercises = SessionObject.exercises.map((ex, i) =>
                    i === ind
                        ? { ...ex, sets: [...ex.sets, { reps: 0, weight: 0, isSetCompleted: false }] }
                        : ex
                );

                setSessionObject((prev) => {
                    return {
                        ...prev, exercises: updatedExercises
                    }
                })
            }} label={"Add"}></Button>
            <Button onClick={() => {setshowexerciseDetail(true); }} label={"View"}></Button>

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
    const [SessionTitle,setSessionTitle]=useState(null);
    const [Currentexerise,setCurrentExercise]=useState(null);
    const [SessionObject, setSessionObject] = useState(null);
    const [showDetail,setshowDetail]=useState(false);
    const [showexerciseDetail,setshowexerciseDetail]=useState(false)
    const [addWorkout, { isLoading: isSaving, isSuccess: saveSuccess, error: saveError }] =
        useAddWorkoutSessionMutation();
         const [updateWorkout, { isLoading: isupdating, isSuccess: updateSuccess, error: updateError }] =
                useUpdateWorkoutSessionMutation();
                    const { data: GetLastSessionHistory, isLoading: isSessionHistoryLoading, isError } = useGetLastSessionHistoryQuery({ SessionTitle: SessionTitle, Currexercise: Currentexerise, Day: ReqDay })
                
    useEffect(()=>{
console.log("Currentexerise",Currentexerise)
    },[Currentexerise])
    
    const {
        data: workoutData,
        isLoading: isWorkoutLoading,
        error: workoutError,
    } = useGetWorkoutSessoinQuery({ ID, NestedId, ReqDay });
    // useGetCurrentexeriseQuery
    const {
        data: CurrExerciseDetail,
        isLoading: isExerciseDetailLoading,
        error: errorExerciseDetail,
    } =useGetCurrentexeriseQuery({ name:Currentexerise });

     const dailyQueryArgs = workoutData?.result
            ? {
                planType: "custom",
                Date: getISTDate(),
                Title: workoutData.result.Title.trim(),
            }
            : skipToken;
        const {
            data: dailySession,
            isLoading: isDailySessionLoading,
            error: dailySessionError,
            refetch
        } = useGetDailySessionQuery(dailyQueryArgs);
    useEffect(() => {
        console.log("workoutData", workoutData?.result)
        // set
        if(!dailySession?.getworkoutsession){
  setSessionObject({
            Title: workoutData?.result?.Title,
            day: workoutData?.result?.day,
            isCompleted: true,
            date: getISTDate(),
            exercises: workoutData?.result?.exercises.map((ele) => {
                return { name: ele, sets: [{ reps: 0, weight: 0, isSetCompleted: true }] }

            })

        })
        }
        if(dailySession?.getworkoutsession){
            setSessionObject({

                ...dailySession?.getworkoutsession
            })
        }
      
    }, [workoutData,dailySession])
    useEffect(() => {
        console.log("CurrExerciseDetail",CurrExerciseDetail?.Currentexerise
)
    }, [CurrExerciseDetail])
     useEffect(() => {
            if (workoutData?.result?.Title) {
                setSessionTitle(workoutData?.result?.Title.trim())
    
            }
        }, [workoutData])
        useEffect(()=>{
console.log("GetLastSessionHistory",GetLastSessionHistory?.result[0]?.exercises)
        },[GetLastSessionHistory])
    useEffect(()=>{
console.log("dailySession",dailySession?.getworkoutsession
)
    },[dailySession])
    useEffect(() => {
        if(saveSuccess){
        toast.success("Workout saved successfully!")

        }
    }, [saveSuccess])
     const handleInputChange = (exIndex, setIndex, field, value) => {
        setSessionObject((prev) => {
            if (!prev || !prev.exercises) return prev;

            const updatedExercises = prev.exercises.map((ex, i) =>
                i === exIndex
                    ? {
                        ...ex,
                        sets: ex.sets.map((set, sIndex) =>
                            sIndex === setIndex ? { ...set, [field]: value.trim() } : set
                        ),
                    }
                    : ex
            );
            return { ...prev, exercises: updatedExercises };
        });
    };

    useEffect(() => {
        if(saveError){
        toast.error(saveError?.data?.message || "something went wrong!")

        }
    }, [saveError])
    async function HandleSaveWorkout() {
        if (!SessionObject) return;
        if (isSaving || isWorkoutLoading || isDailySessionLoading) return;
        //    const invalid = SessionObject.exercises.some(ex =>
        //     ex.sets.some(s => !s.reps || !s.weight)
        // );
        //  if (invalid) {
        //         toast.error("Reps and Weight cannot be empty.");
        //         return;
        //     }


        try {
            await addWorkout(SessionObject).unwrap();
            refetch();
        } catch (err) { }
    }
      async function updateworkout() {
            if (isupdating || isWorkoutLoading || isDailySessionLoading) return;
        //      const invalid = SessionObject.exercises.some(ex =>
        //     ex.sets.some(s => !s.reps || !s.weight)
        // );
            // const Setsexists = SessionObject.exercises.some(ex => ex.sets.length !== 0);
            // const invalid = SessionObject.exercises.some(ex =>
            //     ex.sets.some(s => !s.reps || !s.weight)
            // );
            // if (!Setsexists) {
            //     toast.error("Please add some sets to exercise !");
            //     return;
            // }
            // if (invalid) {
            //     toast.error("Reps and Weight cannot be empty.");
            //     return;
            // }
    
            try {
                const result = await updateWorkout(SessionObject).unwrap();
                await refetch();
                toast.success("Workout updated successfully!");
            } catch (err) {
                toast.success("Update failed!");
            }
    
            // setIsActionRunning(false);
        }


    return <div className="LogWorkoutNewScreencontainer">
        <HeadingContainer isColorBlack={true} Title={SessionTitle}></HeadingContainer>
        <div className="Logworkoutnewscreeninnercontainer">
            <Exercisedetail showDetail={showexerciseDetail} setshowDetail={setshowexerciseDetail} exercisedata={CurrExerciseDetail?.Currentexerise} ></Exercisedetail>
            <ViewWorkoutHistory exerciseName={Currentexerise} ExerciseData={null} showDetail={showDetail}  setshowDetail={setshowDetail} data={GetLastSessionHistory}></ViewWorkoutHistory>
            {(isWorkoutLoading ||isDailySessionLoading)&& <LoadingSpinner></LoadingSpinner>}
            {!isDailySessionLoading&&workoutData?.result?.exercises.map((ele, index) => {
                return <LogWorkoutExerciseNewCard setshowexerciseDetail={setshowexerciseDetail} Title={ele} setCurrentexerise={setCurrentExercise} openOptionname={openOptionname} OptionOpen={OptionOpen} OnClick={() => {
                    setOpenOptionname(ele);
                    setCurrentExercise(ele);
                    setOptionopen((prev) => {
                        if(prev==true){
                            setCurrentExercise(null)
                        }
                        return !prev;
                    })
                }} SessionObject={SessionObject} setSessionObject={setSessionObject} ind={index} handleInputChange={handleInputChange}></LogWorkoutExerciseNewCard>
            })}

           {!isWorkoutLoading&&!isDailySessionLoading&&!dailySession?.getworkoutsession&& <Button disabled={isWorkoutLoading||isDailySessionLoading||isupdating||isSaving} onClick={() => {

                HandleSaveWorkout();

            }} label={"save workout"}></Button>}
             {!isWorkoutLoading&&!isDailySessionLoading&&dailySession?.getworkoutsession&& <Button disabled={isWorkoutLoading||isDailySessionLoading||isupdating||isSaving} onClick={() => {

               updateworkout();

            }} label={"Update workout"}></Button>}
            <span style={{width:'100%',height:'5px'}}></span>
              { <Button disabled={!Currentexerise}   onClick={() => {

            //    updateworkout();
            setshowDetail(true);

            }} label={"View History"}></Button>}


        </div>
    </div>
}