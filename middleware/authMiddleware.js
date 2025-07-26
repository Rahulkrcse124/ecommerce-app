import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const requiredSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "").trim();
    const decode = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    res.status(401).send({
      success: false,
      message: "Jwt error",
      err: error,
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);

    if (user.role !== 1) {
      return res.status(401).send({
        sucess: false,
        message: "unAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: err,
    });
  }
};
