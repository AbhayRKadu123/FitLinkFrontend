import "../styles/AllNotification.css"
import CommonHeader from "../components/CommonHeader"
import { useGetUserNotificationQuery } from "../features/api/UserApi";
import LoadingSpinner from "../components/LoadingSpinner";
import { useEffect } from "react";

function AllNotifications({ message, date }) {
  return (
    <div className="AllNotifications">
      <div className="NotiMessage">{message}</div>
      <div className="NotiDate">{date}</div>
    </div>
  );
}

export default function AllNotification(){
    let {data,isLoading,isError}=useGetUserNotificationQuery({})
    useEffect(()=>{
console.log('data from notification',data)
    },[data])
    return <div className="NotificationContainer">
        <CommonHeader Title={'Notification'} ></CommonHeader>
        <div className="AllNotificationInnerContainer">
            {
isLoading?<LoadingSpinner></LoadingSpinner>:<>
{
    data&& data?.msg?.map((ele)=>{
        return<AllNotifications 
  message={ele?.message} 
  date={ele?.createdAt?.split('T')[0]}
/>
    })
}</>


            }





        </div>

    </div>
}