import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/database/database';
import todoModel from '@/model/model';
connectDB()
export async function GET(request:NextRequest) {
    try {
        const data = await todoModel.find({})
        return NextResponse.json(data)
    
    } catch (error:any) {
        return NextResponse.json({message:"cant get data"}
        ,{status:500})
    }
}