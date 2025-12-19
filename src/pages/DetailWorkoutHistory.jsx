import "../styles/DetailWorkoutHistory.css"
import React, { useEffect } from "react";
// import Butt
import { useState } from "react";
// import {useGetWorkoutHistoryDetailQuery} from "../features/api/WorkoutApi"
import { useGetWorkoutHistoryDetailQuery, useGetWorkoutBarChartDetailQuery } from "../features/api/WorkoutApi";
import { useLocation, useSearchParams } from "react-router-dom";
// import {
import HeadingContainer from "../components/HeadingContainer"
// import SimpleBarChart from "../components/SimpleBarCharts";
import ExerciseSetComparisonChart from "../components/SimpleBarCharts";
import { toast } from "react-toastify";
function InputComponent({ Val, isDisabled }) {
  return <input
    value={Val}
    style={{
      width: "75%",
      height: "36px",
      backgroundColor: "#fff",
      color: "#111",
      border: "1px solid #d1d5db",
      borderRadius: "8px",
      padding: "0 10px",
      fontSize: "14px",
      textAlign: "center",
      outline: "none",
      transition: "all 0.2s ease",
      boxShadow: "inset 0 1px 2px rgba(0,0,0,0.08)"
    }}
    onFocus={(e) => {
      e.target.style.border = "1px solid #2563eb";
      e.target.style.boxShadow =
        "0 0 0 3px rgba(37, 99, 235, 0.15)";
    }}
    onBlur={(e) => {
      e.target.style.border = "1px solid #d1d5db";
      e.target.style.boxShadow =
        "inset 0 1px 2px rgba(0,0,0,0.08)";
    }}
    disabled={isDisabled}
  />
}
function ExerciseHistoryTable({ exercises }) {
  const [openIndex, setOpenIndex] = useState(null);
  console.log('datadata', exercises)

  const toggleDropdown = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="ExerciseHistoryTable">
      <table>
        <thead>
          <tr>
            <th>Exercise Name</th>
            <th>Total Sets</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {exercises && exercises.length > 0 ? (
            exercises.map((ex, index) => (

              <React.Fragment key={index}>
                <tr>


                  <td>{ex.name}</td>
                  <td>{ex.sets.length}</td>
                  <td>
                    <button
                      className="dropdown-btn"
                      onClick={() => toggleDropdown(index)}
                    >
                      {openIndex === index ? "▲" : "▼"}
                    </button>
                  </td>

                </tr>

                {openIndex === index && (
                  <tr>
                    <td colSpan="3">
                      <table className="inner-table">
                        <thead>
                          <tr>
                            <th>
                              <div className="set-heading">
  <span>Set</span>
  <button onClick={()=>{return toast.warning("Please enable edit mode !")}} className="add-set-btn">+</button>
</div>

                              
                               </th>
                            <th>Reps</th>
                            <th>Weight (kg)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ex.sets.map((set, i) => (
                            <tr key={i}>
                              <td>Set {i + 1}</td>
                              <td><InputComponent Val={set.reps} isDisabled={false}></InputComponent></td>
                              <td><InputComponent Val={set.weight} isDisabled={false}></InputComponent></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>

            ))
          ) : (
            <tr>
              <td colSpan="3" className="no-data">
                No exercise data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
}

export default function DetailWorkoutHistory() {
  // let id=req
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const pullupSets = [
    { set: 1, lastReps: 8, lastWeight: 10, currentReps: 10, currentWeight: 0 },
    { set: 2, lastReps: 6, lastWeight: 9, currentReps: 8, currentWeight: 40 },
    { set: 3, lastReps: 5, lastWeight: 5, currentReps: 6, currentWeight: 10 },
    { set: 4, lastReps: 5, lastWeight: 5, currentReps: 6, currentWeight: 10 },
    { set: 5, lastReps: 5, lastWeight: 5, currentReps: 6, currentWeight: 10 },

  ];
  let { data } = useGetWorkoutHistoryDetailQuery({ id: id })
  let { data: BarChartData } = useGetWorkoutBarChartDetailQuery({ id: id })
  const [GetGraphData, setGetGraphData] = useState("Select Exercise")
  const [SetData, setSetData] = useState([])
  // console.log('BarChartData', BarChartData?.result)
  useEffect(() => {
    console.log('GetGraphDataBarChartData', BarChartData?.result)
    if (BarChartData?.result) {
      for (let i = 0; i < BarChartData?.result.length; i++) {
        console.log('BarChartData?.result[i].name==GetGraphData', BarChartData?.result[i].name == GetGraphData)

        if (BarChartData?.result[i].name == GetGraphData) {

          setSetData([...BarChartData?.result[i].Data])
          // break
        }
      }
    }
  }, [GetGraphData])
  let [Arr, setArr] = useState([])
  useEffect(() => {
    console.log('SetData=', SetData)
  }, [SetData])

  useEffect(() => {
    let arr = []
    if (BarChartData && BarChartData?.result) {
      setGetGraphData((BarChartData?.result[0].name))

    }

    for (let i = 0; i < BarChartData?.result?.length; i++) {

      arr.push(BarChartData?.result[i]?.name)
    }
    setArr([...arr])

  }, [BarChartData])




  return <div className="DetailWorkoutHistoryContainer">
    <HeadingContainer Title={'History'}></HeadingContainer>
    <div className="ExerciseHistory">
      {/* <div className="ExerciseHistoryTable"></div> */}
      <ExerciseHistoryTable exercises={data?.Result[0]?.exercises}></ExerciseHistoryTable>
      <div style={{ width: '100%', height: '10%', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: "0.3rem" }}>

        <button className="edit-btn">
          Save Changes
        </button>

      </div>
      <div style={{ width: '100%', height: '40%', display: 'flex', justifyContent: 'center' }}>


        <ExerciseSetComparisonChart GetGraphData={GetGraphData} setGetGraphData={setGetGraphData} sets={SetData} options={Arr} />



      </div>


    </div>
  </div>
}