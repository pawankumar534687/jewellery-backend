import User from "../models/user.schema.js";
import nodemailer from 'nodemailer';
import crypto, {
    randomBytes
} from 'crypto'
import ExpressError from "../utils/expressError.js";
import bcrypt from "bcrypt" 

const forgotPassword = async (req, res, next) => {
    const {
        email
    } = req.body

    if (!email) {
        return next(new ExpressError(400, "email is required"))
    }

    const user = await User.findOne({
        email
    })

    if (!user) {
        return next(new ExpressError(404, "User not Found"))
    }

    const token = randomBytes(20).toString("hex");
    const hash = crypto.createHash("sha256").update(token).digest("hex");

    user.resetPasswordToken = hash;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
    await user.save();

    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "pawankumar534687@gmail.com",
            pass: "rgqc fmpe lqkj psll",

        },
    });
  const resetUrl = `http://localhost:5173/reset-password/${token}`;


    const message = {
        to: user.email,
        subject: "Password Reset Request",
        text: `Reset your password here: ${resetUrl}`,
    };

    await transporter.sendMail(message);
    res.json({
        message: "Reset link sent to email"
    });


};

const resetPassworod = async (req, res, next) => {
    const token = req.params.token;
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: {
            $gt: Date.now()
        },
    });

    if (!user) {
        return next(new ExpressError(400, "Invalid or expired token"))
    }

    const hasedpassword = await bcrypt.hash(req.body.password, 10)



    user.password = hasedpassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({
        message: "Password updated successfully"
    });

}





export {
    forgotPassword,  resetPassworod
}