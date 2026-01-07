import "../styles/AddProgressPhoto.css"
import HeadingContainer from "../components/HeadingContainer"
import { useEffect, useState } from "react"
import Addimage from "../components/Addimage";
import { useUploadImageMutation } from "../features/api/UserApi";
import { toast } from "react-toastify";
import { useAddProgressPhotoMutation, useGetAllProgressPhotoQuery } from "../features/api/WorkoutApi";
function GetImagePreview({ Url, setPreviewImageUrl, setGetImagePreview }) {
  return <div className="modalOverlay">
    <div className="modalContent">
      <div className="imagePreview">

        <img src={Url} alt="Selected" />

      </div>
      <div className="modalActions">
        <button onClick={() => { setGetImagePreview(false); setPreviewImageUrl(false) }} className="cancelBtn">Cancel</button>

      </div>


    </div></div>

}
function CompareImages({ UrlArray, setcompareImage }) {
  return <div className="modalOverlay">
    <div className="modalContent">
      <div className="imagePreview">

        <div className="compare-parent">
          <div className="compare-image">
            <img style={{objectFit:'cover'}} src={UrlArray[0]} />
            <span className="label">Before</span>
          </div>
          <div style={{objectFit:'cover'}} className="compare-image">
            <img src={UrlArray[1]} />
            <span className="label">After</span>
          </div>
        </div>

      </div>
      <div className="modalActions">
        <button onClick={() => { setcompareImage(false);  }} className="cancelBtn">Cancel</button>

      </div>


    </div></div>

}
export default function AddProgressPhoto() {
  const [SelectedNav, setSelectedNav] = useState("TimeLine");
  const [addImage, setaddImage] = useState(false)
  const [selectedfile, setselectedfile] = useState(null);
  const [Preview, setPreview] = useState(null);
  const [PreviewImageUrl, setPreviewImageUrl] = useState(null)
  const [getImagePreview, setGetImagePreview] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [compareImage, setcompareImage] = useState(false)
  let [UploadImage, { data: UploadedImage, isLoading: UploadingImage, error: errorUploading, success: UploadSuccessfull }] = useUploadImageMutation();
  let [AddUserProgressPhoto, { data: AddProgressPhotoData, isLoading: AddingProgressPhoto, error: Error, success: Success, isSuccess }] = useAddProgressPhotoMutation();
  let { data: GetAllProgressPhoto,refetch, isLoading, isError } = useGetAllProgressPhotoQuery({});
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
      refetch()
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

  useEffect(() => {
    console.log("SelectedImages", selectedImages)

  }, [selectedImages])
  function ToggleImage(ImageUrl) {

    setSelectedImages((prev) => {
      if (prev.length >= 2 && !selectedImages.includes(ImageUrl)) {
        toast.warning("You can select at most two images")
        return prev

      }


      if (prev.includes(ImageUrl)) {
        // remove image
        return prev.filter(img => img !== ImageUrl);
      } else {
        // add image
        // if (selectedImages.length == 2) return toast.warning("You can select at most two images")

        return [...prev, ImageUrl];
      }

    });
  }



  return <div className="AddProgressPhotoContainer">
    <HeadingContainer Title={'Add Progress Photo'}></HeadingContainer>
    <div className="AddProgressPhotoInnerContainer">
      <div className="AddProgressPhotoInnerContainerTopMenu">
        <div>
          <span onClick={() => { setSelectedNav("TimeLine") }} className={SelectedNav == "TimeLine" ? "Selected" : ""}><h5>TimeLine</h5></span>
          <span onClick={() => { setSelectedNav("Compare") }} className={SelectedNav == "Compare" ? "Selected" : ""}><h5>Compare</h5></span>
          <span onClick={() => { return toast.warning("This Feature is under development phase"); setSelectedNav("Notes") }} className={SelectedNav == "Notes" ? "Selected" : ""}><h5>Notes</h5></span>

        </div>

        <span onClick={SelectedNav == "Compare" ? () => { if (selectedImages.length < 2) return toast.warning("Please select two image for comparision!"); setcompareImage(true) } : () => { setaddImage(true) }}><h5>{SelectedNav == "Compare" ? "Compare" : "+ Add Photo"}</h5></span>

      </div>
      <div className="ProgressPhotoContainers">
        {GetAllProgressPhoto?.data.map((ele) => {
          return <div className="ProgressPhotoCard">
            <span className="ProgressPhotoCardDate"><h4>{ele?._id}</h4></span>
            <span className="ProgressPhotoCardPhotos">
              {ele?.Photos?.map((ele) => {
                return <span onClick={() => {
                  if (SelectedNav == "Compare") return;
                  setGetImagePreview(true)
                  setPreviewImageUrl(ele?.imageUrl)
                  console.log("image url", ele?.imageUrl)
                }} className="ProgressPhotoCardPhoto">
                  {SelectedNav == "Compare" && <input onChange={() => {

                    ToggleImage(ele?.imageUrl)

                  }} className="SelectImage" checked={selectedImages.includes(ele?.imageUrl)} type="Checkbox"></input>}

                  <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={ele?.imageUrl}></img></span>

              })}


            </span>
          </div>


        })}


      </div>


    </div>
    {getImagePreview && <GetImagePreview Url={PreviewImageUrl} setPreviewImageUrl={setPreviewImageUrl} setGetImagePreview={setGetImagePreview}  ></GetImagePreview>}
    {compareImage && <CompareImages UrlArray={selectedImages}  setcompareImage={setcompareImage}></CompareImages>}
    {addImage && <Addimage UploadingImage={UploadingImage} setIsAddImageOpen={setaddImage} setSelectedFile={setselectedfile} preview={Preview} setPreview={setPreview} UploadNewImage={() => { UploadNewImage() }}></Addimage>}
  </div>
}