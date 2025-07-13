import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
// import { Client } from "@elastic/elasticsearch";

import dbConnections from './config/db.js';
import user from "./routes/user.routes.js";
import product from "./routes/product.routes.js";
import editprofile from "./routes/editprofile.routes.js";
import messages from "./routes/messages.routes.js";
import forgotpassword from "./routes/forgotpassword.routes.js";
import search from "./routes/search.routes.js";
import coupon from "./routes/coupon.routes.js";
import category from "./routes/category.routes.js";
import subcategory from "./routes/subcategory.routes.js";
import order from "./routes/order.routes.js";
import razorpay from "./routes/razorpay.routes.js";
import banner from "./routes/banner.routes.js";

dotenv.config();
const app = express();

dbConnections();


app.use(express.json());


const allowedOrigins = [
  'https://jewellery-project-z6a4.onrender.com',
  'https://jewellery-admin-9mo1.onrender.com',
  'http://localhost:5173',
  'http://localhost:5174'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));


// export const elasticClient = new Client({ node: "http://localhost:9200" });

app.use("/api", user);
app.use("/api", product);
app.use("/api", editprofile);
app.use("/api", messages);
app.use("/api", forgotpassword);
app.use("/api", search);
app.use("/api", coupon);
app.use("/api", category);
app.use("/api", subcategory);
app.use("/api", order);
app.use("/api", razorpay);
app.use("/api", banner);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  res.status(status).json({ error: message });
});


app.listen(process.env.PORT, () => {
  console.log("🚀 Server listening on port", process.env.PORT);
});
