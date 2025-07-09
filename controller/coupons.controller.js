import ExpressError from "../utils/ExpressError.js";
import Coupon from "../models/coupons.schema.js";






const createCoupon = async (req, res, next) => {
    const {
        code,
        title,
        discountValue,
        minOrderAmount,
        maxOrderAmount,

    } = req.body;

    if (!code || !title || !discountValue || !minOrderAmount || !maxOrderAmount) {
        return next(new ExpressError(400, "All fields are required"));
    }

    const coupon = new Coupon({
        code,
        title,
        discountValue,
        minOrderAmount,
        maxOrderAmount
    });

    await coupon.save();

    res.status(200).json({
        message: "New coupon created"
    });
};





const applyCoupon = async (req, res, next) => {
    const {
        totalprice,
        couponCode
    } = req.body
   

    const coupon = await Coupon.findOne({
        code: couponCode,
        active: true
    })

    if (!coupon) {
        return next(new ExpressError(400, "Expired or Invalid coupon code"))

    }


    if (totalprice < coupon.minOrderAmount) {
        return next(new ExpressError(400, `Minimum order amount ₹${coupon.minOrderAmount} required`))

    }

    if (coupon.maxOrderAmount > 0 && totalprice > coupon.maxOrderAmount) {
        return next(new ExpressError(400, `Maximum order amount ₹${coupon.maxOrderAmount} exceeded`))
    }


    const discount = coupon.discountValue;
    const newTotal = totalprice - discount;

    return res.status(200).json({
        newTotal,
        discount,
        message: "Coupon applied successfully!",
    });



}

const getcoupons = async (req, res) => {
    const coupons = await Coupon.find()
    res.json(coupons)
}

const deletecoupon = async (req, res, next) => {
    const {
        id
    } = req.params
    const coupon = await Coupon.findByIdAndDelete(id)

    if (!coupon) {
        return next(new ExpressError(404, "coupon not found"))
    }
    res.status(200).json({
        message: "Coupon deleted"
    })


}

const getcouponbyid = async (req, res, next) => {
    const {
        id
    } = req.params
    const coupon = await Coupon.findById(id)
    if (!id) {
        return next(new ExpressError(404, "Coupon not found"))
    }
    res.json(coupon)
}

const editcoupon = async (req, res) => {
    const {
        id
    } = req.params
    const {
        code,
        title,
        discountValue,
        minOrderAmount,
        maxOrderAmount
    } = req.body;
    if (!code || !title || !discountValue || !minOrderAmount || !maxOrderAmount) {
        return next(new ExpressError(400, "All feild are require"))
    }

    const update = await Coupon.findByIdAndUpdate(id, {
        code,
        title,
        discountValue,
        minOrderAmount,
        maxOrderAmount
    }, {
        new: true,
        runValidators: true,
    }

    )
    if (!update) {
        return next(new ExpressError(404, "coupon not found"))
    }
    res.status(200).json({
        message: "Coupon Updated successfully"
    })
}







export {
    applyCoupon,
    createCoupon,
    getcoupons,
    deletecoupon,
    getcouponbyid,
    editcoupon
}