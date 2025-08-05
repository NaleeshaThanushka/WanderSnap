import mongoose from "mongoose"

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://naleeshathanushka:760733708@cluster0.muruu.mongodb.net/user').then(()=>console.log("DB connected"));
}