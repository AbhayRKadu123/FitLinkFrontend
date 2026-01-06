import "../styles/AddProgressPhoto.css"
import HeadingContainer from "../components/HeadingContainer"
import { useEffect, useState } from "react"
import Addimage from "../components/Addimage";
import { useUploadImageMutation } from "../features/api/UserApi";
import { toast } from "react-toastify";
import { useAddProgressPhotoMutation, useGetAllProgressPhotoQuery } from "../features/api/WorkoutApi";
function GetImagePreview({Url,setPreviewImageUrl,setGetImagePreview}){
   return <div className="modalOverlay">
            <div className="modalContent">
               <div className="imagePreview">
                   
                        <img src={Url} alt="Selected" />
                   
                </div>
                 <div className="modalActions">
                    <button onClick={() => { setGetImagePreview(false);setPreviewImageUrl(false) }} className="cancelBtn">Cancel</button>
                   
                </div>
              
              
              </div></div>

}
export default function AddProgressPhoto() {
  const [SelectedNav, setSelectedNav] = useState("TimeLine");
  const [addImage, setaddImage] = useState(false)
  const [selectedfile, setselectedfile] = useState(null);
  const [Preview, setPreview] = useState(null);
  const [PreviewImageUrl,setPreviewImageUrl]=useState(null)
  const [getImagePreview,setGetImagePreview]=useState(false);
  let [UploadImage, { data: UploadedImage, isLoading: UploadingImage, error: errorUploading, success: UploadSuccessfull }] = useUploadImageMutation();
  let [AddUserProgressPhoto, { data: AddProgressPhotoData, isLoading: AddingProgressPhoto, error: Error, success: Success, isSuccess }] = useAddProgressPhotoMutation();
  let { data: GetAllProgressPhoto, isLoading, isError } = useGetAllProgressPhotoQuery({});
  async function UploadNewImage() {
    try {
      if (UploadingImage) return;

      const formData = new FormData();
      formData.append("file", selectedfile);

      let result = await UploadImage({ formData })

      // setImageUrl(result?.data?.UploadImage)
      console.log("image url=", result?.data?.UploadImage)

      setaddImage(false)
      setselectedfile(null)
      let Result = await AddUserProgressPhoto({ ImageUrl: result?.data?.UploadImage })


    } catch (err) {
      console.log('uploadimg err', err)

    }

  }

  useEffect(() => {
    if (isSuccess) {
      setselectedfile(null)
      toast.success("Progress Image Uploaded Succesfully!")
    }
  }, [isSuccess])
  useEffect(() => {
    console.log("GetAllProgressPhoto", GetAllProgressPhoto)
  }, [GetAllProgressPhoto])


  useEffect(() => {
    if (Error) {
      console.log("IsPhotoExists", Error)
      toast.error(Error?.data?.message)
    }
  }, [Error]);
  useEffect(() => {
    if (Success) {
      toast.success("Progress Image Uploaded success fully !")

    }
  }, [Success])



  return <div className="AddProgressPhotoContainer">
    <HeadingContainer Title={'Add Progress Photo'}></HeadingContainer>
    <div className="AddProgressPhotoInnerContainer">
      <div className="AddProgressPhotoInnerContainerTopMenu">
        <div>
          <span onClick={() => { setSelectedNav("TimeLine") }} className={SelectedNav == "TimeLine" ? "Selected" : ""}><h5>TimeLine</h5></span>
          <span onClick={() => { return toast.warning("This Feature is under development phase"); setSelectedNav("Compare") }} className={SelectedNav == "Compare" ? "Selected" : ""}><h5>Compare</h5></span>
          <span onClick={() => { return toast.warning("This Feature is under development phase"); setSelectedNav("Notes") }} className={SelectedNav == "Notes" ? "Selected" : ""}><h5>Notes</h5></span>

        </div>

        <span onClick={() => { setaddImage(true) }}><h5>+ Add Photo</h5></span>

      </div>
      <div className="ProgressPhotoContainers">
        {GetAllProgressPhoto?.data.map((ele) => {
          return <div className="ProgressPhotoCard">
            <span className="ProgressPhotoCardDate"><h4>{ele?._id}</h4></span>
            <span className="ProgressPhotoCardPhotos">
              {ele?.Photos?.map((ele) => {
                return <span onClick={() => {
                  setGetImagePreview(true)
                  setPreviewImageUrl(ele?.imageUrl)
                  console.log("image url", ele?.imageUrl)
                }} className="ProgressPhotoCardPhoto"><img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={ele?.imageUrl}></img></span>

              })}


            </span>
          </div>


        })}

      </div>

    </div>
    {getImagePreview&&<GetImagePreview Url={PreviewImageUrl} setPreviewImageUrl ={setPreviewImageUrl}setGetImagePreview={setGetImagePreview}  ></GetImagePreview>}
     
    {addImage && <Addimage UploadingImage={UploadingImage} setIsAddImageOpen={setaddImage} setSelectedFile={setselectedfile} preview={Preview} setPreview={setPreview} UploadNewImage={() => { UploadNewImage() }}></Addimage>}

  </div>
}