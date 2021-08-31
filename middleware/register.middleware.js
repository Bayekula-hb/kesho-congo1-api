const express = require("express");
const patientRegisterMiddleware = require("./patient/patient.register.middleware");
const userRegisterMiddleware = require("./user/userRegister.middleware");
const passport = require("passport")

const registerMiddleware = express();



registerMiddleware.post("/user",passport.authenticate("jwt", { session: false }), userRegisterMiddleware);
registerMiddleware.post("/patient", passport.authenticate("jwt", { session: false }), patientRegisterMiddleware);

module.exports = registerMiddleware;
