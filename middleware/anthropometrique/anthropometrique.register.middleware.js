const express = require("express");
const { registerPatient } = require("../../controllers/patient.controller");
const { body, validationResult } = require("express-validator");
const { registerAnthropometrique } = require("../../controllers/anthropometrique.controller");

const anthropometriqueRegisterMiddleware = express();

anthropometriqueRegisterMiddleware.use(
  [
    body("peri_cranien").notEmpty().withMessage("Cannot be empty"),
    body("peri_brachial").notEmpty().withMessage("Cannot be empty"),
    body("poids").notEmpty().withMessage("Cannot be empty"),
    body("taille").notEmpty().withMessage("Cannot be empty"),
    body("type_malnutrition").notEmpty().withMessage("Cannot be empty"),
    body("id_patient").notEmpty().withMessage("Cannot be empty"),
    body("id_user").notEmpty().withMessage("Cannot be empty"),
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
    // erreur pour voir si le champs est vide
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res
    next();
  }
);

anthropometriqueRegisterMiddleware.use("/", registerAnthropometrique)

module.exports = anthropometriqueRegisterMiddleware;