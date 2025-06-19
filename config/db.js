import mongoose from "mongoose";



async function dbConnections() {
    try {
         await mongoose.connect('mongodb://127.0.0.1:27017/zariin');
         console.log("db connection succssfully")
    } catch (error) {
        console.log(error)
    }
 

 
}

export default dbConnections