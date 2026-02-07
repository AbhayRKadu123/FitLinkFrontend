import "../styles/Exercisedetail.css"
export default function Exercisedetail({ showDetail, setshowDetail, exercisedata, setexercisedata }) {
    if (!showDetail) return null;
    return <div className="modalOverlay">
        <div className="modalContent">
            <h3 className="modalTitle">{exercisedata?.name}</h3>

            {/* Image preview box */}
            <div className="imagePreview">
                <img style={{ width: "100%", height: "100%", objectFit: "cover" }} src={exercisedata?.gifUrl}>
                </img>

            </div>
            <div className="ExerciseDetails">
              
            </div>



            {/* Action buttons */}
            <div className="modalActions">
                <button onClick={() => { setshowDetail(false), setexercisedata(null) }} className="cancelBtn">Cancel</button>
                <button disabled={false} onClick={async () => { console.log("add exercise") }} className="confirmBtn">{true ? 'Add' : 'remove'}</button>
            </div>
        </div>
    </div>
}