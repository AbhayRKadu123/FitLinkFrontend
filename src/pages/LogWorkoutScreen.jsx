import "../styles/LogWorkoutScreen.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    useGetWorkoutSessoinQuery,
    useAddWorkoutSessionMutation,
    useGetDailySessionQuery,
    useUpdateWorkoutSessionMutation,
    useGetLastSessionHistoryQuery,
    useGetAllExercisesLastSessionHistoryQuery
} from "../features/api/WorkoutApi";
import LoadingSpinner from "../components/LoadingSpinner";
import Button from "../components/Button";
import { useEffect, useState, useRef } from "react";
import Input from "../components/Input";
import HeadingContainer from "../components/HeadingContainer";
import { skipToken } from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";
// function getISTDate() {
//     const ist = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
//     const d = new Date(ist);
//     return d.toISOString().split("T")[0];
// }

function getISTDate() {
    // const utcNow = new Date().toISOString();
    const utcDate = new Date();
    console.log('utcDate', utcDate)
    const istDate = new Date(utcDate.getTime() + (5.5 * 60 * 60 * 1000));
    console.log('isodate', istDate.toISOString()?.split('T')[0]);

    return istDate.toISOString()?.split('T')[0]
}
export default function LogWorkoutScreen() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [isActionRunning, setIsActionRunning] = useState(false);
    // const setHolderRef = useRef(null);
    // const scrollToBottomRef = useRef(null);
    const ID = searchParams.get("Id");
    const NestedId = searchParams.get("NestedId");
    const ReqDay = searchParams.get("ReqDay");
    const [ShowLastSessionHistory, setShowLastSessionHistory] = useState(false)
    const [SessionTitle, setSessionTitle] = useState(null)
    const [Currexercise, setCurrexercise] = useState(null)
    const [CurrExerciseSetHistory, setCurrExerciseSetHistory] = useState(null)
    const [historyApplied, setHistoryApplied] = useState(false);



    // --- Fetch base workout template ---
    const {
        data: workoutData,
        isLoading: isWorkoutLoading,
        error: workoutError,
    } = useGetWorkoutSessoinQuery({ ID, NestedId, ReqDay });

    const { data: GetLastSessionHistory, isLoading: isSessionHistoryLoading, isError } = useGetLastSessionHistoryQuery({ SessionTitle: SessionTitle, Currexercise: Currexercise, Day: ReqDay })
    // useGetAllExercisesLastSessionHistoryQuery
    const allExerciseArgs =
  SessionTitle
    ? { SessionTitle, Day: ReqDay }
    : skipToken;

const { data: GetAllLastSessionExerciseHistory } =
  useGetAllExercisesLastSessionHistoryQuery(allExerciseArgs);

    // --- Fetch existing session for today ---
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
    // const [isDisabled,setisDisabled]=useState(false)
    // --- Mutation for adding workout session ---
    const [addWorkout, { isLoading: isSaving, isSuccess: saveSuccess, error: saveError }] =
        useAddWorkoutSessionMutation();
    // useUpdateWorkoutSessionMutation
    const [updateWorkout, { isLoading: isupdating, isSuccess: updateSuccess, error: updateError }] =
        useUpdateWorkoutSessionMutation();

    // --- Local state for session object ---
    const [sessionObject, setSessionObject] = useState(null);

    const clean = (str) => str.replace(/\s+/g, " ").trim().toLowerCase();

    // if (clean(ele) === clean(arr[i]?.name)) {
    useEffect(() => {
        if (workoutData?.result?.Title) {
            setSessionTitle(workoutData?.result?.Title.trim())

        }
    }, [workoutData])

    function GetSpecificExerciseSets({ OldExercises, ExerciseName }) {
        console.log("ExerciseName", ExerciseName)
        console.log("OldExercises", OldExercises)
        let Arr = []
        if(OldExercises){
        for (let ele of OldExercises) {
            if (ele?.name == ExerciseName) {
                Arr = ele?.sets.map((ele) => {
                    // if(ele?.isSetCompleted!=false){
return {

                        reps: ele?.reps,
                        weight: ele?.weight,
                        isSetCompleted: false
                    }
                        
                    // }
                    
                });
                break;

            }


        }}
        return Arr;





    }

    useEffect(() => {
        console.log('GetAllLastSessionExerciseHistory', GetAllLastSessionExerciseHistory?.result?.exercises)
        if (
    historyApplied ||                     // 🚫 already applied
    dailySession?.getworkoutsession ||     // 🚫 today exists
    !GetAllLastSessionExerciseHistory?.result?.exercises
  ) return;
        if (!dailySession?.getworkoutsession) {
        setSessionObject((prev) => {
            if (!prev || !prev.exercises) return prev;

            let OldExercises = GetAllLastSessionExerciseHistory?.result?.exercises;
            let UpdatedExercises = prev?.exercises?.map((ele) => {
                return { name: ele?.name, sets: GetSpecificExerciseSets({ OldExercises, ExerciseName: ele?.name }) }
            })

            let Newobj = { ...prev, exercises: UpdatedExercises }
            return Newobj




        })
        setHistoryApplied(true)

        }


    }, [GetAllLastSessionExerciseHistory,dailySession])
    // GetLastSessionHistory

    useEffect(() => {
        if (isError == true) {
            toast.error("some thing went wrong")
            return
        }
    }, [isError])

    useEffect(() => {
        if (GetLastSessionHistory?.result[0]?.exercises[0]?.sets) {
            setCurrExerciseSetHistory(GetLastSessionHistory?.result[0]?.exercises[0]?.sets)
        } else {
            setCurrExerciseSetHistory(null)
        }

    }, [GetLastSessionHistory])
    useEffect(() => {
        if (isWorkoutLoading || isDailySessionLoading) return;

        // If today's session already exists -> load it
        if (dailySession?.getworkoutsession) {
            let Exercises = workoutData.result.exercises;
            console.log('Exercises', Exercises)

            // dailySession.getworkoutsession?.exercises
            function GetFromWorkoutSession(ele) {
                let arr = dailySession.getworkoutsession?.exercises;
                let SetObj = { name: ele, sets: [] }
                for (let i = 0; i < arr.length; i++) {

                    if (clean(ele) === clean(arr[i]?.name)) {

                        SetObj = { name: arr[i]?.name, sets: arr[i]?.sets }
                        break

                    }


                }
                return SetObj;


            }
            let UpdatedExercise = Exercises.map((ele) => {

                return GetFromWorkoutSession(ele)


            })

            console.log('UpdatedExercise', UpdatedExercise)
            let Obj = {
                _id: dailySession?.getworkoutsession?._id,
                username: dailySession?.getworkoutsession?.username,
                planType: dailySession?.getworkoutsession?.planType,
                Title: dailySession?.getworkoutsession?.Title,
                day: dailySession?.getworkoutsession?.day,
                date: dailySession?.getworkoutsession?.date,
                exercises: UpdatedExercise
            }
            // setSessionObject({ ...Obj });
            setSessionObject(JSON.parse(JSON.stringify(Obj)));

            return;
        }

        // Else create a new session base
        if (workoutData?.result) {
            const baseSession = {
                username: localStorage.getItem("username"),
                planType: "custom",
                Title: workoutData.result.Title.trim(),
                day: ReqDay,
                date: getISTDate(),
                exercises:
                    workoutData.result.exercises?.map((ex) => ({
                        name: ex,
                        sets: [],
                    })) || [],
            };
            // setSessionObject(baseSession);
            setSessionObject(JSON.parse(JSON.stringify(baseSession)));

        }
    }, [workoutData, dailySession]);


    // --- Add a new set to exercise ---
    const addSet = (exIndex) => {
        setSessionObject((prev) => {
           if (!prev || !prev.exercises) return prev;

            const updatedExercises = prev.exercises.map((ex, i) =>
                i === exIndex
                    ? { ...ex, sets: [...ex.sets, { reps: "", weight: "",isSetCompleted:false}] }
                    : ex
            );
            return { ...prev, exercises: updatedExercises };
        });
        setTimeout(() => {
            const holders = document.querySelectorAll(".SetHolder");
            const holder = holders[exIndex];
            if (holder) {
                holder.scrollTop = holder.scrollHeight;
            }
        }, 0);
    };

    // --- Remove a set ---
    const removeSet = (exIndex, setIndex) => {
        setSessionObject((prev) => {
            if (!prev || !prev.exercises) return prev;

            const updatedExercises = prev.exercises.map((ex, i) =>
                i === exIndex
                    ? { ...ex, sets: ex.sets.filter((_, idx) => idx !== setIndex) }
                    : ex
            );
            return { ...prev, exercises: updatedExercises };
        });
    };

    const MarkIsSetCompleted = (exIndex, setIndex) => {
        setSessionObject((prev) => {
            if (!prev || !prev.exercises) return prev;

            const updatedExercises = prev.exercises.map((ex, i) =>
                i === exIndex
                    ? {
                        ...ex, sets: ex.sets.map((ele, idx) => {
                            if (idx == setIndex) {
                                return { reps: ele?.reps, weight: ele?.weight, isSetCompleted: !ele?.isSetCompleted}
                            } else {
                                return ele
                            }


                        })
                    }
                    : ex
            );
            return { ...prev, exercises: updatedExercises }


        })
        console.log('MarkIsSetCompleted exercise index', exIndex)
        console.log('MarkIsSetCompleted set index', setIndex)


    }

    // --- Handle input changes for reps & weight ---
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


    async function updateworkout() {
        if (isupdating || isWorkoutLoading || isDailySessionLoading) return;
        const Setsexists = sessionObject.exercises.some(ex => ex.sets.length !== 0);
        const invalid = sessionObject.exercises.some(ex =>
            ex.sets.some(s => !s.reps || !s.weight)
        );
        if (!Setsexists) {
            toast.error("Please add some sets to exercise !");
            return;
        }
        if (invalid) {
            toast.error("Reps and Weight cannot be empty.");
            return;
        }

        try {
            const result = await updateWorkout(sessionObject).unwrap();
            await refetch();
            toast.success("Workout updated successfully!");
        } catch (err) {
            toast.success("Update failed!");
        }

        // setIsActionRunning(false);
    }
    const handleSave = async () => {
        if (isSaving || isWorkoutLoading || isDailySessionLoading) return;
        // setIsActionRunning(true);
        const invalid = sessionObject.exercises.some(ex =>
            ex.sets.some(s => !s.reps || !s.weight)
        );

        if (invalid) {
            toast.error("Reps and Weight cannot be empty.");
            return;
        }

        try {
            const res = await addWorkout(sessionObject).unwrap();
            await refetch();
            toast.success("Workout saved successfully!");
        } catch (err) {
            toast.error("Save failed!");
        }

        // setIsActionRunning(false);
    };


    // --- Debug logging ---
    useEffect(() => {
        // for(let ele in sessionObject){
        console.log("SessionObject:", sessionObject?.exercises);

        // }
    }, [sessionObject]);
    useEffect(() => {
        console.log('Currexercise',)
    }, [Currexercise])

    return (
        <div className="LogWorkoutScreenContainer">
            {ShowLastSessionHistory && <div className="modalOverlay">
                <div className="ViewLastSessionHistory">
                    <span style={{ position: 'absolute', top: '1rem', left: '1.5rem', zIndex: '1000' }}><img onClick={() => { setCurrexercise(null); setShowLastSessionHistory(false) }} style={{ width: '1.5rem', height: '1.5rem' }} src="../Images/closered.png"></img></span>
                    <h4 className="HistoryTitle">
                        Last Session History
                        <span>{Currexercise}</span> 
                    </h4>
                    {CurrExerciseSetHistory == null ? <div className="Set_and_Reps_Holder">

                        <h4 style={{ textAlign: 'center', color: 'black' }}>No History To show</h4>

                    </div> : <>
                        {console.log('CurrExerciseSetHistory', CurrExerciseSetHistory)}
                        {isSessionHistoryLoading ? <LoadingSpinner></LoadingSpinner> : <div className="Set_and_Reps_Holder">
                            {CurrExerciseSetHistory.map((ele, index) => (
 
//  ele?.isSetCompleted !== false 

    // <div className="SetRow" key={index}>
    //   <span>Set {index + 1}</span>
    //   <span>{ele?.reps} reps</span>
    //   <span>{ele?.weight} kg</span>
    // </div>
    <div
  className={`SetRow ${ele?.isSetCompleted !== false ? "SetRowCompleted" : ""}`}
  key={index}
>
  <span>Set {index + 1}</span>
  <span>{ele?.reps} reps</span>
  <span>{ele?.weight} kg</span>

  {ele?.isSetCompleted !== false && (
    <span className="CompletedTag">Completed</span>
  )}
</div>

  
))}




                        </div>}

                    </>}

                </div>
            </div>}



            <HeadingContainer Title={workoutData?.result?.Title}></HeadingContainer>

            <div className="LogWorkoutExerciseSession">
                {(isWorkoutLoading || isDailySessionLoading) && <LoadingSpinner />}

                {sessionObject?.exercises?.map((exercise, exIndex) => (
                    <div key={exIndex} className="ExerciseContainer">
                        <h4
                            style={{
                                color: "black",
                                textAlign: "center",
                                marginTop: "0.3rem",
                                fontSize: "1.2rem",
                            }}
                        >
                            {exercise?.name}
                        </h4>

                        <div className="SetHolder">
                            {exercise?.sets?.map((set, setIndex) => (
                                <div
                                    key={setIndex}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        margin: "0.3rem 0",
                                        gap: "0.4rem",
                                    }}
                                >
                                    <Input
                                        type="number"
                                        placeholder="Reps"
                                        value={set.reps}
                                        onChange={(e) =>
                                            handleInputChange(exIndex, setIndex, "reps", e.target.value)
                                        }
                                        isLogWorkout={true}

                                    />
                                    <Input
                                        type="number"
                                        placeholder="Weight"
                                        value={set.weight}
                                        onChange={(e) =>
                                            handleInputChange(exIndex, setIndex, "weight", e.target.value)
                                        }
                                        isLogWorkout={true}

                                    />

                                    <img onClick={() => removeSet(exIndex, setIndex)} style={{ width: '1.5rem', height: '1.5rem' }} src="Images/closered.png"></img>
                                    <input
                                        type="checkbox"
                                        style={{
                                            width: "1rem",
                                            height: "1rem",
                                            cursor: "pointer",
                                            accentColor: "#4f46e5",     // soft indigo
                                            borderRadius: "6px",
                                            transition: "transform 0.15s ease, box-shadow 0.15s ease",
                                        }}
                                        onMouseEnter={(e) =>
                                            (e.target.style.boxShadow = "0 0 0 4px rgba(79,70,229,0.15)")
                                        }
                                        onMouseLeave={(e) =>
                                            (e.target.style.boxShadow = "none")
                                        }
                                        // checked={set?.isSetCompleted!==false}
                                        checked={Boolean(set?.isSetCompleted)}

                                        onClick={() => {
                                            MarkIsSetCompleted(exIndex, setIndex)
                                            console.log(`set ${setIndex}`, set?.isSetCompleted)

                                        }}
                                    />



                                </div>
                            ))}
                            <div ></div>

                        </div>

                        <Button onClick={() => addSet(exIndex)} label={"Add Set"} />
                        <Button
                            onClick={() => { setCurrexercise(exercise?.name); console.log('exercise.name', exercise?.name); setShowLastSessionHistory(true) }}

                            label={'History'}
                        />
                    </div>
                ))}

                {/* ✅ Save button */}

            </div>
            {sessionObject && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "1.5rem",
                        marginBottom: "1.5rem",
                        flexDirection: "column",
                        alignItems: 'center'
                    }}
                >



                    <Button
                        onClick={dailySession?.getworkoutsession ? updateworkout : handleSave}
                        disabled={
                            isSaving ||
                            isupdating ||

                            isDailySessionLoading ||
                            isWorkoutLoading
                        }
                        label={
                            (isSaving || isupdating)
                                ? "Processing..."
                                : dailySession?.getworkoutsession
                                    ? "Update Workout"
                                    : "Save Workout"
                        }
                    />





                </div>
            )}

            {/* <div className="PrevNextContainer">
                <span>Prev</span>
                <span>Next</span>
            </div> */}
        </div>
    );
}
