import Usermodel from "@/model/Usermodel";
import { dbConnect } from "@/lib/dbconnect";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import { sendVerificationEmail } from "@/helper/sendVerifcationEmail";

export async function POST(request:NextRequest){
    await dbConnect();

    try {
    const {username,email,password}=await request.json();
    //If user already exist then he or she should login instead of sign up
    const userexistandVerified=await Usermodel.findOne({
        email,
        isVerified:true
    });
    if(userexistandVerified){
        return NextResponse.json({
            success:false,
            message:'User already exists'
        })
    }
    //Here user already exist with this emil but not verified 
    const userexistByEmail=await Usermodel.findOne({email});
    let verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashpassword= await bcrypt.hash(password,10);
    if(userexistByEmail){
        if(userexistByEmail?.isVerified===true){
            return NextResponse.json({
                success:false,
                message:'User already exists and verified'
            },{status:400})
        }

        userexistByEmail.password=hashpassword;
        userexistByEmail.verificationCode=verifyCode;
        userexistByEmail.verificationCodeExpires=new Date(Date.now()+10*60*1000); // Set expiry time to 10 minutes from now

        await userexistByEmail.save();
    }
    //If user not exist then create new user and user is visiting the website for the first time
    let expiryDate=new Date();
    expiryDate.setMinutes(expiryDate.getMinutes() + 10); // Set expiry time to 10 minutes from now
    const newuser=await Usermodel.create({
        username,
        email,
        password:hashpassword,
        isVerified:false,
        verificationCode:verifyCode,
        verificationCodeExpires:expiryDate
    })

    // Send verification code to user email


    await newuser.save();

    const emailresponse=await sendVerificationEmail(email,username,verifyCode);
    
    if(!emailresponse.success){
        return NextResponse.json({
            success:false,
            message:emailresponse.message
       },{status:403})

    }


    return NextResponse.json({
        success:true,
        message:'User registered succefully'
    },{
        status:201
    })

    } catch (error) {
        console.log('Error in sign up',error);
        return NextResponse.json({
            success:false,
            message:'User failed in registeration'
        },{status:500})
    }

}