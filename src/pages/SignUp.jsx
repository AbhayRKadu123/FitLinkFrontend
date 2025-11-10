import "../styles/SignUp.css"
import Input from "../components/Input"
import Button from "../components/Button"
import { NavLink } from "react-router-dom"
import { useState } from "react"
import { useAddUserSignUpMutation } from "../features/api/AuthApi"
export default function SignUp() {
    const [signup, setsignup] = useState({ username: "", email: "", password: "",confirmpassword:"" })
        const [SignUpUser,{data,isloading,isSuccess}]=useAddUserSignUpMutation();
    
    return <div className="SignUpContainer">
        <div className="SignUpForm">
            <h3 className="SignUpFormHeading">FitLink Signup</h3>
            <Input label={'Enter Username'}
                placeholder={'Enter Username'} labelcolor={'white'} value={signup.username} type="text" onChange={(event) => { setsignup((prev) => { return { ...prev, username: event.target.value } }) }}></Input>
            <Input label={'Enter email'}
                placeholder={'Enter email'} labelcolor={'white'} value={signup.email} type="email" onChange={(event) => { setsignup((prev) => { return { ...prev, email: event.target.value } }) }}></Input>
            <Input label={'Enter password'}
                placeholder={'Enter password'} labelcolor={'white'} value={signup.password} type="password" onChange={(event) => { setsignup((prev) => { return { ...prev, password: event.target.value } }) }}></Input>

            <Input label={'Confirm password'}
                placeholder={'Confirm password'} labelcolor={'white'} value={signup.confirmpassword} type="password" onChange={(event) => { setsignup((prev) => { return { ...prev, confirmpassword: event.target.value } }) }}></Input>
            <span className="SignupinLogin">already have account ? <NavLink style={{ marginLeft: '0.1rem', fontSize: "0.4" }} to={"/login"}>Login</NavLink> </span>

            <Button onClick={async() => {
                await SignUpUser(signup)
                console.log(signup)
            }} label={'SignUp'}></Button>

        </div>
    </div>
}