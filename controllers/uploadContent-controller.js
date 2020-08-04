// CAll the Error Model (our own model)
const HttpError = require("../models/http-error");
const BlogEntry = require("../models/Blog-model");
// Get mongoose
const mongoose = require("mongoose");
// Get the validator RESULTS:
const { validationResult } = require("express-validator");

const uploadBlogEntry = async (req, res, next) => {
  // Check error on req
  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    console.log(errors);
    const error = new HttpError(
      "Solicitud invalida, revisa y vuelve a intentar.",
      500
    );
    return next(error);
  }

  const { title, abstract, textContent, image } = req.body;

  const createdEntry = new BlogEntry({
    title,
    abstract,
    textContent,
    image,
  });

  try {
    await createdEntry.save({});
    res.status(201).json({
      message: "Creación de entrada exitosa!",
      blogEntry: createdEntry,
    });
  } catch (err) {
    const error = new HttpError(
      "La creación de entrada del blog ha fallado. Intenta de nuevo.",
      500
    );
    return next(error);
  }
};

const getBlogEntry = async (req, res, next) => {
  try {
    let blogEntries;
    try {
      // console.log("inside try");
      blogEntries = await BlogEntry.find({});
      //   send response
      res.status(201).json({ blogContent: blogEntries });
    } catch (err) {
      // console.log("inside catch");
      const error = new HttpError(
        "Error al solicitar tus categorías, intenta de nuevo.",
        500
      );
      return next(Error);
    }
  } catch (err) {}
};

const getBlogEntryId = async (req, res, next) => {
  // Check error on req
  const errors = validationResult(req.body);
  if (!errors.isEmpty()) {
    console.log(errors);
    const error = new HttpError(
      "Solicitud invalida, revisa y vuelve a intentar.",
      500
    );
    return next(error);
  }

  let theId = req.params.id;

  try {
    let blogEntry;
    try {
      // console.log("inside try");
      blogEntry = await BlogEntry.findById(theId);
      //   send response
      res
        .status(201)
        .json({ blogContent: blogEntry.toObject({ getters: true }) });
    } catch (err) {
      // console.log("inside catch");
      const error = new HttpError(
        "Error al solicitar tus categorías, intenta de nuevo.",
        500
      );
      return next(Error);
    }
  } catch (err) {}
};

exports.uploadBlogEntry = uploadBlogEntry;
exports.getBlogEntry = getBlogEntry;
exports.getBlogEntryId = getBlogEntryId;
