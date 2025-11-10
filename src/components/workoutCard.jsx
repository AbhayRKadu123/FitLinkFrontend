// import "../styles/workoutCard.css"
// export default function WorkoutCard({day,exerise}){

//     return <div className="workoutcardcontainer" >
// <h1>Chest and Bicep</h1>
// <ul>
//     <li>Flat Bench Press</li>
//     <li>Incline Bench Press</li>
//     <li>Decline Bench Press</li>
//     <li>Tricep Extension</li>
//     <li>Skull Crusher</li>

// </ul>
// <button>Edit</button>
//     </div>
// }




import { useEffect, useState } from "react";
import "../styles/workoutCard.css";
import { useUpdateWorkoutRoutinMutation } from "../features/api/WorkoutApi";

export default function WorkoutCard({ day, Title, ExerciseList, id, refetch }) {
    if (ExerciseList?.length == 0) return null
    if (!ExerciseList) return null
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(Title);
    const [exerciseList, setExerciseList] = useState([...ExerciseList]);

    const [newExercise, setNewExercise] = useState("");
    const [UpdateRoutin, { data: UpdatedRoutin, error, isSuccess: RoutinUpdated }] = useUpdateWorkoutRoutinMutation();


    useEffect(() => {
       refetch()
    }, [error])

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
