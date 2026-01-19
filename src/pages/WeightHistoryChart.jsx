import "../styles/WeightHistoryChart.css"
import HeadingContainer from "../components/HeadingContainer"
import { useGetAllWeightGraphandDetailQuery, useAddUserWeightMutation } from "../features/api/WeightTrackingApi"
import Input from "../components/Input.jsx"
import Button from "../components/Button.jsx"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

function WeightLogCard({ data }) {
  const { username, weight, TodaysDate } = data || {};

  return (
    <div
      className="WeightCard"
      style={{
        // width: "260px",
        // // background: "#fff",
        // // border: "1px solid #000000",
        // backgroundColor:"rgba(0,0,0)",
        // borderRadius: "8px",
        // padding: "16px",
        // fontFamily: "sans-serif",
        // display: "flex",
        // flexDirection: "column",
        // gap: "10px",
        // flexShrink: 0,
        // margin: "0.5rem 0",
      }}
    >
      <h6>Date : 25/02/2025</h6>
      <p>Weight : 76kg</p>

    </div>
  );
}
function getFormattedToday() {
  // const utcNow = new Date().toISOString();
  const utcDate = new Date();
  console.log('utcDate', utcDate)
  const istDate = new Date(utcDate.getTime() + (5.5 * 60 * 60 * 1000));
  console.log('isodate', istDate.toISOString()?.split('T')[0]);

  return istDate.toISOString()?.split('T')[0]
}

export default function WeightHistoryChart() {
  const { data, refetch } = useGetAllWeightGraphandDetailQuery({})
  // useAddUserWeightMutation
  const [AddWeight, { data: Add, isLoading, isError, isSuccess, error }] = useAddUserWeightMutation();
  const [weight, setweight] = useState(0)
  useEffect(() => {
    if (isSuccess) {
      toast.success("Weight Logged successfully!")
      setweight(0)
      refetch()
    }
  }, [isSuccess])
  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message || "Error logging weight!")
      setweight(0)
      refetch()


    }

  }, [isError])
  console.log('data==', typeof data?.data)
  return <div className="WeightHistoryChartContainer">
    <HeadingContainer Title={'Weight History'}></HeadingContainer>
    <div className="WeightChartContainer">
      <div className="EnterWeightContainer">
        <div className="EnterWeightInputContainer"><Input value={weight} onChange={(event) => { setweight(event.target.value) }} placeholder={"Weight in kg"}></Input> </div>
        <Button onClick={async () => { if (weight==0) return toast.warning("Weight Cant be 0!"); await AddWeight({ weight, TodaysDate: getFormattedToday() }) }} label={"Submit"}></Button>
      </div>
      <div className="ShowWeightHistoryContainer">

        {data?.data?.map((ele) => WeightLogCard({ data: ele }))}

      </div>




    </div>



  </div>
}