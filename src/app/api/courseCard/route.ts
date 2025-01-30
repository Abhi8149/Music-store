import { dbConnect } from "@/lib/dbconnect";
import Coursemodel from "@/model/Coursemodel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    await dbConnect();
    try {
        const {courseId}=await request.json();
        const courses=await Coursemodel.findById(courseId);
        if(!courses){
            return NextResponse.json({
                    
                    success:false,
                    message:'Course not found'
            })
        }

        return NextResponse.json({
                
                success:true,
                message:courses
        })
        
    } catch (error:any) {
        console.log('Error in loading course card details',error);
        return NextResponse.json({
            success:false,
            message:error.message
        })
    }
    

}