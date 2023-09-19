import connectDB from "@/database/database";
import { NextRequest, NextResponse } from "next/server";
import todoModel from "@/model/model";

connectDB();

export async function DELETE(request:NextRequest) {
    try {
       const urParams=new URL(request.url)
       const id= urParams.searchParams.get("id")
       console.log("id is "+ id)
        await todoModel.findByIdAndDelete(id);
        console.log("Task deleted successfully from db")
        return NextResponse.json({message:"Task deleted successfully"}, {status:200})
    
    }    
    catch (error:any) {
        return new Response(error.message, { status: 500 });
    }
    
}