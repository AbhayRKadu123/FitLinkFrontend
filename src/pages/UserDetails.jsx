import { useSearchParams } from "react-router-dom";
import "../styles/UserDetail.css"
import CommonHeader from "../components/CommonHeader";
import {useGetUserDetailLoginQuery, useGetUserDetailsQuery, useUpdateAddFriendUserMutation } from "../features/api/UserApi";
import socket from "../../public/utils/SocketConnect";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import MyContext from "../../public/utils/MyContext";
export default function UserDetails() {
    const [searchParams] = useSearchParams();

    const userid = searchParams.get("ID");
    const CurrUserId = searchParams.get("CurrUserId")
    let { data, refetch, isLoading, error } = useGetUserDetailLoginQuery({ Id: userid })
    let [AddFriend, { data: AddUserFriend, isError, isSuccess, isLoading: AddingFriend }] = useUpdateAddFriendUserMutation()
    const { HasNotification, setHasNotification } = useContext(MyContext);
    let navigate=useNavigate()
    console.log('data?.Detail[0]', data?.Detail[0]?._id)
    // useEffect(()=>{
    //     socket.on("IncommingNotification",(msg)=>{
    //         console.log("IncommingNotification",msg)
    //         setHasNotification(true)
    //     })
    // },[])
    function UnfollowFriend() {
        console.log("UnfollowFriend")
    }
    useEffect(() => {
        refetch()
        // socket.emit('Notification', { Id: userid, CurrId: localStorage.getItem('UserId') })
    }, [HasNotification])

    async function  GoToMessagepage(id) {
        console.log(' GoToMessagepage')
        
    }
    async function AddFriendFunction(id) {

        if (AddingFriend) return

        await AddFriend({ Id: id })
        socket.emit('Notification', { Id: id, CurrId: localStorage.getItem('UserId') })
        setHasNotification(true)
        refetch()


    }
    function RemoveFriendRequest() {
        console.log('RemoveFriendRequestRemoveFriendRequest')
    }

    return <div className="UserDetailContainer">
        <CommonHeader Title={'User Detail'} ></CommonHeader>
        <div className="UserDetailProfile">
            <div className="UserProfile">
                <div className="UserProfileUpperSection">
                    <div className="ProfileImageContainer">
                        <img src="Images/Fitlinklogo.png"></img>

                    </div>
                    <div className="ProfileUserName">
                        <h3>{data?.Detail[0]?.username}</h3>
                        <p>{data?.Detail[0]?.friendsCount} Friends</p>
                    </div>
                    {/* <div><h1 style={ {color:'white'}}>3</h1></div> */}
                </div>
                <div className="UserProfileLowerSection">
                    <button style={{ backgroundColor: AddingFriend && "gray" }} disabled={AddingFriend} onClick={() => { data?.Detail[0]?.FriendRequest == true ? RemoveFriendRequest() : (data?.Detail[0]?.exists == true ? UnfollowFriend() : AddFriendFunction(userid)) }} className="AddFriendBtn">{data?.Detail[0]?.FriendRequest ? "Request Sent" : (data?.Detail[0]?.exists ? 'Friends' : 'Add Friend')}</button>
                    {/* <button style={{ backgroundColor: AddingFriend && "gray" }} disabled={AddingFriend} onClick={() => { data?.Detail[0]?.FriendRequest == true ? RemoveFriendRequest() : (data?.Detail[0]?.exists == true ? ()=>{console.log("message unavailable")} : GoToMessagepage(userid)) }} className="MessageBtn">{data?.Detail[0]?.FriendRequest ? "Request Sent" : (data?.Detail[0]?.exists ? 'Message' : 'Not Available')}</button> */}
                    <button style={{ backgroundColor: isLoading && "gray" }} onClick={()=>{if (!isLoading){navigate(`/MessagePage?OtherUserId=${data?.Detail[0]?._id}`)};}} disabled={isLoading}  className="MessageBtn">Message</button>
                </div>


            </div>
            <div className="UserProfileUserStats">

            </div>


        </div>


    </div>
}