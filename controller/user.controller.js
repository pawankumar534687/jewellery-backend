import User from "../models/user.schema.js";
import ExpressError from "../utils/expressError.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const signup = async (req, res, next) => {

    const {
        firstname,
        lastname,
        email,
        password,
    } = req.body;

    if (!firstname || !lastname || !email || !password) {
        return next(new ExpressError(404, "all feild are required "))
    }

    const exist = await User.findOne({
        email
    })

    if (exist) {
        return next(new ExpressError(400, "user allready exist"))
    }

    const saltPassword = await bcrypt.hash(password, 10)

    const user = new User({
        firstname,
        lastname,
        email,
        password: saltPassword,


    })

    await user.save()

    const token = jwt.sign({
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET, {
            expiresIn: "7d"
        }
    )

    res.status(200).json({
        message: "Signup successful",
        token,
        user: {
            id: user._id,
           
        }

    })

}

const login = async (req, res, next) => {
    const {
        email,
        password
    } = req.body

    if (!email || !password) {
        return next(new ExpressError(404, "all feild are required"))
    }

    const user = await User.findOne({
        email
    })

    if (!user) {
        return next(new ExpressError(404, "User not found"))
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        return next(new ExpressError(401, "Invalid credentials"));

    }
    const token = jwt.sign({
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET, {
            expiresIn: "7d"
        }
    )

    res.status(200).json({
        message: "login succssfully",
        token,
        user: {
            id: user._id,
           
        }

    })
}






export {
    signup,
    login
}