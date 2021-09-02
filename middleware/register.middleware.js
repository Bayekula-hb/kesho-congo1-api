const express = require("express");
const patientRegisterMiddleware = require("./patient/patient.register.middleware");
const userRegisterMiddleware = require("./user/user.register.middleware");
const passport = require("passport");
const { verify } = require("jsonwebtoken");
const user = require("../models/user");

const registerMiddleware = express();

// registerMiddleware.post(
//   "/user",
//   passport.authenticate("jwt", { session: false }),
//   userRegisterMiddleware
// );
registerMiddleware.post(
  "/user",
  userRegisterMiddleware
);
registerMiddleware.post(
  "/patient",
  passport.authenticate("jwt", { session: false }),
  patientRegisterMiddleware
);

module.exports = registerMiddleware;
