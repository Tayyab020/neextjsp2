import mongoose from "mongoose";
export default async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection

        connection.on("connected", () => {
            console.log("MongoDB connected")
        
        })
        connection.on("error", (error) => {
            console.log("MongoDB connection failed "+ error )
            process.exit()
        
        })

    } catch (error) {
        console.log(error)
    }
}