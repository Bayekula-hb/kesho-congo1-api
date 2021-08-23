const express = require("express");

const patientRegisterMiddleware = express();

patientRegisterMiddleware.use((req, res, next) => {
  res.status(200).json({ message: "patient register" });
});

module.exports = patientRegisterMiddleware;
