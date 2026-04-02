import "../styles/CustomWorkoutPlannew.css"
import HeadingContainer from "../components/HeadingContainer"
import Input from "../components/Input"
import { useEffect, useState } from "react"
import Button from "../components/Button"
import { useGetRelatedExerciseDataQuery } from "../features/api/WorkoutApi"
import Exercisedetail from "../components/Exercisedetail"
// import Input from "../components/Input"

function FolderComponent({ name, isDefault, setFolderSettingScreen }) {
    return <div className="FolderComponent">
        <img src="Images/CustomWorkoutImages/RightArrow.png"></img>

        <p>{name}</p>
        {!isDefault && <img onClick={() => {
            setFolderSettingScreen((prev) => {
                return !prev;
            })
        }} className="FolderComponentOptions" src="Images/CustomWorkoutImages/more.png"></img>}


    </div>

}
export default function CustomWorkoutPlannew() {
    const [openCreateFolder, setopenCreateFolder] = useState(false);
    const [ChooseFolder, setChooseFolderScreen] = useState(false);
    const [FolderSettingScreen, setFolderSettingScreen] = useState(false);


    return <div className="NewCustomWorkplancontainer">
        {FolderSettingScreen && <div className="FolderSettingScreenContainer">
            <div className="FolderSettingScreenInnerContainer">
                <span><p>Reorder folder</p></span>
                <span><p>Rename folder</p></span>
                <span><p>Add new Routine</p></span>
                <span style={{border:"1px solid red",color:"red"}}><p>Delete folder</p></span>

            </div>
            <button onClick={() => {
                setFolderSettingScreen(false);
            }} className="FolderSettingScreenContainerCancelBtn">Cancel</button>

        </div>}
        {openCreateFolder && <div className="NewCustomWorkplanCreateFoldercontainer">
            <div className="NewCustomWorkplanCreateFolderInnercontainer">
                <p>Create New Folder</p>
                <input></input>
                <button style={{ backgroundColor: 'rgb(73, 73, 212)' }}><p>Save</p></button>
                <button onClick={() => {
                    setopenCreateFolder((prev) => {
                        return !prev;
                    })
                }}><p>Cancel</p></button>


            </div>
        </div>}
        {ChooseFolder && <div className="ChooseFolderContainer">

            <div className="ChooseFolderFolderList">
                <h5>Select Folder</h5>
                <span className="ChooseFolderContainerFolder"><img src="Images/CustomWorkoutImages/folder.png"></img><p>My Routine</p></span>
                <span className="ChooseFolderContainerFolder"><img src="Images/CustomWorkoutImages/folder.png"></img><p>New2026</p></span>


            </div>
            <button className="ChooseFolderFolderListCancelBtn" onClick={() => { setChooseFolderScreen(false) }}>Cancel</button>

        </div>}
        <HeadingContainer isColorBlack={true} Title={"Workout"}></HeadingContainer>
        <div className="NewCustomWorkoutPlanInnerContainer">
            <div className="NewCustomWorkoutUpperSection">
                <span>Routines</span><span><img onClick={() => {
                    setopenCreateFolder((prev) => {
                        return !prev;
                    })
                }} src="Images/CustomWorkoutImages/folder.png"></img></span>
            </div>
            <div className="NewCustomWorkoutSecondSection">
                <span onClick={() => {
                    return setChooseFolderScreen((prev) => {
                        return !prev;
                    })
                }}><img src="Images/CustomWorkoutImages/note.png"></img><p>New Routine</p></span>
                <span><img src="Images/CustomWorkoutImages/loupe.png"></img><p>Explore</p></span>

            </div>
            <div className="FolderContainer">
                <FolderComponent isDefault={true} name={"My Routine"} setFolderSettingScreen={setFolderSettingScreen}>

                </FolderComponent>
                <FolderComponent name={"NewRoutine2026"} setFolderSettingScreen={setFolderSettingScreen}>

                </FolderComponent>


            </div>


        </div>




    </div>
}