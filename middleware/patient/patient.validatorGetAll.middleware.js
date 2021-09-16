const express = require("express");
const { param, validationResult } = require("express-validator");

const getAllPatientValidator = express();

getAllPatientValidator.use(
  [
    param("id_patient").isEmpty().withMessage("paramètre manquant")

  ],
  async (req, res, next) => {
    
    const { limit } = req.query;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.limit = limit;
    next();
  }
);

module.exports = getAllPatientValidator;