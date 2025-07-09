import nodemailer from "nodemailer";

const sendOrderEmail = async (toEmail, order) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });

    const mailOptions = {
        from: `"Zariin" <${process.env.EMAIL}>`,
        to: toEmail,
        subject: `🧾 Order Confirmation - ${order.orderId}`,
        html: `
      <h2>Thank you for your order!</h2>
      <p><strong>Order ID:</strong> ${order.orderId}</p>
      <p><strong>Total:</strong> ₹${order.finalAmount}</p>
      <p>Payment: ${order.paymentStatus || "Cash on Delivery"}</p>
      <p>We’ll notify you when your order ships.</p>
    `,
    };

    await transporter.sendMail(mailOptions);
};

export default sendOrderEmail;