"use client"
"use client";

import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { useState } from "react";

export default function Home() {
  const [name,setusername]=useState("")
  const [dob,setdob]=useState("");
  const [mis,setmis]=useState("");
  const [data,setdata]=useState(null);
  const session=useSession();
  const router=useRouter();
    async function func(){
      // console.log("email",session.data.user.email)
      await axios.post("/api/check",{
            "type":"Addinfo",
            "username":name,
            "dob":dob,
            "email":session.data.user.email,
            "mis":mis
      })
      setdata(null);
    }
    async function get_data(){
      const res= await axios.post("/api/check",{
        "type":"getInfo",
        "email":session.data.user.email
      })
      alert("send successfully")
      setdata(res.data);
      console.log(res);
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
        <input className="w-2/4 text-black" type="number" onChange={(e)=>setmis(e.target.value)}/>mis
        <br/>
        <br/>
        <input className="w-2/4 text-black" type="date" onChange={(e)=>setdob(e.target.value)}/>date of birth
        <br/>
        <br/>
        <button onClick={()=>func()}>send</button>
        <br/>
        <br/>
      <button onClick={()=>get_data()}>getdata</button>
      <br/>
      <br/>
      <button onClick={()=>signout()} className="border-2 border-black bg-red-200 hover:bg-red-400">signOut</button>
      {data &&
      <div>
        {data.username}
        <br/>
        {data.dob}
        <br/>
        {data.mis}
        <br/>
        {data.email}
      </div>
      }
    </div>
   }
  </div>
)
}
