import { useEffect, useState } from "react"
import "../styles/Login.css"
import Input from '../components/Input'
import Button from "../components/Button"
import { NavLink } from "react-router-dom"
import { useAddUserLoginMutation } from "../features/api/AuthApi"
import { useNavigate } from "react-router-dom"
import Notification from "../components/ToastNotification"
export default function Login() {
    // let [Label,setLabel]=useState('Login')
    let [Error,setError]=useState(false)



    const navigate = useNavigate();

    const [Login, setLogin] = useState({
        username: "",
        password: ""

    })

    const [LoginUser, { data, isLoading,error, isSuccess, isError }] = useAddUserLoginMutation();
useEffect(()=>{
    if(isError==true){
setError(true)

    }

},[isError])

    useEffect(() => {
        console.log("Login", isSuccess)
        if (isSuccess) {
            console.log('data', data)

            localStorage.setItem("token", data?.token);
            localStorage.setItem("username", data?.username);
            setTimeout(()=>{
            navigate("/")

            },1000)





        }
    }, [isSuccess])
    useEffect(() => {
        console.log('isloading', isLoading)

    }, [isLoading])
    return <div className="LoginContainer">
        <div className="LoginInputForm">
            {isSuccess&&<Notification type={'success'} message={'User Logged in'} onClose={()=>{}}></Notification>}
            {Error&&<Notification type={'error'} message={error?.data?.message} onClose={()=>{setError(false)}}></Notification>}

            
            <h3 className="FitLinkLoginHeading">FitLink Login</h3>
            <Input label={'Enter Username'}
                placeholder={'Enter Username'} labelcolor={'white'} value={Login.username}
                onChange={(event) => { setLogin((prev) => { return { ...prev, username: event.target.value } }) }}></Input>

            <Input label={'Enter Password'}
                placeholder={'Enter Password'} labelcolor={'white'} value={Login.password} onChange={(event) => { setLogin((prev) => { return { ...prev, password: event.target.value } }) }}></Input>

            <span className="SignupinLogin">dont have a account ? <NavLink style={{ marginLeft: '0.1rem', fontSize: "0.4" }} to={"/signup"}>SignUp</NavLink> </span>

            <Button isLoading={isLoading} label={isLoading?'Logging in':'Login'} disabled={isLoading} onClick={() => { LoginUser(Login); console.log(Login) }}></Button>



        </div>

    </div>
}