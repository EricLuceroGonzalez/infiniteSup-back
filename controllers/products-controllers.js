// CAll the Error Model (our own model)
const HttpError = require("../models/http-error");
// Get mongoose
const mongoose = require("mongoose");
// Get the validator RESULTS:
const { validationResult } = require("express-validator");

// Get the Models
const Category = require("../models/Category-model");
const Product = require("../models/Product-model");
const Blog = require("../models/Blog-model");

const postCategory = async (req, res, next) => {
  // console.log("postCategory");
  // console.log(req.body);

  // Check error on req
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // console.log(errors);
    const error = new HttpError(
      "Solicitud invalida, revisa y vuelve a intentar.",
      500
    );
    return next(error);
  }
  //   create the pack
  const { categoryName, logo, fgLogo } = req.body;
  const createdCategory = new Category({
    categoryName,
    logo,
    fgLogo,
  });

  try {
    await createdCategory.save({});
  } catch (err) {
    const error = new HttpError(
      "Creación de categoría fallido. Intenta de nuevo.",
      500
    );
    return next(error);
  }

  //   send response
  res.status(201).json({ categories: createdCategory });
};

const getCategories = async (req, res, next) => {
  let categories;
  try {
    // console.log("inside try");
    categories = await Category.find({}).populate('products');
    //   send response
    res.status(201).json({ categories: categories });
  } catch (err) {
    // console.log("inside catch");
    const error = new HttpError(
      "Error al solicitar tus categorías, intenta de nuevo.",
      500
    );
    return next(Error);
  }
};

const postProduct = async (req, res, next) => {
  // console.log("postProduct");
  // console.log(req.body);

  // Check error on req
  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    // console.log(errors);
    const error = new HttpError(
      "Solicitud invalida, revisa y vuelve a intentar.",
      500
    );
    return next(error);
  }
  //   create the pack
  //   const { categoryName, logo, fgLogo } = req.body;

  const {
    image,
    name,
    description,
    features,
    sizes,
    hasFragance,
    domesticUse,
    industryUse,
    flavors,
  } = req.body;

  const createdProduct = new Product({
    image,
    name,
    description,
    features,
    sizes,
    hasFragance,
    domesticUse,
    industryUse,
    flavors,
  });

  let category;
  let idArrays = [];
  // try {
  idArrays = req.body.cats.map(async (item) => {
    try {
      category = await Category.findOne({ categoryName: item });
    } catch (err) {
      const error = new HttpError(
        "Esta categoría no esta registrada. Intenta de nuevo.",
        500
      );
      return next(error);
    }
    await category.products.push(createdProduct._id);
    await createdProduct.categories.push(category._id);
    await category.save({});
  });

  // console.log(idArrays);

  if (!idArrays) {
    const error = new HttpError(
      "Esta categoría no esta encontrada. Intenta de nuevo.",
      500
    );
    return next(error);
  }

  try {
    await createdProduct.save({});
  } catch (err) {
    const error = new HttpError(
      "Esta categoría no esta encontrada. Intenta de nuevo.",
      500
    );
    return next(error);
  }

  //   send response
  res
    .status(201)
    .json({ message: "Product Created!", response: createdProduct });
};

const getProducts = async (req, res, next) => {
  // console.log("postCategory");
  // console.log(req.body);

  // Check error on req
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // console.log(errors);
    const error = new HttpError(
      "Solicitud invalida, revisa y vuelve a intentar.",
      500
    );
    return next(error);
  }
  let products;
  try {
    // console.log("inside try");
    products = await Product.find({});
    //   send response
    res.status(201).json({ products: products });
  } catch (err) {
    // console.log("inside catch");
    const error = new HttpError(
      "Error al solicitar tus productos, intenta de nuevo.",
      500
    );
    return next(Error);
  }
};


// const getBlogs = async (req, res, next) => {};

exports.getCategories = getCategories;
exports.postCategory = postCategory;
exports.postProduct = postProduct;
exports.getProducts = getProducts;
// exports.getBlogs = getBlogs;