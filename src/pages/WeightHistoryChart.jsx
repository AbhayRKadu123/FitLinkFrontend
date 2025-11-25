import "../styles/WeightHistoryChart.css"
import HeadingContainer from "../components/HeadingContainer"
import { useGetAllWeightGraphandDetailQuery } from "../features/api/WeightTrackingApi"
function WeightLogCard({ data }) {
  const { username, weight, TodaysDate } = data || {};

  return (
    <div
      style={{
        width: "280px",
        background: "linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)",
        color: "#222",
        borderRadius: "20px",
        padding: "20px",
        boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.1)",
        border: "1px solid #e6e6e6",
        fontFamily: "'Segoe UI', sans-serif",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        transition: "all 0.3s ease",
        backdropFilter: "blur(6px)",
        flexShrink:0,
        marginTop:'0.5rem',
        marginBottom:'0.5rem'
      }}
    >
      {/* Title */}
      <h2
        style={{
          margin: 0,
          fontSize: "1.4rem",
          fontWeight: "700",
          color: "#111",
          letterSpacing: "0.5px",
        }}
      >
        Weight Log
      </h2>

      <hr
        style={{
          border: "none",
          height: "1px",
          background: "#ddd",
        }}
      />

      {/* Username */}
      <div style={{ fontSize: "1rem", opacity: 0.9 }}>
        <strong style={{ color: "#555" }}>User:</strong> {username}
      </div>

      {/* Weight */}
      <div
        style={{
          fontSize: "1rem",
          fontWeight: "700",
          background: "linear-gradient(135deg, #4b79a1, #283e51)",
          color: "#fff",
          padding: "10px",
          borderRadius: "14px",
          textAlign: "center",
          letterSpacing: "1px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.25)",
        }}
      >
        {weight} kg
      </div>

      {/* Date */}
      <div
        style={{
          fontSize: "0.9rem",
          opacity: 0.7,
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #ddd",
          paddingTop: "8px",
        }}
      >
        <strong style={{ color: "#555" }}>Date:</strong> {TodaysDate}
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