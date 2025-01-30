import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import Usermodel from "@/model/Usermodel";
import { dbConnect } from "@/lib/dbconnect";
import bcrypt from "bcrypt";


export const authOptions:NextAuthOptions = {
    providers: [
      CredentialsProvider({
        id: "credentials",
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "email"},
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials:any):Promise<any> {
           //Here we Have to write the logic for sign-in
           await dbConnect()
           try {
           const user=await Usermodel.findOne({
                email:credentials.email
           })
           if(!user){
             return new Error('No user found')
           }

           const checkhashpassword=bcrypt.compareSync(credentials.password,user.password)
           if(!checkhashpassword){
                return new Error('Password is incorrect')
            }

            return user;
            
           } catch (error:any) {
                return new Error('Error in signin',error)
           }
        }
      })
    ],
    callbacks: {
        async jwt({ token,user}:any) {
            if(user){
                token.id=user._id.toString()
                token.email=user.email
                token.isVerified=user.isVerified
            }
            return token
        },
        async session({ session,token }:any) {
           if(token){
            session.id=token.id
            session.email=token.email
            session.isVerified=token.isVerified
           }
            return session
        },
    },
    session:{
        strategy:'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages:{
        signIn:'/sign-in',
    }
    
}

export default NextAuth(authOptions)