import React from "react";
import "../styles/List.css";

export default function List({ title, items = [], onItemClick, icon }) {
    return (
        <div className="ListContainer">
            {title && <h3 className="ListTitle">{title}</h3>}

            {items.length === 0 ? (
                <p className="EmptyListText">No items yet.</p>
            ) : (
                <ul className="ListItems">
                    {items.map((item, index) => (
                        <li
                            key={index}
                            className="ListItem"
                            onClick={() => onItemClick && onItemClick(item)}
                        >
                            {icon && <span className="ListIcon">{icon}</span>}
                            <div className="ListText">{item}</div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
