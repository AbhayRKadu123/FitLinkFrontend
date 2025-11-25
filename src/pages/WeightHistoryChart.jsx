import "../styles/WeightHistoryChart.css"
import HeadingContainer from "../components/HeadingContainer"
import { useGetAllWeightGraphandDetailQuery } from "../features/api/WeightTrackingApi"
function WeightLogCard({ data }) {
  const { username, weight, TodaysDate } = data || {};

  return (
    <div
      style={{
        width: "280px",
        background: "#fff",
        color: "#000",
        borderRadius: "12px",
        padding: "18px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
        border: "1px solid #000",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {/* Title */}
      <h2
        style={{
          margin: 0,
          fontSize: "1.3rem",
          fontWeight: "700",
          borderBottom: "1px solid #000",
          paddingBottom: "6px",
        }}
      >
        Weight Log
      </h2>

      {/* Username */}
      <div style={{ fontSize: "1rem" }}>
        <strong>User:</strong> {username}
      </div>

      {/* Weight */}
      <div
        style={{
          fontSize: "1.6rem",
          fontWeight: "bold",
          background: "#000",
          color: "#fff",
          padding: "10px",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        {weight} kg
      </div>

      {/* Date */}
      <div
        style={{
          fontSize: "0.9rem",
          opacity: 0.8,
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


        </div>



    </div>
}