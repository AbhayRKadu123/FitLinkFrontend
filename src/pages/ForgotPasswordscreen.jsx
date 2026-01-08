import "../styles/Login.css";
import Button from "../components/Button";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUpdatePasswordMutation } from "../features/api/UserApi";

export default function ForgotPasswordscreen() {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    username: "",
    email: ""
  });

  const handlePasswordReset = () => {
    if (!login.username || !login.email) {
      alert("Please fill all fields");
      return;
    }
    console.log(login);
  };

  return (
    <div className="LoginContainer">
      <div className="LoginInputForm">
        <h3 className="FitLinkLoginHeading">Forgot Password</h3>

        <Input
          label="Enter Your Username"
          placeholder="Enter Username"
          labelcolor="white"
          value={login.username}
          onChange={(e) =>
            setLogin({ ...login, username: e.target.value })
          }
        />

        <Input
          label="Enter Registered EmailId"
          placeholder="Email"
          labelcolor="white"
          value={login.email}
          onChange={(e) =>
            setLogin({ ...login, email: e.target.value })
          }
        />

            <span className="SignupinLogin">Go back to login ? <span style={{ marginLeft: '0.1rem', fontSize: "0.4" }} onClick={()=>{navigate("/login")}}>Login</span> </span>

   

        <Button
          label="Get Password"
          isLoading={false}
          disabled={false}
          onClick={handlePasswordReset}
        />
      </div>
    </div>
  );
}
