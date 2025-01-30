import { dbConnect } from "@/lib/dbconnect";
import Usermodel from "@/model/Usermodel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    await dbConnect();
    try {
        const {email,verifyCode}=await request.json();
        const decodeemail=decodeURIComponent(email);
        const user = await Usermodel.findOne({email:decodeemail});
        console.log(user);
        if(!user){
            return NextResponse.json({
                success:false,
                message:'User not found'
            },{status:404})
        } 
        if(user.verificationCode!=verifyCode){
            return NextResponse.json({
                success:false,
                message:'verification code is incorrect'
            },{status:400})
        }
        let currentDate=new Date();
        let isNotExpired=new Date(user.verificationCodeExpires) > currentDate;

        if(!isNotExpired){
            return NextResponse.json({
                success:false,
                message:'Verification code expired'
            })
        }
        user.isVerified=true;
        await user.save();

        return NextResponse.json({
            success:true,
            message:'User verified successfully'
        })

    } catch (error) {
        console.log('Error while verifying user',error);
        return NextResponse.json({
            success:false,
            message:'Error while verifying user'
        },{status:500})
    }

}