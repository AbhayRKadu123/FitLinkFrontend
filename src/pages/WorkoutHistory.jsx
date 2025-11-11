import HeadingContainer from "../components/HeadingContainer"
import "../styles/WorkoutHistory.css"
import { useGetWorkoutHistoryQuery } from "../features/api/WorkoutApi"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
export default function WorkoutHistory() {
    let { data ,refetch } = useGetWorkoutHistoryQuery({})
    let navigate = useNavigate()
    useEffect(()=>{
refetch()
    },[])

    console.log('data', data)
    function WorkoutHistory({ Heading, Date, PlanType, Title, OnClick }) {
        return <div className="WorkoutHistoryCard" onClick={() => { OnClick() }}>
            <div className="WorkoutHistoryCardHeading"><h5>{Heading}</h5></div>
            <div className="WorkoutHistoryCardDate">
                <span className="WorkoutHistoryCardDateContainer">
                    <span style={{ fontWeight: '500' }}>Date</span>
                    <span>{Date}</span>
                </span>
                <span className="WorkoutHistoryCardPlanContainer">
                    <span style={{ fontWeight: '500' }}>Plan</span>
                    <span>{PlanType}</span>
                </span>
            </div>
            <div className="WorkoutHistoryCardTitle">
                <span ><h5 style={{ fontWeight: '500', fontSize: '1.3rem' }}>Title</h5>
                    <span>{Title}</span>


                </span>

            </div>


        </div>
    }
    return <div className="WorkoutHistoryContainer">
        <HeadingContainer Title={'Workout History'}></HeadingContainer>
        <div className="WorkoutHistoryCardContainer">
            {data && data.map((ele) => {
                return <WorkoutHistory OnClick={() => { navigate(`/DetailWorkoutHistory?id=${ele?._id}`); console.log("on click btn ", ele?._id) }} Heading={`${ele?.planType} Workout Card`} Date={ele?.date} PlanType={ele?.planType} Title={ele?.Title}></WorkoutHistory>


            })}

        </div>
        <div className="WorkoutHistoryTopMenu">
            <span className="WorkoutRoutineBadge">Custom</span><span className="WorkoutRoutineBadge">Fst7</span><span className="WorkoutRoutineBadge">{`GVT (German Volume Training)`}</span>


        </div>
    </div>

}