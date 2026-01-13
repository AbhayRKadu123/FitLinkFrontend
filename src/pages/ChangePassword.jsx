import "../styles/ChangePassword.css"
import HeadingContainer from "../components/HeadingContainer"
import Input from "../components/Input"
import Button from "../components/Button"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useHandleChangePasswordMutation } from "../features/api/UserApi"
export default function ChangePassword() {
    const [HandlePasswordChange,{data,isSuccess,isError,error,success}]=useHandleChangePasswordMutation();
    const [Passworddata, setPassworddata] = useState({
        oldpassword: "",
        newpassword: "",
        confirmnewpassword: ""
    })
    useEffect(()=>{
if(isSuccess){
    toast.success(success?.data?.message||"Password updated successfully!")
}
    },[isSuccess])
    useEffect(()=>{
    
if(isError){
    console.log("data",error)

    toast.error(error?.data?.message||"Something went wrong!")
}
    },[isError])
    function HandleInputChange(event, key) {
        setPassworddata((prev) => {
            prev[key] = event.target.value;

            return {
                ...prev
            }
        })
    }
  async function HandleChangePassword() {
    if (
        !Passworddata.oldpassword.trim() ||
        !Passworddata.newpassword.trim() ||
        !Passworddata.confirmnewpassword.trim()
    ) {
        return toast.error("All fields are required");
    }

    if (Passworddata.newpassword !== Passworddata.confirmnewpassword) {
        return toast.error("Password does not match");
    }

    await HandlePasswordChange(Passworddata);
}



    return <div className="ChangePasswordContainer">
        <HeadingContainer Title={'Change Password'}></HeadingContainer>
        <div className="ChangePasswordInnerContainer">
            <Input type="password" label={'Enter Old Password'}
                placeholder={'Enter Old Password'} labelcolor={'black'} value={Passworddata?.oldpassword}
                onChange={(event) => { HandleInputChange(event, 'oldpassword') }} key={'oldpassword'}></Input>
            <Input type="password" onChange={(event) => { HandleInputChange(event, 'newpassword') }} label={'Enter New Password'}
                placeholder={'Enter New Password'} labelcolor={'black'} value={Passworddata?.newpassword}
            >

            </Input>
            <Input type="password" label={'Confirm New Password'}
                placeholder={'Confirm New Password'} labelcolor={'black'} value={Passworddata?.confirmnewpassword}
                onChange={(event) => { HandleInputChange(event, 'confirmnewpassword') }}></Input>
            <Button label={"Update Password"} onClick={()=>{HandleChangePassword()}}></Button>


        </div>


    </div>
}