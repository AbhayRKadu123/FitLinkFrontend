import "../styles/CommunityContainer.css"
import NavBar from "../components/NavBar"
import { useEffect } from "react"
import Premium from "./Premium"
import { useState } from "react"
export default function Community(){
    const [Premium,setPremium]=useState(true)
    return<><div className="CommunityContainer">{Premium?<h1>Community Tab</h1>:<Premium></Premium>}</div>        
    </> 
}