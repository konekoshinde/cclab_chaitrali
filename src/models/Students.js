import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    access_token:{
        type:String,
        required: true
    },
    username:{
        type:String
    },
    dob:{
        type:String
    }
})

const Student = mongoose.models.students || mongoose.model("students", studentSchema);

export default Student;