// CAll the Error Model (our own model)
const HttpError = require("../models/http-error");
// Get mongoose
const mongoose = require("mongoose");
// Get the validator RESULTS:
const { validationResult } = require("express-validator");

// Import nodemailer
var nodemailer = require("nodemailer");

const sendMail = async (req, res, next) => {
  // console.log("*****      sendMail      *****");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // console.log(errors);
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
        html: `<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap" rel="stylesheet"> 
        <div
        style="width: 80%;
        border: 3px solid #0411a3;    
        margin: 2px auto">
        <div
          style="
            text-shadow: 3px 2px 1px black;
            color: white;
        margin: 3rem auto;
        text-align: center;
          "
        >
        <img
        style="max-width: 180px;"
        src="https://res.cloudinary.com/dcvnw6hvt/image/upload/v1596351802/InfiniteSupplies/identity/navlogo_dpncuq.png"
        alt='infinite logo'
        ></img>
        </div>
        
        <div
          style="
          margin-top: 3rem;
            background-color: #9e9efd;
            font-weight: 500;
            font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
            padding: 4rem 4rem;
          "
        >
          <div
          style="font-family: 'Montserrat', sans-serif;">
          <h2>Hola, ${name}</h2>
          Hemos recibido su mensaje:</div>
          <div
            style="
              width: 90%;
              margin: 1rem auto 6rem auto;
              padding: 2rem 1rem;
              background-color: #9e9efd;
              font-family: Montserrat, sans-serif;"
          >
            ${message}
          </div>
          <div
          style="font-family: 'Montserrat', sans-serif;">
          Con mucho gusto le estaremos respondiendo en breve.</div>
        </div>
        <div
        style="width: 100%;
        text-align: center;
        margin: 3rem auto">
          <img
          style="max-width: 70px;"
          src='https://res.cloudinary.com/dcvnw6hvt/image/upload/v1595808047/InfiniteSupplies/identity/logo_sm_cut_nxb9bs.png'
          alt='logo infinite single ball'
          ></img>
          <div style="
          width: 70%;
          margin: 2rem auto;
          display: grid;  grid-template-columns: auto auto auto;
          ">
            <div class="grid-item">    <img src="https://img.icons8.com/fluent/48/000000/instagram-new.png"/></div>
            <div class="grid-item"><img src="https://img.icons8.com/nolan/64/email.png"/></div>
            <div class="grid-item"><img src="https://img.icons8.com/nolan/64/phone.png"/></div>
            <div class="grid-item">
              <a 
              style="text-decoration: none; 
              font-family: 'Montserrat', sans-serif;
              font-size: 0.7rem;
              color: #9e9efd"
              href="https://www.instagram.com/infinitesuppliessa/">
                @infinitesuppliessa</a>
            </div>
            <div class="grid-item">
              <a
              style="text-decoration: none; 
              font-size: 0.7rem;
              font-family: 'Montserrat', sans-serif;
              color: #9e9efd"
               href="mailto: info@infinite-supplies.com">info@infinite-supplies.com</a>
            </div>
            <div 
            style="text-decoration: none; 
            font-family: 'Montserrat', sans-serif;
            font-size: 0.7rem;
            color: #9e9efd"
            class="grid-item">(+507) 6291-7954</div>
          </div>   
        </div>
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
              html: `<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@900&display=swap" rel="stylesheet"> 
              <div
              style="width: 80%;
              border: 3px solid #0411a3;    
              margin: 2px auto">
              <div
                style="
                  text-shadow: 3px 2px 1px black;
                  color: white;
              margin: 3rem auto;
              text-align: center;
                "
              >
              <img
              style="max-width: 180px;"
              src="https://res.cloudinary.com/dcvnw6hvt/image/upload/v1596351802/InfiniteSupplies/identity/navlogo_dpncuq.png"
              alt='infinite logo'
              ></img>
              </div>
              
              <div
                style="
                margin-top: 3rem;
                  background-color: #9e9efd;
                  font-weight: 500;
                  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
                  padding: 4rem 4rem;
                "
              >
                <div
                style="font-family: 'Montserrat', sans-serif;">
                <h2>Hola, ${name}</h2>
                Hemos recibido su mensaje:</div>
                <div
                  style="
                    width: 90%;
                    margin: 1rem auto 6rem auto;
                    padding: 2rem 1rem;
                    background-color: #9e9efd;
                    font-family: Montserrat, sans-serif;"
                >
                  ${message}
                </div>
                <div
                style="font-family: 'Montserrat', sans-serif;">
                Con mucho gusto le estaremos respondiendo en breve.</div>
              </div>
              <div
              style="width: 100%;
              text-align: center;
              margin: 3rem auto">
                <img
                style="max-width: 70px;"
                src='https://res.cloudinary.com/dcvnw6hvt/image/upload/v1595808047/InfiniteSupplies/identity/logo_sm_cut_nxb9bs.png'
                alt='logo infinite single ball'
                ></img>
                <div style="
                width: 70%;
                margin: 2rem auto;
                display: grid;  grid-template-columns: auto auto auto;
                ">
                  <div class="grid-item">    <img src="https://img.icons8.com/fluent/48/000000/instagram-new.png"/></div>
                  <div class="grid-item"><img src="https://img.icons8.com/nolan/64/email.png"/></div>
                  <div class="grid-item"><img src="https://img.icons8.com/nolan/64/phone.png"/></div>
                  <div class="grid-item">
                    <a 
                    style="text-decoration: none; 
                    font-family: 'Montserrat', sans-serif;
                    font-size: 0.7rem;
                    color: #9e9efd"
                    href="https://www.instagram.com/infinitesuppliessa/">
                      @infinitesuppliessa</a>
                  </div>
                  <div class="grid-item">
                    <a
                    style="text-decoration: none; 
                    font-size: 0.7rem;
                    font-family: 'Montserrat', sans-serif;
                    color: #9e9efd"
                     href="mailto: info@infinite-supplies.com">info@infinite-supplies.com</a>
                  </div>
                  <div 
                  style="text-decoration: none; 
                  font-family: 'Montserrat', sans-serif;
                  font-size: 0.7rem;
                  color: #9e9efd"
                  class="grid-item">(+507) 6291-7954</div>
                </div>   
              </div>
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
