import "../styles/AllPointHistory.css"
import HeadingContainer from "../components/HeadingContainer"
import CommonDropDown from "../components/CommonDropDown"
import { useEffect, useState } from "react"
import { useGetAllPointHistoryOptionsQuery, useGetAllPointHistoryDataQuery } from "../features/api/UserApi"
function AllPointsHistoryCard({ Data,ImageUrl}) {
    console.log("AllPointsHistoryCard",Data)
    return <div className="AllPointHistoryCardContainer">

        <div className="AllPointHistoryCardImageContainer">
            <img src={ImageUrl}></img>

        </div>
        <div className="AllPointHistoryCardTextContainer">
            <p>Congratulation You recieved {Data?.points} For {Data?.PointsType}</p>
            <p><b>Date :</b> {Data?.Date}</p>

        </div>

    </div>
}
export default function AllPointHistory() {
    const [PointHistory, setPointHistory] = useState("all")
    const [Options, setOptions] = useState([])
    const {
        data: pointHistoryData,
        isLoading,
        isSuccess
    } = useGetAllPointHistoryOptionsQuery({
        Option: null
    });
    const {
        data: pointHistory,
        isLoading: pointHistoryLoading,
        isSuccess: pointHistorySuccess
    } = useGetAllPointHistoryDataQuery({
        Option: PointHistory
    });
    // useGetAllPointHistoryDataQuery
    const ImageObject={
        ReferralPointImage:"Images/PointHistoryIcons/connections.png",
        WorkoutCompleteBonus:"Images/PointHistoryIcons/exercise-routine.png",
        SignupBonusPoints:"Images/PointHistoryIcons/signup.png"

    }
    function GetPointImage({Obj,Type}){
        if(Type=="WorkoutComplete"){
            return ImageObject.WorkoutCompleteBonus
        }else if(Type=="SignupBonus"){
            return ImageObject.SignupBonusPoints


        }else if(Type=="ReferralBonus"){
            return ImageObject.ReferralPointImage

            
        }

    }
    useEffect(() => {
        console.log("pointHistoryData", pointHistoryData?.Options[0]?.Types)
        let FormatedOptions = pointHistoryData?.Options[0]?.Types?.map((ele) => {
            return { label: ele, value: ele }
        }) || []



        setOptions((prev) => {
            return [{ label: "all", value: "all" }, ...FormatedOptions]
        })
    }, [pointHistoryData])

    useEffect(() => {
        // pointHistory
        console.log('pointHistory)',typeof pointHistory?.Data)
        console.log('pointHistory)', pointHistory?.Data[0])

    }, [pointHistory])
    return <div className="AllPointHistoryContainer">
        <HeadingContainer Title={"All point History"}></HeadingContainer>
        <div className="AllPointHistoryInnerContainer">
            {/* AllPointHistoryInnerContainer
             */}
            <div className="AllPointHistoryInnerContainerDropDownContainer">
                <CommonDropDown label={"All Point History"} options={Options} value={PointHistory} onChange={(event) => { setPointHistory(event.target.value) }} ></CommonDropDown>

            </div>
            <div className="AllPointsHistory">
                {pointHistory?.Data.map((ele) => {
                    const ImageUrl=GetPointImage({Obj:ImageObject,Type:ele?.PointsType})
                    return <AllPointsHistoryCard Data={ele} ImageUrl={ImageUrl}></AllPointsHistoryCard>

                })}
                {/* pointHistory?.Data */}


            </div>



        </div>
    </div>
}