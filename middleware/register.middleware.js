const express = require("express");
const patientRegisterMiddleware = require("./patientRegister/patientRegister.middleware");
const userRegisterMiddleware = require("./user/userRegister.middleware");

const registerMiddleware = express();

registerMiddleware.post("/user", userRegisterMiddleware);
registerMiddleware.post("/patient", patientRegisterMiddleware);

module.exports = registerMiddleware;
