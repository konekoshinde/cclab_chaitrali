import { connect } from "@/dbconfig/dbconfig";


import Student from "@/models/Students";


export const POST=async(req)=>{
    const request=await req.json();
    connect();
    if(request.type=="Addinfo"){
        const currUser=await Student.findOneAndUpdate({
          email:request.email
        },{
            "username":request.username,
            "dob":request.dob,
            "MISnumber":request.mis
        })
        return Response.json("ok")
    }
    else if(request.type=="getInfo"){
        const currUser=await Student.findOne({
            email:request.email
        })
        return Response.json(currUser)
    }
     
    
    return Response.json("ok")
}