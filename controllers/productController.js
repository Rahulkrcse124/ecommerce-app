import slugify from "slugify";
import productModel from "../models/productModel.js";
import CategoryModel from "../models/CategoryModel.js";
import fs from "fs";
import dotenv from "dotenv";

// create product
export const createProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    // Validations
    if (!name)
      return res
        .status(401)
        .send({ success: false, message: "Product name is required" });
    if (!description)
      return res
        .status(401)
        .send({ success: false, message: "Description is required" });
    if (!price)
      return res
        .status(401)
        .send({ success: false, message: "Price is required" });
    if (!category)
      return res
        .status(401)
        .send({ success: false, message: "Category is required" });
    if (!quantity)
      return res
        .status(401)
        .send({ success: false, message: "Quantity is required" });
    if (!photo || photo.size > 1000000) {
      return res.status(401).send({
        success: false,
        message: "Photo is required and should be less than 1MB",
      });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });

    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();

    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      product: products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in Create Product",
      error,
    });
  }
};

// get Allproduct controller
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      total_Count: products.length,
      message: "All Products",
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error While Getting Product",
      error,
    });
  }
};

//Get Single Product Controller
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Single Product Fetch Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error While Getting Single Product",
      error,
    });
  }
};

// Get Photo Product Controller
export const getPhotoProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id).select("photo");

    if (product && product.photo && product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    } else {
      return res.status(404).send({
        success: false,
        message: "Photo not found",
      });
    }
  } catch (error) {
    console.error("Photo Fetch Error:", error);
    return res.status(500).send({
      success: false,
      message: "Error while getting product photo",
      error: error.message,
    });
  }
};

// Delete Product controller
export const deleteProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findByIdAndDelete(id);

    if (!product) {
      return res.status(401).send({
        success: false,
        message: "Product Not Found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Product Delete Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error While Deleting Product",
    });
  }
};

// Update Product Controller
export const updateProductController = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    // Basic Validations
    if (!name)
      return res
        .status(400)
        .send({ success: false, message: "Product name is required" });
    if (!description)
      return res
        .status(400)
        .send({ success: false, message: "Description is required" });
    if (!price)
      return res
        .status(400)
        .send({ success: false, message: "Price is required" });
    if (!category)
      return res
        .status(400)
        .send({ success: false, message: "Category is required" });
    if (!quantity)
      return res
        .status(400)
        .send({ success: false, message: "Quantity is required" });

    // Find and update the product
    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );

    if (!product) {
      return res.status(404).send({
        success: false,
        message: "Product not found",
      });
    }

    // Update photo if provided
    if (photo) {
      if (photo.size > 1000000) {
        return res.status(400).send({
          success: false,
          message: "Photo should be less than 1MB",
        });
      }
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();

    res.status(200).send({
      success: true,
      message: "Product Updated Successfully",
      product,
    });
  } catch (error) {
    console.error("Update Product Error:", error);
    return res.status(500).send({
      success: false,
      message: "Error in updating product",
      error: error.message,
    });
  }
};

// product filter
export const productFilter = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};

    if (checked.length > 0) args.category = { $in: checked };
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      message: "Filter successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error While Getting Filter Product",
      error,
    });
  }
};

// product count controller
export const productCountController = async (req, res) => {
  try {
    const productCount = await productModel.countDocuments();
    res.status(200).send({
      success: true,
      message: "Proudct count Fetch Successfully",
      productCount,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error While Product Count",
      error,
    });
  }
};

// for pagination
export const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;

    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error while Getting Pagination",
      error,
    });
  }
};

// product serach controller
export const productSearchController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("-photo");
    res.json(results);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: true,
      message: "something went wrong",
      error,
    });
  }
};

// similar product
export const releatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await productModel
      .find({
        category: cid,
        _id: { $ne: pid },
      })
      .select("-photo")
      .limit(3)
      .populate("category");

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error while getting the realted product",
      error,
    });
  }
};

// product category wise
export const productCategoryController = async (req, res) => {
  try {
    const category = await CategoryModel.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error in Product Category",
      error,
    });
  }
};