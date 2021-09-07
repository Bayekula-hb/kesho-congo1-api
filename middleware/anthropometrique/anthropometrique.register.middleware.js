const express = require("express");
const { registerPatient } = require("../../controllers/patient.controller");
const { body, query, validationResult } = require("express-validator");

const anthropometriqueRegisterMiddleware = express();
const validationData = [
  query("id_patient").notEmpty().withMessage("Cannot be empty"),
  body("peri_cranien").notEmpty().withMessage("Cannot be empty"),
  body("peri_brachial").notEmpty().withMessage("Cannot be empty"),
  body("poids").notEmpty().withMessage("Cannot be empty"),
  body("taille").notEmpty().withMessage("Cannot be empty"),
  body("type_malnutrition").notEmpty().withMessage("Cannot be empty"),
  body("date_examen").notEmpty().withMessage("Cannot be empty"),
];

anthropometriqueRegisterMiddleware.use(
  validationData,

  async (req, res, next) => {
    const {
      peri_cranien,
      peri_brachial,
      poids,
      taille,
      type_malnutrition,
      id_patient,
      id_user,
    } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
);

module.exports = anthropometriqueRegisterMiddleware;
