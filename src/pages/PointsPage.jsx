import "../styles/PointsPage.css"
import HeadingContainer from "../components/HeadingContainer"
import { useEffect, useState } from "react"
import ProgressBar from "../components/ProgressBarComponent"
import { useGetUserDetailsQuery } from "../features/api/UserApi"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"

function PointConversionCard({ amount = 0, Inr = 0, Convert, Points }) {
    const navigate=useNavigate();

    const percentage = (Points / amount) * 100;
    console.log(percentage)



    return <div onClick={()=>{navigate("/DetailPointCnversionScreen")}} className="PointConversionCard">
        <div className="PointConversionCardTop">
            <img src="Images/money-bag.png"></img>
            <span>
                <img src="Images/coin.png"></img>
                <p>{amount}</p>
            </span>

        </div>
        <div className="PointConversionCardMiddle">
            <div>
                <span><p>{amount}</p><img src="Images/coin.png"></img></span>
                <span className="PointConversionInr"><p>{Inr}</p> <img style={{ width: "0.7rem", height: "0.7rem" }} src="Images/exchange.png"></img></span>

            </div>
            <div>
                <ProgressBar value={percentage} HidePersentage={true}></ProgressBar>
            </div>



        </div>
        <div style={{ backgroundColor: !Convert && "rgb(0,0,0,0.3)" }} className="PointConversionCardBottom">
            {Convert ? "Convert" : "disabled"}
        </div>




    </div>
}
export default function PointsPage() {
    let { data, refetch, isLoading, error } = useGetUserDetailsQuery({ Id: null })

    const [PointsPage, setPointsPage] = useState("CvtPoints")
    const [Convert, setConvert] = useState(true);
    const Points = data?.Detail[0]?.Points || 0;

    return <div className="PointPageContainer">
        <HeadingContainer Title={PointsPage == "CvtPoints" ? "Convert Points" : "Buy Points"}></HeadingContainer>
        <div className="PointPageInnerContainer">
            <div className="PointConversionBtn">
                <span onClick={() => { return toast.warning("This feature is under development phase"); setPointsPage("BuyPoints") }} className={`PointPageBtn ${PointsPage == "BuyPoints" ? "IsActive" : ""}`} >Buy Points</span>
                <span onClick={() => { setPointsPage("CvtPoints") }} className={`PointPageBtn ${PointsPage == "CvtPoints" && "IsActive"}`}>Convert Points</span>


            </div>
            <div className="PointConversionScreen">
                <div className="PointConversionScreenLeft">
                    <PointConversionCard amount={500} Inr={5} Points={Points}>

                    </PointConversionCard>
                    <PointConversionCard amount={1000} Inr={10} Points={Points} >

                    </PointConversionCard>
                    <PointConversionCard amount={1500} Inr={15} Points={Points}>

                    </PointConversionCard>
                    <PointConversionCard amount={2000} Inr={20} Points={Points}>

                    </PointConversionCard>

                </div>
                <div className="PointConversionScreenRight">
                    <PointConversionCard amount={5000} Inr={50} Points={Points}>

                    </PointConversionCard>
                    <PointConversionCard amount={10000} Inr={100} Points={Points}>

                    </PointConversionCard>
                    <PointConversionCard amount={15000} Inr={150} Points={Points}>

                    </PointConversionCard>
                    <PointConversionCard amount={20000} Inr={200} Points={Points}>

                    </PointConversionCard>
                </div>






            </div>


        </div>
    </div>
}