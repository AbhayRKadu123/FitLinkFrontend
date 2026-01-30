import { use, useEffect, useState } from "react";
import HeaderTop from "../components/Header";
import HeadingContainer from "../components/HeadingContainer";
import "../styles/PaymentMethod.css"
import Input from "../components/Input"
import Button from "../components/Button"
import { toast } from "react-toastify";
import ConfirmModal from "../components/ConfirmModel";
import { useHandleDeletePaymentMethodMutation, useHandleAddPaymentMethodMutation, useGetPaymentMethodsQuery, useHandleUpdatePaymentMethodMutation } from "../features/api/UserApi";

function PaymentOption({hasPayment, Data, OnDelete, isDeleting, isLoading, Label, paymentDetail, setPaymentDetail, selectedOption, OnSubmit }) {
  return (
    <div className="PaymentOptionCard">
      <h4 style={{ color: "black", textAlign: "center", fontSize: "1.5rem" }}>
        {selectedOption}
      </h4>

      <div className="PaymentOptionDetail">
        <Input
          label={`${selectedOption} No`}
          value={paymentDetail.number}
          type={"number"}

          onChange={(e) =>
            setPaymentDetail((prev) => ({
              ...prev,
              paymentoption: selectedOption,
              number: e.target.value,
            }))
          }
        />

        <Input
          label={`${selectedOption} Id`}
          value={paymentDetail.Id}
          onChange={(e) =>
            setPaymentDetail((prev) => ({
              ...prev,
              paymentoption: selectedOption,

              Id: e.target.value,
            }))
          }
        />

        <Button onClick={OnSubmit} label={`${isLoading ? 'Processing..' : Label}`} />
        {hasPayment ? <Button onClick={OnDelete} label={`${isDeleting ? 'Deleting..' : "Delete"}`} /> : <></>}

      </div>
    </div>
  );
}

function PaymentOptioinPill({ OnClick, title, imageurl, isActive }) {

  return <span onClick={() => { OnClick() }} className={`PaymentOptionpill ${isActive ? "PaymentOptionActive" : ""}`}>
    <img src={imageurl}></img>
    <span>{title}</span>

  </span>
}

export default function PaymentMethod() {
  const [PayMentOption, setPaymentOption] = useState("phonepe")
  const [DeleteConfirmbox, setDeleteConfirmbox] = useState(false)
  const [hasPayment, sethasPayment] = useState(false)

  // const [AddPaymentMethod,{data:AddingPaymentmethod,isLoading,isSuccess,isError,success,error}]=useHandleAddPaymentMethodMutation();
  const [
    AddPaymentMethod,
    {
      data: addingPaymentMethod,
      isLoading,
      isSuccess,
      isError,
      error
    }
  ] = useHandleAddPaymentMethodMutation();
  const [
    UpdatePaymentMethod,
    {
      data: UpdatedPaymentMethod,
      isLoading: Updating,
      isSuccess: UpdateSuccessfull,
      isError: UpdatingError,
      error: UpdateError
    }
  ] = useHandleUpdatePaymentMethodMutation();
  const [
    DeletePaymentMethod,
    {
      data: DeletePaymentMethods,
      isLoading: Deleting,
      isSuccess: DeleteSuccessfull,
      isError: DeletingError,
      error: DeleteError
    }
  ] = useHandleDeletePaymentMethodMutation();
  // useHandleDeletePaymentMethodMutation


  const { data: PaymentMethodDetail, refetch, isLoading: PaymentMethodDetailLoading, success, isSuccess: IsSuccess, isError: IsError } = useGetPaymentMethodsQuery({ PayMentOption })
  // useGetPaymentMethodsQuery

  const [PaymentDetail, setPaymentDetail] = useState({
    paymentoption: PayMentOption,
    Id: "",
    number: ""

  })

  useEffect(() => {
    if (UpdateSuccessfull) {
      toast.success("Paymentinformation updated successfully!")
      refetch();
    }
  }, [UpdateSuccessfull])

  useEffect(() => {
    if (DeleteSuccessfull) {
      setDeleteConfirmbox(false);
      setPaymentDetail({
    paymentoption: PayMentOption,
    Id: "",
    number: ""
  });
      sethasPayment(false)

      toast.success("Paymentmethod deleted successfully!")
      refetch();
    }
  }, [DeleteSuccessfull])


  // "Data": {
  //     "_id": "6970b3e50d7395ee1deb09f7",
  //     "paymentMethod": "phonepe",
  //     "username": "abhaykadu",
  //     "Id": "abhayybl@123",
  //     "number": 9604755228,
  //     "__v": 0
  // }

  useEffect(() => {
    if (IsError) {
      setPaymentDetail((prev) => {
        return { paymentoption: PayMentOption, Id: "", number: "" }
      })
sethasPayment(false);

    }
  }, [IsError])
  useEffect(() => {
    if (IsSuccess && PaymentMethodDetail?.Data) {
      setPaymentDetail((prev) => {
        return { ...prev, Id: PaymentMethodDetail?.Data?.Id, number: PaymentMethodDetail?.Data?.number }
      })
      sethasPayment(true)

    }
    // if (IsError) {
    //   setPaymentDetail((prev) => {
    //     return { ...prev, Id: "", number: "" }
    //   })
    // }

    console.log("PaymentMethodDetail?.Data", PaymentMethodDetail?.Data)

  }, [PaymentMethodDetail, IsSuccess, IsError])

  useEffect(() => {
    if (isSuccess) {
      sethasPayment(true)
      toast.success("Payment method added");
    }

    if (isError) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  }, [isSuccess, isError]);
  useEffect(()=>{
sethasPayment(false);
  },[PaymentOption])



  return <div className="PaymentMethodContainer">
    <HeadingContainer Title={"Add Payment-Details"} ></HeadingContainer>
    <div className="PaymentOptions">
      <PaymentOptioinPill OnClick={() => { setPaymentOption("phonepe") }} imageurl={"Images/PhonePeRounded.png"} title={"PhonePe"} isActive={PayMentOption == "phonepe" ? true : false}></PaymentOptioinPill>
      <PaymentOptioinPill OnClick={() => { setPaymentOption("paytm") }} imageurl={"Images/PaytmLogo.png"} title={"PayTm"} isActive={PayMentOption == "paytm" ? true : false}></PaymentOptioinPill>
      <PaymentOptioinPill OnClick={() => { setPaymentOption("gpay") }} imageurl={"Images/GpayLogo.png"} title={"Gpay"} isActive={PayMentOption == "gpay" ? true : false}></PaymentOptioinPill>
      <PaymentOptioinPill OnClick={() => { setPaymentOption("paypal") }} imageurl={"Images/PayPal.png"} title={"PayPal"} isActive={PayMentOption == "paypal" ? true : false}></PaymentOptioinPill>



    </div>

    <div className="PaymentMethodInnerContainer">
      <PaymentOption hasPayment={hasPayment} Data={PaymentMethodDetail?.Data} isDeleting={Deleting} OnDelete={async () => { setDeleteConfirmbox(true); }} Label={(PaymentMethodDetail?.Data && !IsError) ? "Update" : "Save"} isLoading={isLoading} paymentDetail={PaymentDetail} setPaymentDetail={setPaymentDetail} selectedOption={PayMentOption} OnSubmit={(PaymentMethodDetail?.Data && !IsError) ? async () => {
        await UpdatePaymentMethod({
          _id: PaymentMethodDetail?.Data?._id, paymentoption: PayMentOption,
          Id: PaymentDetail?.Id || "",
          number: PaymentDetail?.number || ""
        })
      } : async () => {

        console.log(PaymentDetail)
        if (PaymentDetail?.Id.trim() == "") return toast.warning(`${PayMentOption} id is empty`)
        if (PaymentDetail?.number.trim() == "") return toast.warning(`${PayMentOption} number is empty`)

        await AddPaymentMethod(PaymentDetail)
        // toast.success("Payment Detail Updated successfully!")

      }}>

      </PaymentOption>



    </div>
    {DeleteConfirmbox && <ConfirmModal isOpen={true}
      title={"Are you sure?"}
      message={"Are u sure u want to delete paymentmethod!"}
      onConfirm={async () => { await DeletePaymentMethod({ Id: PaymentMethodDetail?.Data?._id }); }}
      onCancel={() => { setDeleteConfirmbox(false) }} ></ConfirmModal>}


  </div>

}