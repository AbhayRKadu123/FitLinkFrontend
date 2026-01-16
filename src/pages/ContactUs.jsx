import "../styles/ContactUs.css"
import HeadingContainer from "../components/HeadingContainer"
import TextArea from "../components/TextArea"
import { useEffect, useState } from "react"
import Button from "../components/Button"
import { useSendQueryMutation } from "../features/api/UserApi"
import { toast } from "react-toastify"
export default function ContactUs() {
    const [Query, setQuery] = useState("")
    const [SendUserQuery,{data,isLoading,isSuccess,isError,error,success}]=useSendQueryMutation();
    useEffect(()=>{
        if(isSuccess){
            setQuery("")
            toast.success("Query Submited successfully!")
        }

    },[success,isSuccess])
    return <div className="ContactUsContainer">
        <HeadingContainer Title={"Contact-Us"}></HeadingContainer>
        <div className="ContackUsInnerContainer">
            <div className="ContactUsTextAreaAndBtn">
                <TextArea label={"Enter Your query"} value={Query} onChange={(event) => {
                    setQuery((prev) => {
                        return event.target.value
                    })
                }}></TextArea>

                <Button disabled={isLoading} onClick={async()=>{
                    if(Query.trim()=="")return toast.warning("Add sumething to query section");
                    if(isLoading) return
                    await SendUserQuery({Data:Query})
                }} label={isLoading?"Submiting..":"Submit"}></Button>


            </div>


        </div>
    </div>
}