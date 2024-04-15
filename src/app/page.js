"use client"
"use client";

import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useState } from "react";

export default function Home() {
  const [name,setusername]=useState("")
  const [dob,setdob]=useState("");
  const [data,setdata]=useState(null);
  const session=useSession();
  const router=useRouter();
    async function func(){
      // console.log("email",session.data.user.email)
        const res=await axios.post("/api/check",{
            "type":"Addinfo",
            "username":name,
            "dob":dob,
            "email":session.data.user.email
            
        })
        
        setdata(res.data)
        console.log(data)
      }
  
  async function signout(){
      
    router.push("https://accounts.google.com/Logout")
    signOut();
  }
   

return(
   <div>
    {session.status==="unauthenticated" &&
      <div className="flex flex-row gap-x-32 m-2 p-2">
        <button onClick={()=>{signIn('google')}} className="border-2 bg-sky-400 blink-2 m-2 pulsate-fwd p-1"> click to authenticate</button> 
      </div>
    }
    {session?.status==="authenticated" && 
    <div className="px-10">
        <input className="w-2/4 text-black" type="text" onChange={(e)=>setusername(e.target.value)}/>username
        <br/>
        <br/>
        <input className="w-2/4 text-black" type="text" onChange={(e)=>setdob(e.target.value)}/>date of birth
        <br/>
        <br/>
        <button onClick={()=>func()}>send</button>
        <br/>
        <br/>
        {data!==null && 
      <div>
        {data.name}
        <br/>
        {data.last_name}
        <br/>
        {data.first_name}
        <br/>
        {data.email}
      </div>}
      <br/>
      <br/>
      <button onClick={()=>signout()} className="border-2 border-black bg-red-200 hover:bg-red-400">signOut</button>
    </div>
   }
  </div>
)
}
