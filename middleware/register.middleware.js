const express = require("express");
const patientRegisterMiddleware = require("./patient/patient.register.middleware");
const userRegisterMiddleware = require("./user/userRegister.middleware");
const passport = require("passport")

const registerMiddleware = express();



registerMiddleware.post("/user", userRegisterMiddleware);
registerMiddleware.post("/patient", patientRegisterMiddleware);

module.exports = registerMiddleware;
