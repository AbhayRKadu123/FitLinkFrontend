import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function SimpleBarChart() {
  const data = [
    { name: "PullUps", last: 50, current: 55 },
    { name: "Rows", last: 55, current: 58 },
    { name: "LatPullDown", last: 53, current: 57 },
    { name: "DBCurl", last: 58, current: 60 },
    { name: "InclineCurl", last: 60, current: 63 },
    { name: "ReverseCurl", last: 60, current: 63 },
  ];

  return (
    <div
      style={{
        width: "95%",
        height: 320,
        marginTop: "1rem",
        background: "linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)",
        borderRadius: "1rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        padding: "1rem",
      }}
    >
      <h3
        style={{
          textAlign: "center",
          color: "#2c3e50",
          fontSize: "1.1rem",
          fontWeight: "600",
          marginBottom: "0.5rem",
        }}
      >
        Weekly Progress Comparison
      </h3>

      <ResponsiveContainer width="100%" height="85%">
        <BarChart data={data} barGap={6} margin={{ top: 10, right: 20, left: 0, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />

          {/* Adjusted X-axis to make labels fully visible */}
          <XAxis
            dataKey="name"
            angle={-20}
            textAnchor="end"
            interval={0}
            tick={{ fontSize: 12, fill: "#444", fontWeight: 500 }}
            height={50} // extra space at bottom for labels
          />

          <YAxis
            tick={{ fontSize: 12, fill: "#444" }}
            axisLine={{ stroke: "#ccc" }}
            tickLine={{ stroke: "#ccc" }}
          />

          <Tooltip
            contentStyle={{ backgroundColor: "#fdfdfd", borderRadius: "8px", border: "1px solid #ddd" }}
            cursor={{ fill: "rgba(0,0,0,0.05)" }}
          />

          <Legend verticalAlign="top" height={30} />

          {/* Two bars for comparison */}
          <Bar dataKey="last" fill="#90a4f0" name="Last Session" radius={[4, 4, 0, 0]} />
          <Bar dataKey="current" fill="#82ca9d" name="Current Session" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
