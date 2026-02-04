import "../styles/Exercisedetail.css"
export default function Exercisedetail({showDetail,setshowDetail,exercisedata,setexercisedata}){
    if(!showDetail) return null;
    return <div className="modalOverlay">
            <div className="modalContent">
                <h3 className="modalTitle">{exercisedata?.name}</h3>

                {/* Image preview box */}
                <div className="imagePreview">
                    <img style={{width:"100%",height:"100%",objectFit:"cover"}} src={exercisedata?.gifUrl}>
                    </img>
                   
                </div>
              <div className="ExerciseDetails">
  <h3>Weighted Dips</h3>
  <p><strong>Category:</strong> Push</p>
  <p><strong>Equipment:</strong> Mixed</p>
  <p><strong>Type:</strong> Compound</p>
  <p><strong>Muscle Group:</strong> Chest</p>
  <p><strong>Weighted:</strong> Yes</p>
  <p><strong>Instructions:</strong></p>
  <ul className="Instructions">
    <li>Set up proper posture</li>
    <li>Control the movement</li>
    <li>Use full range of motion</li>
    <li>Return slowly to start position</li>
  </ul>
</div>



                {/* Action buttons */}
                <div className="modalActions">
                    <button onClick={() => {setshowDetail(false),setexercisedata(null)  }} className="cancelBtn">Cancel</button>
                    <button disabled={false} onClick={async () => { console.log("add exercise") }} className="confirmBtn">{true ? 'Add' : 'remove'}</button>
                </div>
            </div>
        </div>
}