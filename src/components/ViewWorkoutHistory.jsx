import "../styles/ViewWorkoutHistory.css"
import Input from "./Input";
function ExerciseHistoryPill({reps,weight}){
    return <div class="ExerciseHistoryPill">
  <div class="field">
    <label>Weight</label>
    <input style={{color:'black'}} value={weight} type="number" placeholder="0" />
  </div>

  <div class="field">
    <label>Reps</label>
    <input  style={{color:'black'}} value={reps} type="number" placeholder="0" />
  </div>
</div>

}
export default function ViewWorkoutHistory({ exerciseName,ExerciseData,showDetail, setshowDetail,data }) {
    // console.log('data=',data?.result[0].exercises[0].sets)
    if (!showDetail) return null;
    return <div className="modalOverlay">
        <div className="modalContent">
            <h3 className="modalTitle">{`${data?.result[0]?.exercises[0]?.name||data[0]?.exercises.name} History`}</h3>

            <div className="ExerciseHistoryContainer">
                {data?.result==0?<h2 style={{color:"black"}}>No History Available</h2>:<>
                
{data?.result[0]?.exercises[0]?.sets?.map((ele,i)=>{
    console.log(ele.reps)
return <ExerciseHistoryPill key={i} reps={ele.reps} weight={ele.weight}></ExerciseHistoryPill>
})}

                  {/* <ExerciseHistoryPill></ExerciseHistoryPill>
                <ExerciseHistoryPill></ExerciseHistoryPill>
                <ExerciseHistoryPill></ExerciseHistoryPill> */}

                </>}
              


            </div>



            {/* Action buttons */}
            <div className="modalActions">
                <button onClick={() => { setshowDetail(false)}} className="cancelBtn">Cancel</button>
            {/* <button disabled={false} onClick={async () => { console.log("add exercise") }} className="confirmBtn">{true ? 'Add' : 'remove'}</button> */}
        </div>
    </div>
    </div >
}