import "../styles/LogTodaysWeightPopup.css";
import { useEffect, useState } from "react";
// import { useGetUserWeightChartQuery,useAddUserWeightMutation
import { useGetUserWeightChartQuery, useAddUserWeightMutation } from "../features/api/WeightTrackingApi";
import { toast } from "react-toastify";
function getFormattedToday() {
    // const utcNow = new Date().toISOString();
    const utcDate = new Date();
    console.log('utcDate', utcDate)
    const istDate = new Date(utcDate.getTime() + (5.5 * 60 * 60 * 1000));
    console.log('isodate', istDate.toISOString()?.split('T')[0]);

    return istDate.toISOString()?.split('T')[0]
}
export default function LogTodaysWeightPopup({ setIsLogWeightPopupopen }) {
    const { data, isLoading, isError: ErrorGettingWeight,  } = useGetUserWeightChartQuery({ TodaysDate: getFormattedToday() })
    const [AddUserBodyWeight, { data: AddedWeight, isSuccess, isError,error }] = useAddUserWeightMutation()
    const [Input, SetInput] = useState(0)
    useEffect(() => {
        if (isSuccess) {
            toast.success("Weight Logged successfully !")
        }
    }, [isSuccess])
    useEffect(() => {
        console.log('isError',isError)
        if (isError) {
            toast.error("Weight have been logged !")
        }
    }, [isError])

    async function AddWeight(num) {
  if (!num || num <= 0) {
    toast.error("Weight can’t be 0!");
    return;
  }

  try {
    await AddUserBodyWeight({
      weight: num,
      TodaysDate: getFormattedToday(),
    }).unwrap();

    toast.success("Weight logged successfully!");
    setIsLogWeightPopupopen(false);
  } catch (err) {
    const message =
      err?.data?.message || "Weight has already been logged!";
    toast.error(message);
  }
}

    return (
        <div className="modalOverlay">
            <div className="modalContent">
                <h3 className="modalTitle">Log Today’s Weight</h3>

                {/* Input */}
                <div className="weightInputWrapper">
                    <input
                        type="number"
                        placeholder="Enter weight"
                        className="weightInput"
                        value={Input}
                        onChange={(e) => { SetInput(e.target.value) }}
                    />
                    <span className="unit">kg</span>
                </div>

                {/* Actions */}
                <div className="modalActions">
                    <button
                        className="cancelBtn"
                        onClick={() => setIsLogWeightPopupopen(false)}
                    >
                        Cancel
                    </button>
                    <button
                        className="confirmBtn"
                        onClick={async () => {
                            await AddWeight(Input)
                            setIsLogWeightPopupopen(false);
                            console.log("weight logged");
                        }}
                    >
                        Log Weight
                    </button>
                </div>
            </div>
        </div>
    );
}
