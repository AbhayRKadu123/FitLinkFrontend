


import { useEffect, useState } from "react";
import "../styles/workoutCard.css";
import { useUpdateWorkoutRoutinMutation, useDeleteWorkoutRoutineExeriseMutation } from "../features/api/WorkoutApi";
import { useContext } from "react";
import MyContext from "../../public/utils/MyContext";
import { toast } from "react-toastify";
export default function WorkoutCard({ day, Title, ExerciseList, id, refetch, PlanEditSuccessfully, setPlanEditSuccessfully }) {
    if (ExerciseList?.length == 0) return null
    if (!ExerciseList) return null
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(Title);
    const [exerciseList, setExerciseList] = useState([...ExerciseList]);

    const [newExercise, setNewExercise] = useState("");
    // useDeleteWorkoutRoutineExeriseMutation
    const [DeleteSpecificDayRoutine, { data: DeleteSpecificDayRoutinedata, error: DeleteSpecificDayRoutineerror, isError: DeleteSpecificDayRoutineisError, isSuccess: DeleteSpecificDayRoutineRoutinDeleted }] = useDeleteWorkoutRoutineExeriseMutation();

    const [UpdateRoutin, { data: UpdatedRoutin, error, isError, isSuccess: RoutinUpdated }] = useUpdateWorkoutRoutinMutation();
    const {
        ShowNotification,
        setShowNotification,
        NotificatonType,
        setNotificatioinType,
        NotificationMessage,
        setNotificationMessage
    } = useContext(MyContext);

    useEffect(() => {
        console.log("error", error?.data?.message)
        refetch()

        if (error) {
            toast.error(error?.data?.message || 'Something went wrong');
        }
    }, [error])
    useEffect(()=>{
        if(DeleteSpecificDayRoutineRoutinDeleted){
            toast.success("deletion successfull")
            refetch();
        }

    },[DeleteSpecificDayRoutineRoutinDeleted])
    useEffect(() => {
        console.log("RoutinUpdated", RoutinUpdated)
        if (RoutinUpdated == true) {
            refetch()
            setShowNotification(true)
            setNotificatioinType('success')
            setNotificationMessage('Routine Update Successfully')

            // setPlanEditSuccessfully(true)

        }
    }, [RoutinUpdated])

    function handleAddExercise() {
        if (newExercise.trim() === "") return;
        setExerciseList([...exerciseList, newExercise]);
        setNewExercise("");
    }
    function HandleEdit() {
        console.log('day=', day)
        console.log("Title-", title),
            console.log('Exercise List', exerciseList)
        console.log('HandleEdit done')
        if (title.trim() == "") {
            refetch()

            return toast.error("Title is Missing")
        }
        if (exerciseList.length == 0) {
            refetch()

            return toast.error("Exercise List cant be empty!")


        }
        UpdateRoutin({ id: id, day: day, title: title, exercise: exerciseList })
    }

    // useEffect(())

    return (
        <div className="workoutcardcontainer">
            {isEditing ? (
                <>
                    <input
                        className="titleInput"
                        value={title}
                        onChange={(e) => setTitle((prev) => {
                            let OldTitle = prev;
                            if (e.target.value.trim() == "") {
                                toast.warning("Title Can't be empty !")
                                return OldTitle
                            } else {
                                return e.target.value
                            }
                        })}
                    />
                    <ul className="exerciseList">
                        {exerciseList?.map((ex, index) => (
                            <li key={index}>
                                {ex}
                                <button
                                    className="deleteBtn"
                                    onClick={() => {
                                        if (exerciseList.length <= 1) {
                                            return toast.warning("there must be at least one exercise")
                                        }
                                        setExerciseList(exerciseList.filter((_, i) => i !== index))
                                    }
                                    }
                                >
                                    ✕
                                </button>
                            </li>
                        ))}
                    </ul>

                    <div className="addExerciseContainer">
                        <input
                            placeholder="Add new exercise..."
                            value={newExercise}
                            onChange={(e) => setNewExercise(e.target.value)}
                        />
                        <button className="addBtn" onClick={handleAddExercise}>
                            ➕ Add
                        </button>
                    </div>

                    <button className="saveBtn" onClick={async () => { HandleEdit(); return setIsEditing(false) }}>
                        💾 Save
                    </button>
                </>
            ) : (
                <>
                    <h2>{day}-<span style={{ fontWeight: '400' }}>({title})</span></h2>
                    <ul className="exerciseList">
                        {exerciseList?.map((ex, i) => (
                            <li key={i}>{ex}</li>
                        ))}
                    </ul>
                    <button className="editBtn" onClick={() => setIsEditing(true)}>
                        ✏️ Edit
                    </button>
                    <button className="editBtn" onClick={async () => { await DeleteSpecificDayRoutine({ Day: day, id: id,Title:title}); console.log('delete', id) }}>
                        Delete
                    </button>
                </>
            )}
        </div>
    );
}
