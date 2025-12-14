import { useState } from "react";
import "../styles/Addimage.css";

export default function Addimage({ setIsAddImageOpen,setSelectedFile,preview, setPreview,UploadNewImage }) {
  

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setSelectedFile(file)
        const imageURL = URL.createObjectURL(file);
        setPreview(imageURL);
    };

    return (
        <div className="modalOverlay">
            <div className="modalContent">
                <h3 className="modalTitle">Select Image</h3>

                {/* Image preview box */}
                <div className="imagePreview">
                    {preview ? (
                        <img src={preview} alt="Selected" />
                    ) : (
                        <span>Click to select image</span>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </div>

                {/* Action buttons */}
                <div className="modalActions">
                    <button onClick={()=>{setIsAddImageOpen(false),setSelectedFile(null),setPreview(null);}} className="cancelBtn">Cancel</button>
                    <button onClick={async()=>{await UploadNewImage()}} className="confirmBtn">Save</button>
                </div>
            </div>
        </div>
    );
}
