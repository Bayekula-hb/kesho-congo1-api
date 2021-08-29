const express = require("express");
const { param, validationResult } = require("express-validator");
const { getAnthropometriqueByIdPatient } = require("../../controllers/anthropometrique.controller");

const anthropometriqueGetByIdMiddleware = express();

anthropometriqueGetByIdMiddleware.use(
  [
    param("id").isEmpty().withMessage("paramètre manquant"),
    // .matches(/\d/)
    // .withMessage("paramètre non valide"),
  ],
  async (req, res, next) => {
      
    let { id } = req.query;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.patientId = id;
    next();
  }
);

anthropometriqueGetByIdMiddleware.use("/", getAnthropometriqueByIdPatient);

module.exports = anthropometriqueGetByIdMiddleware;
