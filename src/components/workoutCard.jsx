


import { useEffect, useState } from "react";
import "../styles/workoutCard.css";
import { useUpdateWorkoutRoutinMutation } from "../features/api/WorkoutApi";
import { useContext } from "react";
import MyContext from "../../public/utils/MyContext";
export default function WorkoutCard({ day, Title, ExerciseList, id, refetch, PlanEditSuccessfully, setPlanEditSuccessfully }) {
    if (ExerciseList?.length == 0) return null
    if (!ExerciseList) return null
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(Title);
    const [exerciseList, setExerciseList] = useState([...ExerciseList]);

    const [newExercise, setNewExercise] = useState("");
    const [UpdateRoutin, { data: UpdatedRoutin, error, isSuccess: RoutinUpdated }] = useUpdateWorkoutRoutinMutation();
 const {
  ShowNotification,
  setShowNotification,
  NotificatonType,
  setNotificatioinType,
  NotificationMessage,
  setNotificationMessage
} = useContext(MyContext);

    useEffect(() => {
        refetch()
    }, [error])
    useEffect(() => {
        console.log("RoutinUpdated",RoutinUpdated)
        if (RoutinUpdated == true) {
            refetch()
            setShowNotification(true)
            setNotificatioinType('success')
            setNotificationMessage('Routine Update Successfully')

            // setPlanEditSuccessfully(true)

        }
    },[RoutinUpdated])

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
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <ul className="exerciseList">
                        {exerciseList?.map((ex, index) => (
                            <li key={index}>
                                {ex}
                                <button
                                    className="deleteBtn"
                                    onClick={() =>
                                        setExerciseList(exerciseList.filter((_, i) => i !== index))
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
                </>
            )}
        </div>
    );
}
