import { useEffect, useState } from "react"
import "../styles/Login.css"
import Input from '../components/Input'
import Button from "../components/Button"
import { NavLink } from "react-router-dom"
import { useAddUserLoginMutation } from "../features/api/AuthApi"
import { useNavigate } from "react-router-dom"
export default function Login(){

const navigate=useNavigate();

    const [Login,setLogin]=useState({
        username:"",
        password:""

    })

    const [LoginUser,{data,isloading,isSuccess}]=useAddUserLoginMutation();
    // use

    useEffect(()=>{
console.log("Login",isSuccess)
if(isSuccess){
console.log('data',data)

localStorage.setItem("token", data?.token);
localStorage.setItem("username", data?.username);
navigate("/")





}
    },[isSuccess])
    return <div className="LoginContainer">
        <div className="LoginInputForm">
            <h3 className="FitLinkLoginHeading">FitLink Login</h3>
            <Input label={'Enter Username'}
    placeholder={'Enter Username'} labelcolor={'white'} value={Login.username}
    onChange={(event)=>{setLogin((prev)=>{return {...prev, username: event.target.value}})}}></Input>

<Input label={'Enter Password'}
    placeholder={'Enter Password'} labelcolor={'white'} value={Login.password} onChange={(event)=>{setLogin((prev)=>{return {...prev, password: event.target.value}})}}></Input>

    <span className="SignupinLogin">dont have a account ? <NavLink style={{marginLeft:'0.1rem',fontSize:"0.4"}} to={"/signup"}>SignUp</NavLink> </span>

    <Button label={'Login'} onClick={()=>{LoginUser(Login);console.log(Login)}}></Button>



        </div>

    </div>
}