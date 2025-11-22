import "../styles/SignUp.css"
import Input from "../components/Input"
import Button from "../components/Button"
import { NavLink } from "react-router-dom"
import { useEffect, useEffectEvent, useState } from "react"
import { useAddUserSignUpMutation } from "../features/api/AuthApi"
import Notification from "../components/ToastNotification"
import { useNavigate } from "react-router-dom"
export default function SignUp() {
    const [signup, setsignup] = useState({ username: "", email: "", password: "", confirmpassword: "" })
    const [SignUpUser, { data, isLoading, isSuccess, error }] = useAddUserSignUpMutation();
    const navigate = useNavigate();
    async function CreateUserAccount() {
        if (signup?.username.trim() == "" || signup?.email.trim() == "" || signup?.password.trim() == "" || signup?.confirmpassword.trim() == "") {
            return null
        }
        await SignUpUser(signup)
        console.log(signup)

    }
    useEffect(() => {
        console.log('err', error)
    }, [error])
    // Notification({type:'success',message:'SignUp Successfull'})
    useEffect(() => { if(isSuccess){setTimeout(()=>{navigate("/login")},1000 )} }, [isSuccess])



    return <div className="SignUpContainer">
        <div className="SignUpForm">
            {error &&
                <Notification type={'error'} message={error?.data?.message || 'Something Went Wrong'}></Notification>

            }
            {isSuccess &&
                <Notification type={'success'} message={'SignUp Successfull'}></Notification>

            }
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

            <Button onClick={CreateUserAccount} label={isLoading ? 'Processing' : 'SignUp'}></Button>

        </div>
    </div>
}