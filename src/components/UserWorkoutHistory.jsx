import { useState } from "react"
import "../styles/UserWorkoutHistory.css"
import Input from "./Input"
export default function UserWorkoutHistory() {
    const [Level, setLevel] = useState("Beginner")
    const [Day,setselectedDay]=useState(6)
    return <div className="UserWorkoutHistory">
        <div className="UserWorkoutHistoryBasicInfo">
            <h4 style={{ color: 'black', textAlign: 'center', padding: '0.1rem', width: '100%', height: '19%' }}>Basic Info</h4>
            <div style={{
                borderBottom: '1px solid rgba(0, 0, 0, 0.3)'
                , height: '1%',
            }}></div>

            <div style={{ height: '80%', width: '100%', display: 'flex', justifyContent: 'space-evenly', alignItems: "center" }}>
                <div style={{ width: '40%', height: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Input label={'Your Weight'}></Input>
                </div>
                <div style={{ width: '40%', height: '70%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Input label={'Your height'}></Input>

                </div>

            </div>
        </div>
        <div className="UserWorkoutHistoryTrainingExperience">
            <h4 style={{ color: 'rgb(0,0,0,0.5)', paddingLeft: '0.3rem', height: '19%' }}>Training Experience ?</h4>
            <p style={{ color: 'rgb(0,0,0,0.5)', paddingLeft: '0.3rem', height: '19%', fontSize: '0.8rem' }}>How Long have u been working out ?</p>
            <div className="TrainingExperienceInnerContainer">
                <span onClick={() => { setLevel('Beginner') }} style={{ borderTopLeftRadius: '0.5rem', borderBottomLeftRadius: '0.5rem' }} className={Level == 'Beginner' ? "SelectExperience ActiveLevel" : "SelectExperience"}>
                    <p>Beginner</p>
                    <p>{`(< 3 month)`}</p>

                </span>
                <span onClick={() => { setLevel('Intermediate') }} className={Level == 'Intermediate' ? "SelectExperience ActiveLevel" : "SelectExperience"}>
                    <p>Intermediate</p>
                    <p>{`( 3 - 12 months)`}</p>
                </span>
                <span onClick={() => { setLevel('Advance') }} style={{ borderTopRightRadius: '0.5rem', borderBottomRightRadius: '0.5rem' }} className={Level == 'Advance' ? "SelectExperience ActiveLevel" : "SelectExperience"}>
                    <p>Advance</p>
                    <p>{`1+ Year`}</p>
                </span>

            </div>


        </div>
        <div className="No_Of_Days_To_Workout">
            <h4 style={{ width: '80%', height: '19%', color: 'rgb(0,0,0,0.5)', paddingLeft: '0.3rem' }}>How Many Days Per week?</h4>
            <p style={{ width: '80%', height: '19%', color: 'rgb(0,0,0,0.5)', paddingLeft: '0.3rem' }}>Days you can train</p>
            <div className="NoOfDaysDaysContainer" >
                <span onClick={()=>{setselectedDay(3)}} className={Day==3?"Days Active":"Days"}><p>3</p></span>
                <span onClick={()=>{setselectedDay(4)}} className={Day==4?"Days Active":"Days"}><p>4</p></span>
                <span onClick={()=>{setselectedDay(5)}} className={Day==5?"Days Active":"Days"}><p>5</p></span>
                <span onClick={()=>{setselectedDay(6)}} className={Day==6?"Days Active":"Days"}><p>6</p></span>


            </div>


        </div>
        <div className="EquipMentAvailableBox"></div>
       


    </div>
}