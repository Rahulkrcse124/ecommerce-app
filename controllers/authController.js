import userModel from "../models/userModel.js";
import { hashPassword, compareHashPassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const userRegister = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;

    // validation
    if (!name) {
      return res
        .status(400)
        .send({ success: false, message: "name is required" });
    }
    if (!email) {
      return res
        .status(400)
        .send({ success: false, message: "email is required" });
    }
    if (!password) {
      return res
        .status(400)
        .send({ success: false, message: "password is required" });
    }
    if (!phone) {
      return res
        .status(400)
        .send({ success: false, message: "phone is required" });
    }
    if (!address) {
      return res
        .status(400)
        .send({ success: false, message: "address is required" });
    }

    if (!answer) {
      return res.status(400).send({
        success: false,
        message: "answer is required",
      });
    }

    // check user on the basis on email
    const existingUser = await userModel.findOne({ email });
    // exist user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "already register please login",
      });
    }

    const hashedpassword = await hashPassword(password);

    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedpassword,
      answer,
    }).save();

    res.status(201).json({
      success: true,
      message: "user registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error in registration",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(500).json({
        success: false,
        message: "invalid email or password",
      });
    }

    // check email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: "email is not registerd",
      });
    }

    // check password
    const match = await compareHashPassword(password, user.password);

    if (!match) {
      return res.status(404).send({
        success: false,
        message: "Invalid password",
      });
    }

    // token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).json({
      success: true,
      message: "Login Successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log("login falied");
    res.status(500).json({
      success: false,
      message: "Login Failed",
      error,
    });
  }
};

// forgot password controller
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Email is Required",
      });
    }

    if (!answer) {
      return res.status(400).send({
        success: false,
        message: "Answer is required",
      });
    }

    if (!newPassword) {
      return res.status(400).send({
        success: false,
        message: "New Password is required",
      });
    }

    // check
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Wrong Email or Answer",
      });
    }

    const hashNewPassword = await hashPassword(newPassword);
    user.password = hashNewPassword;
    await user.save();

    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something Went Wrong",
      error,
    });
  }
};

// test
export const testController = (req, res) => {
  res.send("test controller");
};

// get user by id
export const getUserById = async (req, res) => {
  try {
    // const { id } = await req.params;
    const { id } = await req.params;
    const user = await userModel.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.send(error);
  }
};

//update profile

export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);

    // password
    if (password && password.length < 6) {
      return res.json({ error: "password must be Atleast 6 character" });
    }

    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        address: address || user.address,
        phone: phone || user.phone,
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "User Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error While Update Profile",
      error,
    });
  }
};
