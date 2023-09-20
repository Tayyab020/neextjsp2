import connectDB from "@/database/database";
import { NextRequest, NextResponse } from "next/server";
import todoModel from "@/model/model";

connectDB();

export async function PUT(request: NextRequest) {
  try {
    const urParams = new URL(request.url);
    const id = urParams.searchParams.get("id");
    const reqBody = await request.json();
    const { title, description } = reqBody;

    if (!id) {
      return NextResponse.json(
        { error: "Invalid ID provided" },
        { status: 400 }
      );
    }

    // Assuming you have a MongoDB model called "todoModel" defined
    const task = await todoModel.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );

    if (!task) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    console.log("Task updated successfully in the database");
    return NextResponse.json({ message: "Task updated successfully" }, { status: 200 });
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
