import "../styles/ProfileContainer.css"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import Button from "../components/Button.jsx"
import LogTodaysWeightPopup from "../components/LogTodaysWeightPopup.jsx";
import { toast } from "react-toastify";
import { useGetReferalCodeQuery, useGenerateCouponCodeMutation } from "../features/api/UserApi.js";
import ProfileSetting from "./ProfileSetting.jsx";
import ConfirmModal from "../components/ConfirmModel.jsx";
import Invitefriend from "../../public/utils/InviteFriend.js";
function ProfileOption({ Title, OnClick }) {
    return <div onClick={() => { OnClick() }} className="ProfileSettingOptions">
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
    const [IsLogWeightPopupopen, setIsLogWeightPopupopen] = useState(false)
    const [Confirm, setConfirm] = useState(false);
    const { data: Couponcode,refetch } = useGetReferalCodeQuery();
    const [GenerateCode, { data: CouponCode, isLoading, isSuccess, success, isError, error }] = useGenerateCouponCodeMutation();
    useEffect(() => {
        let token = localStorage.getItem('token')
        if (!token) {
            navigate("/login")
        }
    }, [])
    async function GenerateUserCode() {
        await GenerateCode({})

    }
    useEffect(() => {
        console.log("Couponcode", Couponcode?.code[0]?.YourCode)
        if (!Couponcode?.code[0]?.YourCode) {
            GenerateUserCode();
        }


    }, [Couponcode])

    return <div className="ProfileContainer">
        {IsLogWeightPopupopen && <LogTodaysWeightPopup setIsLogWeightPopupopen={setIsLogWeightPopupopen}></LogTodaysWeightPopup>}
        <div className="ProfileHeader">
            <div className="SignOutBtnContainer">

                <img onClick={() => { navigate(-1) }} style={{ width: '1.5rem', height: '1.5rem', marginLeft: '0.5rem', marginTop: '0.2rem' }} src="Images/left-arrow.png"></img>

                <div style={{ display: 'flex' }}>

                    <button
                        onClick={() => { setIsLogWeightPopupopen(true) }}
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
                        Log Weight
                    </button>
                    <button
                        onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('username'); localStorage.removeItem('UserId'); toast.success("User Logged Out"); navigate("/login") }}
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
                <ProfileOption OnClick={() => navigate("/WorkoutHistory")} Title={'Workout History'}></ProfileOption>
                <ProfileOption OnClick={() => navigate("/WeightHistory")} Title={'Weight History'}></ProfileOption>
                <ProfileOption OnClick={() => navigate("/WeightHistory")} Title={'Payment-Methods'}></ProfileOption>


                <ProfileOption OnClick={() => { navigate("/AddProgressPhoto") }} Title={'Progress Photo'}></ProfileOption>
                <ProfileOption OnClick={() => { navigate("/ProfileSetting") }} Title={'Profile Setting'}></ProfileOption>
                <ProfileOption Title={'Account Settings'}></ProfileOption>
                <ProfileOption Title={'Manage My Subscription'}></ProfileOption>
                <ProfileOption OnClick={() => { navigate("/ChangePassword") }} Title={'Change Password'}></ProfileOption>
                <ProfileOption Title={'Change Program'}></ProfileOption>
                <ProfileOption Title={'Privacy Policy'}></ProfileOption>
                <ProfileOption OnClick={() => { navigate("/TermsAndCondition") }} Title={'Terms And Condition'}></ProfileOption>
                <ProfileOption Title={'FeedBack'}></ProfileOption>
                <ProfileOption OnClick={() => {
                    setConfirm(true)
                    refetch();
                    // alert("This will redirect to whatsapp!")





                }} Title={'Invite a Friend'}></ProfileOption>
                <ProfileOption OnClick={()=>{navigate("/ContactUs")}} Title={'Contact Us'}></ProfileOption>


            </div>
            {Confirm && <ConfirmModal isOpen={Confirm} onConfirm={() => {
                if(!Couponcode?.code[0]?.YourCode)[
                   GenerateUserCode()
                ]
                Invitefriend(`Hey! Join this app to track workouts, monitor progress, and get stronger 💪 Use Code ${Couponcode?.code[0]?.YourCode} to get FitLink`)

                setConfirm(false)
            }} onCancel={() => { setConfirm(false) }}></ConfirmModal>}

        </div>


    </div>
}