import HeadingContainer from "../components/HeadingContainer"
import WorkoutHistory from "./WorkoutHistory";
import "../styles/WorkoutHistory.css"
import { useSearchParams } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useGetWorkoutHistoryQuery } from "../features/api/WorkoutApi";

export default function SpecificPlanWorkoutHistory(){
       function WorkoutHistory({ Heading, Date, PlanType, day, Title, OnClick }) {
        return <div className="WorkoutHistoryCard" onClick={() => { OnClick() }}>
            <div className="WorkoutHistoryCardHeading"><h5>{Heading}</h5></div>
            <div className="WorkoutHistoryCardDate">
                <span className="WorkoutHistoryCardDateContainer">
                    <span style={{ fontWeight: '500' }}>Date</span>
                    <span>{`(${day}) ${Date}`}</span>
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
     let { data, refetch } = useGetWorkoutHistoryQuery({})
        let navigate = useNavigate()
        useEffect(() => {
            refetch()
        }, [])
    const [searchParams] = useSearchParams();
  const type = searchParams.get("Type");
console.log('Type=',type)
    return <div className="WorkoutHistoryContainer">
        <HeadingContainer Title={`${type} Workout History`}></HeadingContainer>
        <div className="WorkoutHistoryCardContainer">
            {/* <WorkoutPlanType_History></WorkoutPlanType_History> */}

{data && data.map((ele) => {
                return <WorkoutHistory OnClick={() => { navigate(`/DetailWorkoutHistory?id=${ele?._id}`); console.log("on click btn ", ele?._id) }} Heading={`${ele?.planType} Workout Card`} Date={ele?.date} day={ele?.day} PlanType={ele?.planType} Title={ele?.Title}></WorkoutHistory>


            })}
        

        </div>
      
    </div>
}