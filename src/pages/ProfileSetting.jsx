import "../styles/ProfileSetting.css"
import HeadingContainer from "../components/HeadingContainer"
import Addimage from "../components/Addimage"
import { useEffect, useState } from "react"
import Input from "../components/Input"
import Button from "../components/Button"
import Dropdown from "../components/Dropdown"
import CommonDropDown from "../components/CommonDropDown"
import { useUploadImageMutation, useUpdateProfileSettingMutation,useGetProfileSettingUsersDataQuery } from "../features/api/UserApi"
import { toast } from "react-toastify"
export default function ProfileSetting() {
  const [ShowAddimage, setShowAddimage] = useState(false)
  const [selectedfile, setselectedfile] = useState(null)
  const [Preview, setPreview] = useState(null);
  const [UserData, setUserData] = useState({
    ProfileUrl: "",
    fullName: "",
    age: 0,
    weight: 0,
    height: 0,
    Bmi: 0,
    Bio: "",
    Goal: "",
    gender: "",
    username:""
  })

  let [UploadImage, { data: UploadedImage, isLoading: UploadingImage, error: errorUploading, success: UploadSuccessfull }] = useUploadImageMutation();
  let [HandleEditSetting, { data: EditProfile,isLoading,isSuccess,success}] = useUpdateProfileSettingMutation();
  let {data,refetch}=useGetProfileSettingUsersDataQuery({});
  useEffect(()=>{
console.log("data",data?.message)
if(!data?.message)return;
let {
 
  UserProfileUrl,
  Weight,
  age,
  goal,
  height,
  Bmi,
  Bio,
  Gender,
  fullname,
  username
  

}=data?.message;
setUserData((prev)=>{
  return {...prev,
     ProfileUrl:UserProfileUrl||"",
    fullName:fullname|| "",
    age:age|| 0,
    weight: Weight||0,
    height:height|| 0,
    Bmi:Bmi||0,
    Bio:Bio|| "",
    Goal:goal|| "",
    gender:Gender|| "",
    username:username||""



  }
})
refetch()
  },[data])
  useEffect(()=>{
if(isSuccess){
  console.log("success",EditProfile)
  toast.success(EditProfile?.message||"Updated!")
}
  },[isSuccess])
  async function UploadNewImage() {
    try {
      if (UploadingImage) return;

      const formData = new FormData();
      formData.append("file", selectedfile);
      // let UserData={};

      let result = await UploadImage({ formData })

      // setImageUrl(result?.data?.UploadImage)
      if (result?.data?.UploadImage) {
        setUserData((prev) => {
          return {
            ...prev, ProfileUrl: result?.data?.UploadImage
          }

        })
      }
      setShowAddimage(false)
      setselectedfile(null)
      setPreview(null)



      await HandleEditSetting(UserData)

      console.log("image url=", result?.data?.UploadImage)

      setShowAddimage(false)
      setselectedfile(null)
      //   let Result = await AddUserProgressPhoto({ ImageUrl: result?.data?.UploadImage })


    } catch (err) {
      console.log('uploadimg err', err)

    }

  }
  useEffect(() => {
    if (UserData.weight && UserData.height) {
      const bmi =
        (UserData.weight * 10000) /
        (UserData.height * UserData.height);

      setUserData(prev => ({
        ...prev,
        Bmi: Number(bmi.toFixed(2))
      }));
    }
  }, [UserData.weight, UserData.height]);

  return <div className="ProfileSettingContainer">
    <HeadingContainer Title={"Profile Setting"}></HeadingContainer>
    <div className="ProfileSettingInnerContainer">
      <div className="ProfilePhotoContainer">
        <div className="ProfileImage">
          <img src={UserData?.ProfileUrl || 'Images/ProfilePlaceholder.png'}></img>
        </div>
        <span className="ProfileImageEditBtn"><img onClick={() => { setShowAddimage(true) }} style={{ width: '1.3rem', height: "1.3rem" }} src="Images/user-avatar.png"></img></span>




      </div>
      <div className="ProfileUsername"></div>
      {ShowAddimage && <Addimage setIsAddImageOpen={setShowAddimage} setSelectedFile={setselectedfile} preview={Preview} setPreview={setPreview} UploadNewImage={() => { UploadNewImage() }}  ></Addimage>}
      <div className="UserNumbersData">
        <div className="UserNumbersDataInnerContainer">
          <Input label={"Username"} placeholder={"Username"} value={UserData?.username} disabled={true}></Input>

          <Input label={"FullName"} placeholder={"FullName"} value={UserData?.fullName} onChange={(event) => {
            setUserData((prev) => {
              return { ...prev, fullName: event.target.value }
            })
          }}></Input>
          <Input label={"Bio"} placeholder={"Enter Your Bio"} value={UserData?.Bio} onChange={(event) => {
            setUserData((prev) => {
              return { ...prev, Bio: event.target.value }
            })
          }}></Input>





          <Input label={"Enter Your age"} placeholder={"Enter Age"} type="Number" value={UserData?.age} onChange={(event) => {
            if (Number(event.target.value) < 0) {
              return toast.warning('age can`t be negative!')
            } else {
              setUserData((prev) => {


                return { ...prev, age: Number(event.target.value) }
              })
            }

          }}></Input>
          <Input label={"Enter Your height"} placeholder={"Enter Height"} type="Number" value={UserData?.height} onChange={(event) => {
           if (Number(event.target.value) < 0) {
              return toast.warning('height can`t be negative!')
            } else {
              setUserData((prev) => {

                return { ...prev, height: Number(event.target.value) }
              })
            }
          }}></Input>
          <Input label={"Enter Your weight"} placeholder={"Enter Weight"} type="Number" value={UserData?.weight} onChange={(event) => {
           if (Number(event.target.value) < 0) {
              return toast.warning('weight can`t be negative!')
            } else {
              setUserData((prev) => {

                return { ...prev, weight: Number(event.target.value) }
              })
            }

          }}></Input>
          <CommonDropDown label={"Gender"} value={UserData?.gender} options={[
            { label: "Male", value: "Male" },
            { label: "Female", value: "Female" },
            { label: "Others", value: "Others" },
          ]} onChange={(event) => {
            setUserData((prev) => {
              return { ...prev, gender: event.target.value }
            })
          }}></CommonDropDown>
          {/* <Input label={"Enter Your Weight"} placeholder={"Enter Weight"}></Input> */}
          <Input label={"Your BMI"} placeholder={"Bmi"} disabled={true} value={UserData?.Bmi}></Input>
          <Input label={"Your Condition"} placeholder={"Body Condition"} disabled={true} value={UserData?.Bmi &&
            UserData?.Bmi < 18.5 ? "UnderWeight" : UserData?.Bmi >= 18.6 && UserData?.Bmi <= 24.5 ? "Normal (Healthy)" :
            UserData?.Bmi >= 25 && UserData?.Bmi <= 29.9 ? "Overweight" :
              UserData?.Bmi >= 30 && UserData?.Bmi <= 34.9 ? "Obese Class 1" :
                UserData?.Bmi >= 35.0 && UserData?.Bmi <= 39.9 ? "Obese Class 2" :
                  "Obese Class3"



          }></Input>
          {/* BMI Range	Category
Below 18.5	Underweight
18.5 – 24.9	Normal (Healthy)
25.0 – 29.9	Overweight
30.0 – 34.9	Obese Class I
35.0 – 39.9	Obese Class II
40.0 and above	Obese Class III (Severe obesity) */}


          <CommonDropDown label={"Select Your Goal"} value={UserData?.Goal} onChange={(event) => {
            setUserData((prev) => {
              return { ...prev, Goal: event.target.value }
            })
          }} options={[
            { label: "Weight Gain", value: "weightgain" },
            { label: "Weight Loss", value: "weightloss" },
            { label: "Body Recomposition", value: "bodyrecomposition" },
          ]}></CommonDropDown>
          <Input label={"Membership type"} placeholder={"Membership"} value={"Premium"} disabled={true}></Input>


          {/* <Dropdown></Dropdown> */}
          <Button onClick={async() => {
            console.log("Handle save", UserData)
            if(isLoading || UploadingImage) return null;
            await HandleEditSetting(UserData)
          }} disabled={UploadingImage||isLoading} label={isLoading?"Updating":"Update"}></Button>






        </div>

      </div>
    </div>

  </div>
}