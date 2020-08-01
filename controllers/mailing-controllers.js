// CAll the Error Model (our own model)
const HttpError = require("../models/http-error");
// Get mongoose
const mongoose = require("mongoose");
// Get the validator RESULTS:
const { validationResult } = require("express-validator");

// Import nodemailer
var nodemailer = require("nodemailer");

const sendMail = async (req, res, next) => {
  console.log("*****      sendMail      *****");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    const error = new HttpError("Invalid inputs, please check your data", 422);
    return next(error);
  }
  let date = new Date();
  console.log(date);
  const { name, email, message } = req.body;

  // Define transporter to login to mail sender account
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.mailUser,
      pass: process.env.mailPas,
    },
  });

  try {
    // NodeMail Send:
    let mailToInfinite = await transporter.sendMail(
      {
        from: process.env.mailUser, // sender address
        to: [`ericlucerogonzalez@gmail.com`], // list of receivers
        subject: `infinite-supplies.com `, // Subject line
        html: `<h3
        style="
          text-shadow: 3px 2px 1px black;
          color: white;
          background-color: #0411a3;
          font-weight: bold;
          padding: 18px 8px;
          font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS',
            sans-serif;
          box-shadow: 6px 6px 5px #4c91de;
        "
      >
        INFINITE-SUPPLIES.COM
        <span role="img" aria-label="rocket">
          📨
        </span>
      </h3>
      <div
      style="
        background-color: #2cf0bf65;
        border: 3px solid #0411a3;
        font-weight: 500;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        padding: 4rem 4rem;
      "
    >
        <div>Nombre: ${name} </div>
        <div>Mensaje: ${message} </div>
        <div>Enviado: ${date} </div>
        </div>`,
      },
      async (error, info) => {
        // console.log(`error: ${error}`);
        // console.log(`info: ${info}`);
        // console.log(info);
        if (!error) {
          await transporter.sendMail(
            {
              from: process.env.mailUser, // sender address
              to: [email], // list of receivers
              subject: `infinite-supplies.com | Hola ${name}`, // Subject line
              html: `<h3
              style="
                text-shadow: 3px 2px 1px black;
                color: white;
                background-color: #0411a3;
                font-weight: bold;
                padding: 18px 8px;
                font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS',
                  sans-serif;
                box-shadow: 6px 6px 5px #4c91de;
                text-decoration: none;
              "
            >
              INFINITE-SUPPLIES.COM
              <span role="img" aria-label="rocket">
                📨
              </span>
            </h3>
            <div
              style="
                background-color: #2cf0bf65;
                border: 3px solid #0411a3;
                font-weight: 500;
                font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
                padding: 4rem 4rem;
              "
            >
              <div><span style="font-weight: bolder;">Hola, ${name}</span></div>
              <div>Hemos recibido su mensaje:</div>
              <div
                style="
                  width: 50%;
                  margin: 1rem auto 5rem auto;
                  padding: 2rem 1rem;
                  background-color: #9e9efd;
                  border: 3px solid #0411a3;
                "
              >
                ${message}
              </div>
              <div>Con mucho gusto le estaremos respondiendo en breve.</div>
            </div>`,
            },
            (error, info) => {
              //              console.log(`error: ${error}`);
              //              console.log(`info: ${info}`);
              //              console.log(info);
            }
          );
        }
      }
    );
    res.status(200).json({ emailSent: true });
  } catch (err) {
    res.json({
      message: "Ha ocurrido un error al reenviar el email de respuesta",
      error: err,
    });
  }
};

exports.sendMail = sendMail;
