import "../styles/DetailWorkoutHistory.css"
import React from "react";
import { useState } from "react";
// import {useGetWorkoutHistoryDetailQuery} from "../features/api/WorkoutApi"
import { useGetWorkoutHistoryDetailQuery } from "../features/api/WorkoutApi";
import { useLocation,useSearchParams} from "react-router-dom";
// import {
import HeadingContainer from "../components/HeadingContainer"
import SimpleBarChart from "../components/SimpleBarCharts";
 function ExerciseHistoryTable({ exercises }) {
  const [openIndex, setOpenIndex] = useState(null);
  console.log('datadata',exercises)

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
                            <th>Set</th>
                            <th>Reps</th>
                            <th>Weight (kg)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ex.sets.map((set, i) => (
                            <tr key={i}>
                              <td>Set {i + 1}</td>
                              <td>{set.reps}</td>
                              <td>{set.weight}</td>
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

  let {data}=useGetWorkoutHistoryDetailQuery({id:id})
  console.log('ExerciseHistoryTable',id)



    return <div className="DetailWorkoutHistoryContainer">
        <HeadingContainer Title={'History'}></HeadingContainer>
        <div className="ExerciseHistory">
            {/* <div className="ExerciseHistoryTable"></div> */}
            <ExerciseHistoryTable exercises={data?.Result[0]?.exercises}></ExerciseHistoryTable>
             <div style={{width:'100%',height:'50%',display:'flex',justifyContent:'center'}}>
      <SimpleBarChart></SimpleBarChart>

      </div>


        </div>
    </div>
}