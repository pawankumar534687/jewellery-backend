import mongoose from "mongoose";



async function dbConnections() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("db connection succssfully")
    } catch (error) {
        console.log(error)
    }



}

export default dbConnections