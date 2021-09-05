const express = require("express");
const { param, validationResult } = require("express-validator");
const { getPatient } = require("../../controllers/patient.controller");

const getPatientMiddleware = express();

getPatientMiddleware.use(
  [
    param("id_patient").isEmpty().withMessage("paramètre manquant")
    // .matches(/\d/)
    // .withMessage("paramètre non valide"),
  ],
  async (req, res, next) => {
    
    let { id_patient } = req.query;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.patientId = id_patient;
    next();
  }
);

getPatientMiddleware.use("/", getPatient)
module.exports = getPatientMiddleware;