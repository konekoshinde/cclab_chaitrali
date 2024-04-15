import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { connect } from "@/dbconfig/dbconfig";

import Student from "@/models/Students";

const authOptions = {
  
  
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    
  ],
  session:{
    strategy: "jwt",
  },
  callbacks:{
 
      
    // async signIn({token,user,account,profile}){
      
    async signIn({token,user,email,account,profile}){
      try{
        connect();
        const currStudent= await Student.findOne({
            email: user.email
        })

        if(currStudent===null){
          await Student.create({
            email:user.email,
            name:user.name,
            access_token:account.access_token,
          })
        }
      }
      catch(e){
        console.log(e);
      }
      return true;
    },

    async jwt({ trigger,token, account, profile,session}){
      return token;
    },
    async session({ session, trigger,token}){
      return session;

    }
    
  },
  events:{
    async signOut({token,session}){
      
    //   session={};
    //   token={};
      
    
      
    }
  }
  
}
const handler=NextAuth(authOptions);
export {handler as GET ,handler as POST}