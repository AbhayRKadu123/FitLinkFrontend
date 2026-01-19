import HeaderTop from "../components/Header";
import HeadingContainer from "../components/HeadingContainer";
import "../styles/PaymentMethod.css"

function PaymentOption() {
    return <div className="PaymentOptionCard">

    </div>
}
function PaymentOptioinPill({title,imageurl}) {

    return <span className="PaymentOptionpill">
        <img  src={imageurl}></img>
        <span>{title}</span>

    </span>
}

export default function PaymentMethod() {
    return <div className="PaymentMethodContainer">
        <HeadingContainer Title={"Add Payment-Method"} ></HeadingContainer>
        <div className="PaymentOptions">
            <PaymentOptioinPill imageurl={"Images/PhonePeRounded.png"} title={"PhonePe"}></PaymentOptioinPill>
            <PaymentOptioinPill imageurl={"Images/PaytmLogo.png"} title={"PayTm"}></PaymentOptioinPill>
            <PaymentOptioinPill imageurl={"Images/GpayLogo.png"} title={"Gpay"}></PaymentOptioinPill>
            <PaymentOptioinPill imageurl={"Images/PayPal.png"} title={"PayPal"}></PaymentOptioinPill>
            


        </div>

        <div className="PaymentMethodInnerContainer">
            {/* <PaymentOption>

            </PaymentOption> */}



        </div>


    </div>

}