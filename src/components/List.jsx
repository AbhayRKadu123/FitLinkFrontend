import React from "react";
import "../styles/List.css";
import { toast } from "react-toastify";

export default function List({ title, items = [], onItemClick, icon, setshowDetail, exercisedata, setexercisedata, selectedday, formData, setformData,setexercise }) {
    console.log(" selectedday list", selectedday)
   let ItemsArr = [...(items || [])].sort((a, b) => {
  let aMatch = formData[selectedday]?.exercises?.includes(a.name);
  let bMatch = formData[selectedday]?.exercises?.includes(b.name);

  return bMatch - aMatch;
});

                                console.log('Item Arr',ItemsArr)
    return (
        <div className="ListContainer">
            {title && <h3 className="ListTitle">{title}</h3>}

            {items.length === 0 ? (
                <p className="EmptyListText">No items yet.</p>
            ) : (
                <ul className="ListItems">
                    {ItemsArr?.map((item, index) => (
                        <li
                            key={index}
                            className="ListItem"
                            onClick={() => onItemClick && onItemClick(item)}
                        >
                            {/* {icon && <span className="ListIcon">{icon}</span>}
                            <div className="ListText">{item}</div> */}
                            <div onClick={() => { return; setexercisedata(item); setshowDetail(true) }} className="ExerciseListItem">
                                <img
                                    src={item.gifUrl||"Images/failed.png"}
                                    className="ExerciseImage"
                                />

                                <span className="ExerciseName">
                                    <p style={{ color: "black", fontSize: "0.8rem" }}>
                                        {item?.name}
                                    </p>
                                    <span style={{ color: "black" }}>
                                        <img
                                            src={formData[selectedday].exercises.includes(item?.name)?"Images/failed.png":"Images/add-button.png"}
                                            className="AddExerciseBtn"
                                            onClick={formData[selectedday].exercises.includes(item?.name)?()=>{
                                                let UpdtedExerciseArr=formData[selectedday].exercises.filter((ele)=>{
                                                    if(ele!==item?.name){
                                                        return ele;
                                                    }
                                                })
                                                setformData((prev) => ({
                                                    ...prev,
                                                    [selectedday]: {
                                                        ...prev[selectedday],
                                                        exercises: [...UpdtedExerciseArr] // append new exercise safely
                                                    }
                                                }))
                                                console.log("remove exercise",UpdtedExerciseArr)
                                            }:() => {
                                                console.log("item from list", item); console.log("item from list", selectedday);
                                                // return;
                                                setformData((prev) => ({
                                                    ...prev,
                                                    [selectedday]: {
                                                        ...prev[selectedday],
                                                        exercises: [...(prev[selectedday]?.exercises || []),item?.name] // append new exercise safely
                                                    }
                                                })); setexercise("");  return toast.success("exercise added successfully!")
                                            }}
                                        />
                                    </span>


                                </span>


                            </div>

                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
