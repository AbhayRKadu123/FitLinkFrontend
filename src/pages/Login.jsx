import { useEffect, useState } from "react"
import "../styles/Login.css"
import Input from '../components/Input'
import Button from "../components/Button"
import { NavLink } from "react-router-dom"
import { useAddUserLoginMutation } from "../features/api/AuthApi"
import { useNavigate } from "react-router-dom"
import Notification from "../components/ToastNotification"
import { useContext } from "react"
import MyContext from "../../public/utils/MyContext"
import { toast } from "react-toastify"
export default function Login() {
    // let [Label,setLabel]=useState('Login')
    const [LoginUser, { data, isLoading,error, isSuccess, isError }] = useAddUserLoginMutation();

    let [Error,setError]=useState(false)
    let [loginsuccess,setloginsuccess]=useState(false)
const {
        ShowNotification,
        setShowNotification,
        NotificatonType,
        setNotificatioinType,
        NotificationMessage,
        setNotificationMessage,
        

    } = useContext(MyContext);
// isSuccess
useEffect(()=>{
    if(isSuccess==true){
// setShowNotification(true)
// setNotificatioinType('success')
// setNotificationMessage('User logged in')
toast.success('User Logged in')
    }

},[isSuccess])

useEffect(()=>{
    if(isError==true){
toast.error("Something went wrong")
    }

},[isError])
    const navigate = useNavigate();

    const [Login, setLogin] = useState({
        username: "",
        password: ""

    })

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
            localStorage.setItem("UserId",data?.id)
            // setTimeout(()=>{
            navigate("/")

            // },100)





        }
    }, [isSuccess])
    useEffect(() => {
        console.log('isloading', isLoading)

    }, [isLoading])
    return <div className="LoginContainer">
        <div className="LoginInputForm">
            {/* {loginsuccess&&<Notification type={'success'} message={'User Logged in'} onClose={()=>{}}></Notification>}
            {Error&&<Notification type={'error'} message={error?.data?.message} onClose={()=>{setError(false)}}></Notification>} */}

            
            <h3 className="FitLinkLoginHeading">FitLink Login</h3>
            <Input label={'Enter Username'}
                placeholder={'Enter Username'} labelcolor={'white'} value={Login.username}
                onChange={(event) => { setLogin((prev) => { return { ...prev, username: event.target.value } }) }}></Input>

            <Input label={'Enter Password'}
                placeholder={'Enter Password'} labelcolor={'white'} value={Login.password} onChange={(event) => { setLogin((prev) => { return { ...prev, password: event.target.value } }) }}></Input>

            <span className="SignupinLogin">dont have a account ? <span style={{ marginLeft: '0.1rem', fontSize: "0.4" }} onClick={()=>{navigate("/signup")}}>SignUp</span> </span>

            <Button isLoading={isLoading} label={isLoading?'Logging in':'Login'} disabled={isLoading} onClick={() => { LoginUser(Login); console.log(Login) }}></Button>



        </div>

    </div>
}