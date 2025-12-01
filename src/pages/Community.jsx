import "../styles/CommunityContainer.css"
import NavBar from "../components/NavBar"
import { useEffect } from "react"
import Premium from "./Premium"
import { useState } from "react"
import { useGetUserDetailsQuery, useGetUserFeedQuery, useGetAllFriendRequestQuery } from "../features/api/UserApi"
import { useNavigate } from "react-router-dom"
import CommonHeader from "../components/CommonHeader"
import socket from "../../public/utils/SocketConnect"
import { useContext } from "react"
import MyContext from "../../public/utils/MyContext"


function NewPost() {
  return <span
    style={{
      fontSize: '0.5rem',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.35rem'
    }}
  >
    <span
      aria-hidden="true"
      style={{
        width: '0.45rem',
        height: '0.45rem',
        borderRadius: '50%',
        display: 'inline-block',
        background: 'radial-gradient(circle at 30% 30%, #ff9fa0, #ff3b3b)',
        boxShadow: '0 0 6px 2px rgba(255,59,59,0.55), 0 0 14px 6px rgba(255,59,59,0.18)'
      }}
    />
    New Post
  </span>

}

function PostCard({ username, src = 'Images/Fitlinklogo.png', Id, CardClicked }) {
  return <div className="CommunityContainerPostCard" onClick={() => {
    CardClicked()
  }}>
    <div className="ImageContainer">
      <img className="PostImage" src={src}>

      </img>
    </div>
    <div className="PostTextContainer">
      <h3>{username}</h3>
      <h3 className="PostTitle">Bio</h3>
      <p className="PostDescription">Finished a great strength training session!</p>
      <NewPost></NewPost>
    </div>



  </div>
}
export default function Community() {

  let { data: UserDetails, refetch, isLoading, isError } = useGetUserDetailsQuery({ Id: null });
  let { data: UserFeedDetail, refetch: RefetchUserFeed, isLoading: UserFeedLoading, isError: UserFeedLoadingError } = useGetUserFeedQuery();
  // let {data:GetAllNotification,refetch:RefetchNotification,isLoading}

  // useGetUserFeedQuery
  const [isPremium, setisPremium] = useState(true)
  const [error, seterror] = useState(false)
  const { HasNotification, setHasNotification } = useContext(MyContext);

  let navigate = useNavigate();
  // console.log('value',value)

  useEffect(() => {
    console.log('UserDetails', UserDetails?.Detail[0])
    if (UserDetails?.Detail[0]?.isPremium && UserDetails?.Detail[0]?.isPremium == true) {
      setisPremium(true)
    }
    if (UserDetails?.Detail[0]?.FriendRequest && UserDetails?.Detail[0]?.FriendRequest.length > 0) {
      setHasNotification(true)
    }
  }, [UserDetails])
  useEffect(() => {
    socket.on("IncommingNotification", (msg) => {
      console.log("IncommingNotification", msg)
      setHasNotification(true)
    })
  }, [])
  console.log('UserFeedDetail', UserFeedDetail)
  return <><div className="CommunityContainer">{isPremium ? <div style={{ width: '100%', height: '100%' }}>
    {/* <div className="CommunityContainerHeader">
            <div className="BackBtn"><img onClick={()=>{navigate(-1)}} style={{ width: "2rem", height: '2rem' }} src="Images/backwhite.png"></img></div><div style={{ fontWeight: '600', fontSize: "2rem" }} className="Heading">Community</div><div className="LastSpace"></div>
        </div> */}
    <CommonHeader Title={'Community'} ShowBadge={true}></CommonHeader>
    <div className="CommunityContainerData">
      {
        UserFeedDetail?.Result?.map((ele) => {
          return <PostCard username={ele?.username} Id={ele?._id} CardClicked={() => { navigate(`/UserDetail?ID=${ele?._id}&&CurrUserId=${UserDetails?.Detail[0]?._id}`) }}></PostCard>
        })

      }
      {/* <PostCard username={'abhaykadu'}></PostCard> */}
      {/* D:\workouttrackerfrontend\FitLink\public\Images\Fitlinklogo.png */}





    </div>


  </div> : <Premium></Premium>}</div>
  </>
}