import User from "../models/user.schema.js";
import ExpressError from "../utils/ExpressError.js";


const edit = async (req, res, next) => {
    const {
        id
    } = req.params

    const user = await User.findById(id)
    if (!user) {
        return next(new ExpressError(404, "User not Found"))
    }

    res.json(user)



}

const saveprofile = async (req, res, next) => {

    const {
        id
    } = req.params

    const {
        firstname,
        lastname,
        email,
        phone,
        address
    } = req.body
    const updatedData = {
        firstname,
        lastname,
        email,
        phone,
        address
    };
    if (!firstname || !lastname || !email || !phone || !address) {
        return next(new ExpressError(400, "All feild are required"))

    }
    const user = await User.findByIdAndUpdate(id, updatedData, {
        new: true
    })
    if (!user) {
        return next(new ExpressError(404, "User not found"));
    }

    res.status(200).json({
        message: "Data updated successfully",
        user: {
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            phone: user.phone,
            address: user.address
        }
    });
}

export {
    edit,
    saveprofile
}