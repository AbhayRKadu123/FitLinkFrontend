import { useSearchParams } from "react-router-dom";
import "../styles/UserDetail.css"
import CommonHeader from "../components/CommonHeader";
import { useGetUserDetailsQuery, useUpdateAddFriendUserMutation } from "../features/api/UserApi";
import socket from "../../public/utils/SocketConnect";
import { useEffect, useState } from "react";
import { useContext } from "react";
import MyContext from "../../public/utils/MyContext";
export default function UserDetails() {
    const [searchParams] = useSearchParams();

    const userid = searchParams.get("ID");
    const CurrUserId = searchParams.get("CurrUserId")
    let { data,refetch, isLoading, error } = useGetUserDetailsQuery({ Id: userid })
    let [AddFriend, { data: AddUserFriend, isError,isSuccess, isLoading: AddingFriend }] = useUpdateAddFriendUserMutation()
    const { HasNotification, setHasNotification } = useContext(MyContext);

    console.log('data?.Detail[0]', data?.Detail)
    // useEffect(()=>{
    //     socket.on("IncommingNotification",(msg)=>{
    //         console.log("IncommingNotification",msg)
    //         setHasNotification(true)
    //     })
    // },[])
    function UnfollowFriend() {
        console.log("UnfollowFriend")
    }
    useEffect(()=>{
refetch()
// socket.emit('Notification', { Id: userid, CurrId: localStorage.getItem('UserId') })
    },[HasNotification])
    async function AddFriendFunction(id) {

        await AddFriend({ Id: id })
        socket.emit('Notification', { Id: id, CurrId: localStorage.getItem('UserId') })
        setHasNotification(true)
        refetch()


    }
    function RemoveFriendRequest() {
        console.log('RemoveFriendRequestRemoveFriendRequest')
    }

    return <div className="UserDetailContainer">
        <CommonHeader ></CommonHeader>
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
                </div>
                <div className="UserProfileLowerSection">
                    <button onClick={() => { data?.Detail[0]?.FriendRequest == true ? RemoveFriendRequest() : (data?.Detail[0]?.exists == true ? UnfollowFriend() : AddFriendFunction(userid)) }} className="AddFriendBtn">{data?.Detail[0]?.FriendRequest ? "Request Sent" : (data?.Detail[0]?.exists ? 'Friends' : 'Add Friend')}</button>

                </div>


            </div>
            <div className="UserProfileUserStats">

            </div>


        </div>


    </div>
}