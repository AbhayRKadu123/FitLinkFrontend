import React from "react";
import "../styles/HeartBadge.css";
import { useContext } from "react";
import MyContext from "../../public/utils/MyContext";


export default function HeartBadge({ heartImage, count = 0, onClick }) {
        const { HasNotification, setHasNotification } = useContext(MyContext);

  return (
    <div className="heart-container" onClick={onClick}>
      <img src={heartImage} alt="heart" className="heart-icon" />

      {count > 0 && HasNotification==true&& (
        <div className="badge">
          {/* {count > 99 ? "99+" : count} */}
        </div>
      )}
    </div>
  );
}
