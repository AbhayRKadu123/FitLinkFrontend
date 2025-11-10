import "../styles/Premium.css"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react"

export default function Premium(){
  let navigate=useNavigate();
      useEffect(()=>{
  let token=localStorage.getItem('token')
  if(!token){
      navigate("/login")
  }
      },[])
    return <div className="PremiumContainer">
        <div className="PremiumCard">
            <h1 className="PremiumTitle">Go Premium</h1>
        <p className="PremiumSubtitle">
          Unlock exclusive workout plans, advanced progress tracking, and more.
        </p>
         <div className="PremiumFeatures">
          <div className="Feature">✔ Unlimited Custom Workout Plans</div>
          <div className="Feature">✔ Access to Pro Trainer Tips</div>
          <div className="Feature">✔ Advanced Progress Analytics</div>
          <div className="Feature">✔ Priority Support</div>
        </div>

        <button className="PremiumButton">Upgrade Now</button>
        <p className="PremiumNote">Get 7 days free trial</p>

        <p className="PremiumNote">₹49/month • Cancel anytime</p>

        </div>

    </div>
}