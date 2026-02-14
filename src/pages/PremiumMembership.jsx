import "../styles/PremiumMembership.css"
import HeadingContainer from "../components/HeadingContainer"
import { toast } from "react-toastify"

function PremiumMembershipCard({title,price}){
    return <div className="PremiumMembershipCard">
        <div className="premiumcardheadertop">
            <img style={{width:"1.5rem",height:"1.5rem"}} src="public/Images/crown.png"></img>
            <h3>{title}</h3>
        </div>
        <div className="premiumcardheadermiddle">
            <h3 className="PremiumcardPrice">₹ {price} /month</h3>
            <p>access all {title} feature</p>
        </div>
        <div className="premiumcardheaderbottom">
            <ul>
                <li><img style={{width:'0.8rem',height:"0.8rem"}} src="public/Images/check-mark-gold.png"></img><p>access to advance workout plan</p></li>
                <li><img style={{width:'0.8rem',height:"0.8rem"}} src="public/Images/check-mark-gold.png"></img><p>access to advance workout plan</p></li>
                <li><img style={{width:'0.8rem',height:"0.8rem"}} src="public/Images/check-mark-gold.png"></img><p>access to advance workout plan</p></li>

            </ul>
        </div>
        <div className="premiumcardheaderbottombtn">
            <button onClick={()=>{return toast.warning("Under Development Phase")}}><p>Upgrade</p></button>
            <button onClick={()=>{return toast.warning("Under Development Phase")}}><p>Manage</p></button>


        </div>


    </div>
}
export default function PremiumMembership(){
    return <div className="PremiumMembershipContainer">
        <HeadingContainer Title={"Premium memberships"}></HeadingContainer>
       <div className="PremiumMembershipinnercontainer">

        <PremiumMembershipCard title={"Premium"} price={50}></PremiumMembershipCard>
        <PremiumMembershipCard title={"Premium Plus"} price={60}></PremiumMembershipCard>
        <PremiumMembershipCard title={"Premium Pro"} price={70}></PremiumMembershipCard>



       </div>
    </div>
}