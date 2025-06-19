import Message from "../models/messages.schema.js";
import ExpressError from "../utils/ExpressError.js"

const message = async (req,res, next) =>{
    const {yourname,email,message,subject} = req.body

    if(!yourname || !email || !message || !subject){
        return next(new ExpressError(400, "All feild are required"))
    }

    const msg = await new Message({
        yourname,
        email,
        message,
        subject
    })

   await msg.save()
    res.status(200).json({message: "message send succssfully"})
}

export {message}
