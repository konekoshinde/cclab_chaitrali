import mongoose from "mongoose";

const LoginSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
    
    

})

const Login = mongoose.models.Logins || mongoose.model("Logins", LoginSchema);

export default Login;