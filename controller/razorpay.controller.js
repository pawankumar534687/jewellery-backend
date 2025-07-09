import crypto from "crypto";
import Razorpay from "razorpay"
import Order from "../models/order.schema.js";
import sendOrderEmail from "../utils/sendOrderEmail.js";
const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createRazorpayOrder = async (req, res) => {
    const {
        amount
    } = req.body;

    const options = {
        amount: amount * 100,
        currency: "INR",
        receipt: `receipt_order_${Date.now()}`,
    };

    const order = await instance.orders.create(options);

    res.status(200).json({
        success: true,
        order,
        key: process.env.RAZORPAY_KEY_ID
    })
}

const verifyPayment = async (req, res) => {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        orderData
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

    const isValid = expectedSignature === razorpay_signature;

    if (isValid) {
        const generateOrderId = () => {
            const timestamp = Date.now();
            const random = Math.floor(1000 + Math.random() * 9000);
            return `ORD${timestamp}${random}`;
        };

        orderData.orderId = generateOrderId()

        orderData.paymentStatus = "paid"
        const order = new Order(orderData);
        await order.save();
       
        await sendOrderEmail(order.customer.email, order)
        
        res.status(200).json({
            success: true,
            message: "Payment verified & order placed"
        });

    }

}

export {
    createRazorpayOrder,
    verifyPayment
}