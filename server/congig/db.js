import mongoose from "mongoose"

const dbConnection = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('db connection established');
    } catch (error) {
        console.log('db connection failed');
    }
}

export default dbConnection