const express = require("express");
const { query, validationResult } = require("express-validator");
const { deletePatient } = require("../../controllers/patient.controller");
const patientDestroyMiddleware = express();

patientDestroyMiddleware.use([
  query("id")
    .notEmpty()
    .withMessage("id of patient is required")
    .matches(/\d/)
    .withMessage("must contain a number")],
    (req, res, next) => {
    let { id } = req.query 
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      res.id = id;
      next();
    }
),

patientDestroyMiddleware.use("/", deletePatient);

module.exports= patientDestroyMiddleware;