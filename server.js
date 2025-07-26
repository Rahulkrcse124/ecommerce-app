import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";

import userRoute from "./routes/authRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
const app = express();



// configure of dotenv file
dotenv.config();

// connected to database
connectDb();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("<h1>welcome to Ecommerce Project</h1>");
});

// raoutes for users
app.use("/api/v1/auth", userRoute);

// routes for category
app.use("/api/v1/category", categoryRoute);

// routes for products
app.use("/api/v1/product", productRoute);

// routes for payment
app.use("/api/v1/payment", paymentRoutes);

// order route
app.use("/api/v1/order", orderRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `server runing on ${process.env.DEV_MODE} mode on port:${PORT}`.bgCyan.white
  );
});
