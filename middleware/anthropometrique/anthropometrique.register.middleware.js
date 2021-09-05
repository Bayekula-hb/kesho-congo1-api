const express = require("express");
const { registerPatient } = require("../../controllers/patient.controller");
const { body, query,validationResult } = require("express-validator");
const { registerAnthropometrique } = require("../../controllers/anthropometrique.controller");

const anthropometriqueRegisterMiddleware = express();

anthropometriqueRegisterMiddleware.use(
  [
    query("id_patient").notEmpty().withMessage("Cannot be empty"),
    body("peri_cranien").notEmpty().withMessage("Cannot be empty"),
    body("peri_brachial").notEmpty().withMessage("Cannot be empty"),
    body("poids").notEmpty().withMessage("Cannot be empty"),
    body("taille").notEmpty().withMessage("Cannot be empty"),
    body("type_malnutrition").notEmpty().withMessage("Cannot be empty"),
    body("date_examen").notEmpty().withMessage("Cannot be empty"),
  ],
  async (req, res, next) => {

    // Table Parametres Anthropometriques
    // const {
    //   peri_cranien,
    //   peri_brachial,
    //   poids,
    //   taille,
    //   type_malnutrition,
    //   id_patient,
    //   id_user
    // } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
);

anthropometriqueRegisterMiddleware.use("/", registerAnthropometrique)

module.exports = anthropometriqueRegisterMiddleware;