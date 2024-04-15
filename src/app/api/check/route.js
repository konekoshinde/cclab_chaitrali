import { connect } from "@/dbconfig/dbconfig";

import axios from "axios";
import Student from "@/models/Students";
import Login from "@/models/Login";

export const POST=async(req)=>{
    const request=await req.json();
    connect();
    if(request.type==="Addinfo"){
        const currUser=await Student.findOne({
          email:request.email
        })
        
        if(currUser){
            await Student.deleteOne({
                email:request.email
            })
            const currUser1= await Student.create({
                "username":request.username,
                "name":currUser.name,
                "dob":request.dob,
                "email":request.email,
                "access_token":currUser.access_token
                
            })
            return Response.json(currUser1)
        }
        else return Response.json("err")
    }
    
    return Response.json("ok")
}