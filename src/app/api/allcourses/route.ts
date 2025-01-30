import { dbConnect } from "@/lib/dbconnect";
import Coursemodel from "@/model/Coursemodel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
    await dbConnect();
    try {
        const allcourses=await Coursemodel.find({});
        if(allcourses.length==0){
            return NextResponse.json({
                success:false,
                message:'No courses found'
            })
        }
        return NextResponse.json({
            success:true,
            message:allcourses
        })   
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:'Error in fetching courses'
        })
    }

}

export async function POST(request:NextRequest){
    await dbConnect();
    try {
        const course=await Coursemodel.create(request.body);
        if(!course){
            return NextResponse.json({
                success:false,
                message:'Course not created'
            })
        }
        return NextResponse.json({
            success:true,
            message:course
        })
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:'Error in creating course'
        })
    }
}