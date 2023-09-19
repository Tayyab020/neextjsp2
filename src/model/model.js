import mongoose from "mongoose";

const todoSchema=new mongoose.Schema({
    title:{
        type:String,
   
    },
    description:{
        type:String,
     
    }
})

const todoModel = mongoose.models.todos || mongoose.model("todos" , todoSchema)

export default todoModel;