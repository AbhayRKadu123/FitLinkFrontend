import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

import Dropdown from "./Dropdown";
export default function ExerciseSetComparisonChart({ sets,GetGraphData,setGetGraphData,options}) {
  console.log('sets=',sets)
  return (
    <div
      style={{
        width: "95%",
        height: 400,
        marginTop: "1rem",
        // background: "linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)",
        borderRadius: "1rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        padding: "1rem",
      }}
    >
     <div style={{width:'100%',display:'flex',justifyContent:'center',marginBottom:'0.5rem'}}><Dropdown label="Select Exercise" graphData={GetGraphData} setGraphData={setGetGraphData} options={options} /></div>

      <h3
        style={{
          textAlign: "center",
          color: "#2c3e50",
          fontSize: "1.1rem",
          fontWeight: "600",
          marginBottom: "0.5rem",
        }}
      >
        Set-Wise Performance Comparison for pullups
      </h3>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart
          data={sets}
          barGap={5}
          margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />

          <XAxis
            dataKey="set"
            tick={{ fontSize: 12, fill: "#444", fontWeight: 500 }}
          />

          <YAxis
            tick={{ fontSize: 12, fill: "#444" }}
            axisLine={{ stroke: "#ccc" }}
            tickLine={{ stroke: "#ccc" }}
          />

          <Tooltip
            contentStyle={{
              // backgroundColor: "#fdfdfd",
              borderRadius: "8px",
              border: "1px solid #ddd",
            }}
            cursor={{ fill: "rgba(0,0,0,0.05)" }}
          />

          <Legend verticalAlign="top" height={60} />

          {/* Last Session Bars */}
          <Bar
            dataKey="lastReps"
            fill="#90a4f0"
            name="Last Reps"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="lastWeight"
            fill="#7986cb"
            name="Last Weight"
            radius={[4, 4, 0, 0]}
          />

          {/* Current Session Bars */}
          <Bar
            dataKey="currentReps"
            fill="#82ca9d"
            name="Current Reps"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="currentWeight"
            fill="#4caf50"
            name="Current Weight"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
