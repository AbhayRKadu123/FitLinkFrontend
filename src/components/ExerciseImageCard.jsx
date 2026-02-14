import React from "react";
import "../styles/ExerciseImageCard.css"

const ExerciseImageCard = ({OnClick, name, gifUrl }) => {
  return (
    <div className="exercise-card-horizontal">
      <img onClick={()=>{OnClick()}} src={gifUrl} alt={name} className="exercise-gif" />
      <div className="exercise-content">
        <h3 className="exercise-name">{name}</h3>
      </div>
    </div>
  );
};

export default ExerciseImageCard;
