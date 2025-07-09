import Message from "../models/messages.schema.js";
import ExpressError from "../utils/expressError.js";

const message = async (req, res, next) => {
    const {
        yourname,
        email,
        message,
        subject
    } = req.body

    if (!yourname || !email || !message || !subject) {
        return next(new ExpressError(400, "All feild are required"))
    }

    const msg = await new Message({
        yourname,
        email,
        message,
        subject
    })

    await msg.save()
    res.status(200).json({
        message: "message send succssfully"
    })
}

const getmessage = async (req, res) => {
    const allmessage = await Message.find()
    res.json(allmessage)

}

const deletemessage = async (req, res, next) => {
    const {
        id
    } = req.params
   
    const message = await Message.findByIdAndDelete(id)

    if (!message) {
        return next(new ExpressError(404, "user message id is not Found"))
    }

    res.status(200).json({
        message: "Message deleted successfully"
    });
}






export {
    message,
    getmessage,
    deletemessage
}