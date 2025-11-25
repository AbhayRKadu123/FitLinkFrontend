import "../styles/LogWorkoutScreen.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    useGetWorkoutSessoinQuery,
    useAddWorkoutSessionMutation,
    useGetDailySessionQuery,
    useUpdateWorkoutSessionMutation
} from "../features/api/WorkoutApi";
import LoadingSpinner from "../components/LoadingSpinner";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import Input from "../components/Input";
import HeadingContainer from "../components/HeadingContainer";

export default function LogWorkoutScreen() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const ID = searchParams.get("Id");
    const NestedId = searchParams.get("NestedId");
    const ReqDay = searchParams.get("ReqDay");

    // --- Fetch base workout template ---
    const {
        data: workoutData,
        isLoading: isWorkoutLoading,
        error: workoutError,
    } = useGetWorkoutSessoinQuery({ ID, NestedId, ReqDay });

    // --- Fetch existing session for today ---
    const {
        data: dailySession,
        isLoading: isDailySessionLoading,
        error: dailySessionError,
        refetch
    } = useGetDailySessionQuery({
        planType: "custom",
        Date: new Date().toISOString().split("T")[0],
        Title: workoutData?.result?.Title?.trim(),
    });
const [isDisabled,setisDisabled]=useState(false)
    // --- Mutation for adding workout session ---
    const [addWorkout, { isLoading: isSaving, isSuccess: saveSuccess, error: saveError }] =
        useAddWorkoutSessionMutation();
    // useUpdateWorkoutSessionMutation
    const [updateWorkout, { isLoading: isupdating, isSuccess: updateSuccess, error: updateError }] =
        useUpdateWorkoutSessionMutation();

    // --- Local state for session object ---
    const [sessionObject, setSessionObject] = useState(null);
        // setisDisabled(true)

        useEffect(()=>{
            if(saveSuccess==true){
                setisDisabled(true)
            }
              if(updateSuccess==true){
                setisDisabled(true)
            }

        },[saveSuccess,updateSuccess])
    // --- Initialize session data ---
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

                    if (ele.trim().toLowerCase() === arr[i]?.name.trim().toLowerCase()) {

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
            setSessionObject({ ...Obj });
            return;
        }

        // Else create a new session base
        if (workoutData?.result) {
            const baseSession = {
                username: localStorage.getItem("username"),
                planType: "custom",
                Title: workoutData.result.Title.trim(),
                day: ReqDay,
                date: new Date().toISOString().split("T")[0],
                exercises:
                    workoutData.result.exercises?.map((ex) => ({
                        name: ex,
                        sets: [],
                    })) || [],
            };
            setSessionObject(baseSession);
        }
    }, [workoutData, dailySession]);

    // --- Add a new set to exercise ---
    const addSet = (exIndex) => {
        setSessionObject((prev) => {
            if (!prev) return prev;
            const updatedExercises = prev.exercises.map((ex, i) =>
                i === exIndex
                    ? { ...ex, sets: [...ex.sets, { reps: "", weight: "" }] }
                    : ex
            );
            return { ...prev, exercises: updatedExercises };
        });
    };

    // --- Remove a set ---
    const removeSet = (exIndex, setIndex) => {
        setSessionObject((prev) => {
            if (!prev) return prev;
            const updatedExercises = prev.exercises.map((ex, i) =>
                i === exIndex
                    ? { ...ex, sets: ex.sets.filter((_, idx) => idx !== setIndex) }
                    : ex
            );
            return { ...prev, exercises: updatedExercises };
        });
    };

    // --- Handle input changes for reps & weight ---
    const handleInputChange = (exIndex, setIndex, field, value) => {
        setSessionObject((prev) => {
            if (!prev) return prev;
            const updatedExercises = prev.exercises.map((ex, i) =>
                i === exIndex
                    ? {
                        ...ex,
                        sets: ex.sets.map((set, sIndex) =>
                            sIndex === setIndex ? { ...set, [field]: value } : set
                        ),
                    }
                    : ex
            );
            return { ...prev, exercises: updatedExercises };
        });
    };

    async function updateworkout() {
        console.log("Update workout button clicked");

        try {
            // ✅ Check if there’s valid data
            if (!sessionObject || !sessionObject._id) {
                console.error("❌ Missing session ID or data. Cannot update workout.");
                alert("No session selected to update!");
                return;
            }

            console.log("Updating workout with data:", sessionObject);
        setisDisabled(true)


            // ✅ Call the update API
           const result = await updateWorkout(sessionObject)
           refetch()

            // ✅ Handle API response
            if (result?.data) {
                console.log("✅ Workout updated successfully:", result.data);
                alert("Workout updated successfully!");
            } else if (result?.error) {
                console.error("❌ Error updating workout:", result.error);
                alert("Failed to update workout. Please try again.");
            } else {
                console.warn("⚠️ Unexpected response format:", result);
                alert("Unexpected error occurred.");
            }

        } catch (error) {
            console.error("❌ Exception while updating workout:", error);
            alert("Something went wrong. Please try again.");
        }
    }

    // --- Handle save ---
    const handleSave = async () => {
        if (!sessionObject) return alert("Nothing to save!");

        // Validation: at least one set added
        const hasSets = sessionObject.exercises.some((ex) => ex.sets.length > 0);
        if (!hasSets) {
            alert("Please add at least one set before saving.");
            return;
        }
        setisDisabled(true)

        try {
            const res = await addWorkout(sessionObject).unwrap();
            refetch()
            alert("Workout saved successfully!");
            console.log("Workout saved result:", res);
        } catch (err) {
            console.error("Error saving workout:", err);
            alert("Failed to save workout. Please try again.");
        }
    };

    // --- Debug logging ---
    useEffect(() => {
        console.log("SessionObject:", sessionObject);
    }, [sessionObject]);


    return (
        <div className="LogWorkoutScreenContainer">
            {/* <div className="LogWorkoutScreenHeading">
                <img
                    onClick={() => navigate(-1)}
                    style={{ width: "1.5rem", height: "1.5rem", cursor: "pointer" }}
                    src="Images/left-arrow.png"
                    alt="back"
                />
                <h4 style={{ color: "black", marginLeft: "0.5rem", fontSize: "1.5rem" }}>
                    {workoutData?.result?.Title}
                </h4>
            </div> */}
            <HeadingContainer Title={workoutData?.result?.Title}></HeadingContainer>

            <div className="LogWorkoutExerciseSession">
                {(isWorkoutLoading || isDailySessionLoading) && <LoadingSpinner />}

                {sessionObject?.exercises?.map((exercise, exIndex) => (
                    <div key={exIndex} className="ExerciseContainer">
                        <h4
                            style={{
                                color: "white",
                                textAlign: "center",
                                marginTop: "0.3rem",
                                fontSize: "1.2rem",
                            }}
                        >
                            {exercise.name}
                        </h4>

                        <div className="SetHolder">
                            {exercise.sets.map((set, setIndex) => (
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
                                </div>
                            ))}
                        </div>

                        <Button onClick={() => addSet(exIndex)} label={"Add Set"} />
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
                    }}
                >
                    <Button
                        
                        onClick={dailySession?.getworkoutsession ? updateworkout : handleSave}
                        disabled={isDisabled||isSaving || isupdating || isDailySessionLoading || isWorkoutLoading}
                        label={
                            (isDisabled||isSaving || isupdating || isDailySessionLoading || isWorkoutLoading)
                                ? "Processing..."
                                : dailySession?.getworkoutsession
                                    ? "Update Workout"
                                    : "Save Workout"
                        }
                    />


                </div>
            )}

            <div className="PrevNextContainer">
                <span>Prev</span>
                <span>Next</span>
            </div>
        </div>
    );
}
