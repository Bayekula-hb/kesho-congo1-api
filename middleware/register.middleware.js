const express = require("express");
const patientRegisterMiddleware = require("./patientregister/patientregister.middleware");
const userRegisterMiddleware = require("./userregister/userregister.middleware");

const registerMiddleware = express();

registerMiddleware.post("/user", userRegisterMiddleware);
registerMiddleware.post("/patient", patientRegisterMiddleware);

module.exports = registerMiddleware;
