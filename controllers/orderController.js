import orderModel from "../models/orderModel.js";

// Get orders for logged-in user
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name email");

    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "Error while fetching orders",
      error,
    });
  }
};

// orderController.js
export const createOrderController = async (req, res) => {
  try {
    const { cart, payment } = req.body;
    const order = new orderModel({
      products: cart.map((item) => item._id),
      payment,
      buyer: req.user._id,
    });
    await order.save();
    res.status(201).send({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).send({ success: false, error: error.message });
  }
};

// get all order controller ---- Admin---
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find()
      .populate("products", "-photo")
      .populate("buyer", "name email")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      success: false,
      message: "Error while fetching orders",
      error,
    });
  }
};

//UPDATE-- order status controller ---- Admin---
export const orderStatusController = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const orders = await orderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error While Updating Order",
      error,
    });
  }
};
