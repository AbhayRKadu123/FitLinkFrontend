import "../styles/Exercisedetail.css"
export default function Exercisedetail({ showDetail, setshowDetail, exercisedata, setexercisedata }) {
    if (!showDetail) return null;
    console.log("exercisedata", exercisedata)
    return <div className="modalOverlay">
        <div className="modalContent">
            <h3 className="modalTitle">{exercisedata?.name}</h3>

            {/* Image preview box */}
            <div className="imagePreview">
                <img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={exercisedata?.gifUrl}>
                </img>

            </div>
            <div className="ExerciseInstruction">
                <div class="exercise-card">
                    <h2 class="exercise-title">{exercisedata?.name}</h2>

                    <div class="exercise-details">
                        <div class="detail-item">
                            <span class="label">Category</span>
                            <span class="value">{exercisedata.category}</span>
                        </div>

                        <div class="detail-item">
                            <span class="label">Muscle Group</span>
                            <span class="value">{exercisedata?.muscleGroup}</span>
                        </div>

                        <div class="detail-item">
                            <span class="label">Type</span>
                            <span class="value">{exercisedata?.type}</span>
                        </div>

                        <div class="detail-item">
                            <span class="label">Equipment</span>
                            <span class="value">{exercisedata?.equipment}</span>
                        </div>
                    </div>

                    <div class="instructions">
                        <h3>Instructions</h3>
                        <ul>
                            {exercisedata?.instructions.map((ele)=>{
                                return <li>{ele}</li>
                            })}
                            
                           
                            
                        </ul>
                    </div>
                </div>


            </div>



            {/* Action buttons */}
            <div className="modalActions">
                <button onClick={() => { setshowDetail(false), setexercisedata(null) }} className="cancelBtn">Cancel</button>
                <button disabled={false} onClick={async () => { console.log("add exercise") }} className="confirmBtn">{true ? 'Add' : 'remove'}</button>
            </div>
        </div>
    </div>
}