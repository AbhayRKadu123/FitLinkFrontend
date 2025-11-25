import "../styles/ProfileContainer.css"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react"
import Button from "../components/Button.jsx"

function ProfileOption({Title,OnClick}) {
    return <div onClick={()=>{OnClick()}} className="ProfileSettingOptions">
        <h4>{Title}</h4>
        <img onClick={() => { navigate(-1) }} style={{ width: '1rem', height: '1rem', marginRight: '0.5rem', marginTop: '0.2rem' }} src="Images/right-arrow.png"></img>
    </div>
}
function getGreeting() {
  // Get current time in IST
  const now = new Date();
  const istTime = new Date(now.getTime() + (5.5 * 60 * 60 * 1000)); // convert to IST (UTC +5:30)
  const hours = istTime.getUTCHours();

  // Return greeting based on time
  if (hours < 12) {
    return "Good Morning";
  } else if (hours < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
}

// console.log(getGreeting());

export default function Profile() {
    let navigate = useNavigate();
    useEffect(() => {
        let token = localStorage.getItem('token')
        if (!token) {
            navigate("/login")
        }
    }, [])
    return <div className="ProfileContainer">
        <div className="ProfileHeader">
            <div className="SignOutBtnContainer">

                <img onClick={() => { navigate(-1) }} style={{ width: '1.5rem', height: '1.5rem', marginLeft: '0.5rem', marginTop: '0.2rem' }} src="Images/left-arrow.png"></img>
                <button
                    onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('username'); navigate("/login") }}
                    style={{
                        height: '1.9rem',
                        fontSize: '0.7rem',
                        border: '0.1rem solid black',
                        color: 'black',
                        backgroundColor: 'white',
                        borderRadius: '0.5rem',
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        // borderRadius:'30%'
                    }}
                    className="SignOutBtn"
                >
                    Sign Out
                </button>

            </div>
            <div className="UserProfileName">
                <div className="ProfileWish">
                    <h4>Profile</h4>
                    <p>{getGreeting()} {localStorage.getItem('username')}</p>
                </div>
                <div className="ProfilePhoto">
                    <img src="Images/avatarred.png"></img>
                </div>

                {/* <div className="Profileimagecontainer">1</div> */}

            </div>
            <div className="Posts_follower">
                <div className="Posts">
                    <h3>0</h3>
                    <span>Posts</span>
                </div><div className="Friends"><h3>0</h3>
                    <span>Friends</span></div>
            </div>


        </div>
        <div className="ProfileMainSection">
            <div className="Settingheading"><h4>Setting</h4></div>
            <div className="SettingOptions">
                <ProfileOption OnClick={()=>navigate("/WorkoutHistory")} Title={'Workout History'}></ProfileOption>
                <ProfileOption OnClick={()=>navigate("/WeightHistory")} Title={'Weight History'}></ProfileOption>

                <ProfileOption Title={'Progress Photo'}></ProfileOption>
                <ProfileOption Title={'Profile Setting'}></ProfileOption>
                <ProfileOption Title={'Account Settings'}></ProfileOption>
                <ProfileOption Title={'Manage My Subscription'}></ProfileOption>
                <ProfileOption Title={'Change Password'}></ProfileOption>
                <ProfileOption Title={'Change Program'}></ProfileOption>
                <ProfileOption Title={'Privacy Policy'}></ProfileOption>
                <ProfileOption Title={'Terms of Use'}></ProfileOption>
                <ProfileOption Title={'FeedBack'}></ProfileOption>
                <ProfileOption Title={'Invite a Friend'}></ProfileOption>
                <ProfileOption Title={'Contact Us'}></ProfileOption>


            </div>

        </div>


    </div>
}