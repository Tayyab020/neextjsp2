import todoModel from "@/model/model";
import { NextRequest, NextResponse } from "next/server";
import connect  from "@/database/database";


connect()


export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {title,description} = reqBody

        console.log(reqBody);

      
        const newTodo = new todoModel({
            title,
            description
        })

        const savedTodo = await newTodo.save()    
        console.log(savedTodo);

        return NextResponse.json({
            message: "todo created successfully",
            savedTodo
        })
        
        


    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})

    }
}