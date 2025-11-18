import "../styles/CommunityContainer.css"
import NavBar from "../components/NavBar"
import { useEffect } from "react"
import Premium from "./Premium"
import { useState } from "react"
import { useGetUserDetailsQuery,useGetUserFeedQuery} from "../features/api/UserApi"
import { useNavigate } from "react-router-dom"

function PostCard({username}){
    return  <div className="CommunityContainerPostCard">
                <div className="ImageContainer">
                    <img className="PostImage" src="https://static.vecteezy.com/system/resources/previews/026/781/389/large_2x/gym-interior-background-of-dumbbells-on-rack-in-fitness-and-workout-room-photo.jpg">

                    </img>
                </div>
                <div className="PostTextContainer">
                    <h3>{username}</h3>
                    <h3 className="PostTitle">Today's Workout</h3>
                    <p className="PostDescription">Finished a great strength training session!</p>
                </div>



            </div>
}
export default function Community() {
    
    let { data: UserDetails, refetch, isLoading, isError } = useGetUserDetailsQuery();
    let { data: UserFeedDetail, refetch:RefetchUserFeed, isLoading:UserFeedLoading, isError:UserFeedLoadingError } = useGetUserFeedQuery();

    // useGetUserFeedQuery
    const [isPremium, setisPremium] = useState(true)
    const [error, seterror] = useState(false)
    let navigate=useNavigate();
    useEffect(() => {
        console.log('UserDetails', UserDetails?.Detail)
        if (UserDetails?.Detail?.isPremium && UserDetails?.Detail?.isPremium == true) {
            setisPremium(true)
        }
    }, [UserDetails])
    console.log('UserFeedDetail',UserFeedDetail)
    return <><div className="CommunityContainer">{isPremium ? <div style={{ width: '100%', height: '100%' }}>
        <div className="CommunityContainerHeader">
            <div className="BackBtn"><img onClick={()=>{navigate(-1)}} style={{ width: "2rem", height: '2rem' }} src="Images/backwhite.png"></img></div><div style={{ fontWeight: '600', fontSize: "2rem" }} className="Heading">Community</div><div className="LastSpace"></div>
        </div>
        <div className="CommunityContainerData">
            {
UserFeedDetail?.Result?.map((ele)=>{
    return <PostCard username={ele?.username}></PostCard>
})

            }
            <PostCard username={'abhaykadu'}></PostCard>
          

           
            


        </div>


    </div> : <Premium></Premium>}</div>
    </>
}