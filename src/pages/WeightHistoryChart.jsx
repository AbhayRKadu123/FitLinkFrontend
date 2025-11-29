import "../styles/WeightHistoryChart.css"
import HeadingContainer from "../components/HeadingContainer"
import { useGetAllWeightGraphandDetailQuery } from "../features/api/WeightTrackingApi"
function WeightLogCard({ data }) {
  const { username, weight, TodaysDate } = data || {};

  return (
    <div
      style={{
        width: "260px",
        // background: "#fff",
        border: "1px solid #000",
        borderRadius: "8px",
        padding: "16px",
        fontFamily: "sans-serif",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        flexShrink: 0,
        margin: "0.5rem 0",
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: "1.1rem",
          fontWeight: "600",
          color: "#000",
        }}
      >
        Weight Log
      </h2>

      <div style={{ fontSize: "0.95rem", color: "#000" }}>
        <strong>User:</strong> {username}
      </div>

      <div
        style={{
          fontSize: "1rem",
          fontWeight: "600",
          color: "#000",
          padding: "6px 0",
          border: "1px solid #000",
          borderRadius: "6px",
          textAlign: "center",
        }}
      >
        {weight} kg
      </div>

      <div
        style={{
          fontSize: "0.9rem",
          color: "#000",
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #000",
          paddingTop: "6px",
        }}
      >
        <strong>Date:</strong> {TodaysDate}
      </div>
    </div>
  );
}


export default function WeightHistoryChart() {
    const {data}= useGetAllWeightGraphandDetailQuery({})
    console.log('data==',typeof data?.data)
    return <div className="WeightHistoryChartContainer">
        <HeadingContainer Title={'Weight History'}></HeadingContainer>
        <div className="WeightChartContainer">
{data?.data?.map((ele)=>WeightLogCard({data:ele}))}



        </div>



    </div>
}