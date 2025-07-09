import ExpressError from "../utils/ExpressError.js";
import Order from "../models/order.schema.js";
import sendOrderEmail from "../utils/sendOrderEmail.js";

const newOrder = async (req, res, next) => {
    try {
        const {
            customer,
            items,
            totalAmount,
            deliveryCharge,
            handlingCharge,
            coupon,
            finalAmount,
            userId
        } = req.body;

        if (
            !customer?.name ||
            !customer?.email ||
            !customer?.phone ||
            !customer?.address ||
            !customer?.city ||
            !customer?.state ||
            !customer?.country ||
            !customer?.pincode ||
            !customer?.paymentMethod ||
            !items?.length ||
            !totalAmount ||
            !finalAmount ||
            !userId
        ) {
            return next(new ExpressError(400, "All fields are required"));
        }
        const generateOrderId = () => {
            const timestamp = Date.now();
            const random = Math.floor(1000 + Math.random() * 9000);
            return `ORD${timestamp}${random}`;
        };


        const order = new Order({
            orderId: generateOrderId(),
            user: userId,
            customer,
            items,
            totalAmount,
            deliveryCharge,
            handlingCharge,
            coupon,
            finalAmount,
        });

        await order.save();

        await sendOrderEmail(order.customer.email, order)


        res.status(200).json({
            success: true,
            message: "Order placed successfully",
        });
    } catch (err) {
        next(err);
    }
};

const getallorders = async (req, res) => {
    const orders = await Order.find();
    res.json(orders)
}

const deleteorder = async (req, res) => {
    const {
        id
    } = req.params
    const order = await Order.findByIdAndDelete(id)
    res.status(200).json({
        message: "Order deleted successfully"
    })
}

const orderdetails = async (req, res) => {
    const {
        id
    } = req.params
    const order = await Order.findById(id)
    res.json(order)
}

const updateorder = async (req, res) => {
    const {
        Orderstatus,
        paymentStatus
    } = req.body;
    const updateorder = await Order.findByIdAndUpdate(req.params.id, {
        Orderstatus,
        paymentStatus
    }, {
        new: true
    })
    res.status(200).json({
        message: "Order Update successfully"
    })
}

const getorderbyId = async (req, res, next) => {
    const {
        id
    } = req.params;

    try {
        const orders = await Order.find({
            user: id
        }).populate("user");


        return res.status(200).json(orders);
    } catch (err) {
        return next(new ExpressError(500, "Something went wrong"));
    }
};

const orderbyid = async (req, res) => {
    const {
        id
    } = req.params

    const order = await Order.findById(id)
    if (!order) {
        return next(new ExpressError(404, "Order not Found"))

    }
    res.json(order)
}




export {
    newOrder,
    getallorders,
    deleteorder,
    orderdetails,
    updateorder,
    getorderbyId,
    orderbyid
};