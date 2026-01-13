import { useEffect, useRef } from "react";
import "../styles/OTPInput.css";
import { useVerifyOtpMutation } from "../features/api/UserApi";
import { toast } from "react-toastify";

export default function OTPInput({ length = 6,login, onComplete,showResetpassword,setshowResetpassword,setotpscreen }) {
  const inputsRef = useRef([]);
  const [Verify,{data,isSuccess,isError,error}]=useVerifyOtpMutation();
  useEffect(()=>{
if(isSuccess){
toast.success(data?.message||"Otp Verified")
setshowResetpassword(true)
setotpscreen((prev)=>{
    return !prev
})
}

  },[isSuccess])
  useEffect(()=>{
    console.log(error)
    console.log(data)
    if(isError){
      resetOtp();
      toast.error(error?.data?.message)

    }

  },[isError])

  const resetOtp = () => {
  inputsRef.current.forEach(input => {
    if (input) input.value = "";
  });
  inputsRef.current[0]?.focus();
};

  const handleChange = async(e, index) => {
    const value = e.target.value.replace(/\D/, "");
    if (!value) return;

    e.target.value = value;

    if (index < length - 1) {
      inputsRef.current[index + 1].focus();
    }

    // ✅ Correct completion check
    const isComplete = inputsRef.current.every(
      (input) => input && input.value !== ""
    );

    if (isComplete) {
      const otp = inputsRef.current.map(input => input.value).join("");
      console.log("OTP Entered:", otp);
      console.log("login",login)
      await Verify(
        {
            otp: otp,
            Username:login?.username,
            Email:login?.email

        }
      )
      onComplete && onComplete(otp);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <div className="otp-container">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputsRef.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength="1"
          className="otp-box"
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </div>
  );
}
