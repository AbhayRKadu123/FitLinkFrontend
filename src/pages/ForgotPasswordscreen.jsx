import "../styles/Login.css";
import Button from "../components/Button";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUpdatePasswordMutation } from "../features/api/UserApi";
import { toast } from "react-toastify";
import {useUpdateOldPasswordMutation} from "../../src/features/api/AuthApi"
import OTPInput from "../components/OTPInput";
// import { useNavigate } from "react-router-dom";

export default function ForgotPasswordscreen() {
  const navigate = useNavigate();
  const [UpdateOldPassword, { data, isError, isLoading, isSuccess, success, error }] = useUpdatePasswordMutation();
// useUpdateOldPasswordMutation
  const [UpdateOldPasswords, { data:Data, isError:ISERROR, isLoading:ISLOADING, isSuccess:ISSUCCESS, success:SUCCESS, error:ERROR }] = useUpdateOldPasswordMutation();
// const navigate=useNavigate()
  const [login, setLogin] = useState({
    username: "",
    email: ""
  });
  const [UserDetail, setUserDetail] = useState({
    username: "",
    email: "",
    password: "",
    resetpassword: ""

  })
  useEffect(()=>{
    if(ISSUCCESS){
      toast.success("Password updated sccessfully!")
      navigate("/login")
    }

  },[ISSUCCESS])
  const [showResetpassword, setshowResetpassword] = useState(false)
  const [otpscreen, setotpscreen] = useState(false)
  useEffect(() => {
    if (error && isError) {
      toast.error(error?.data?.message || "Something went wrong!")
    }

  }, [error])

  useEffect(() => {

    console.log('success', success)
    if (isSuccess) {
      setotpscreen(true)
      toast.success(data?.message || "Success!")
    }


  }, [isSuccess])

  const handlePasswordReset = async () => {
    if (!login.username || !login.email) {
      alert("Please fill all fields");
      return;
    }
    await UpdateOldPassword(login);
    console.log(login);
  };

  return (
    <div className="LoginContainer">
      <div className="LoginInputForm">
        <h3 className="FitLinkLoginHeading">{otpscreen && !showResetpassword ? "Enter Otp" : showResetpassword ? "Reset Password" : "Forgot Password"}</h3>

        {!showResetpassword && <>  {!otpscreen && <Input
          label="Enter Your Username"
          placeholder="Enter Username"
          labelcolor="white"
          value={login.username}
          onChange={(e) =>
            setLogin({ ...login, username: e.target.value })
          }
        />}

          {!otpscreen && <Input
            label="Enter Registered EmailId"
            placeholder="Email"
            labelcolor="white"
            value={login.email}
            onChange={(e) =>
              setLogin({ ...login, email: e.target.value })
            }
          />}
        </>}
        {!showResetpassword && otpscreen && <OTPInput length={6} login={login} onChange={(otp) => console.log("OTP:", otp)} showResetpassword={showResetpassword} setshowResetpassword={setshowResetpassword} setotpscreen={setotpscreen} />}


        {!otpscreen && !showResetpassword && <span className="SignupinLogin">Go back to login ? <span style={{ marginLeft: '0.1rem', fontSize: "0.4" }} onClick={() => { navigate("/login") }}>Login</span> </span>}


        {showResetpassword && <Input
          label="Enter Password"
          placeholder="Enter Password"
          labelcolor="white"
          value={UserDetail?.password}
          onChange={(e) => {
            setUserDetail((prev)=>{return{ ...prev,...login, password: e?.target.value }})

          }
            // setLogin({ ...login, username: e.target.value })
          }
        />}
        {showResetpassword && <Input
          label="Confirm Password"
          placeholder="Confirm Password"
          labelcolor="white"
          value={UserDetail?.resetpassword}
          onChange={(e) => {
            setUserDetail((prev)=>{return{ ...prev,...login, resetpassword: e?.target.value }})

          }
            // setLogin({ ...login, username: e.target.value })
          }
        />}
        {!otpscreen && !showResetpassword && <Button
          label="Reset Password"
          isLoading={false}
          disabled={false}
          onClick={handlePasswordReset}
        />}
        {otpscreen && !showResetpassword && <Button
          label="Resend Otp"
          isLoading={false}
          disabled={false}
          onClick={handlePasswordReset}
        />}
        {showResetpassword && <Button
          label="Reset"
          isLoading={false}
          disabled={false}
          onClick={async() => {
              console.log("userdetail=", UserDetail)
            console.log("userdetail=", UserDetail?.resetpassword)
            if (UserDetail?.resetpassword != UserDetail?.password) {
              return toast.error("Password does not match!")
            }
            if(UserDetail?.password=="" || UserDetail?.resetpassword==""){
              return toast.error("Fields are required!")
            }
            await UpdateOldPasswords({...login,...UserDetail});
            // toast.success("Password updated successfully!")
          

          }}
        />}
      </div>
    </div>
  );
}
