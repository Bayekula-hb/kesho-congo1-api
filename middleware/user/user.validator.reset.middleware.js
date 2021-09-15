const express = require("express");
const { body, validationResult } = require("express-validator");

const userValidatorReset = express();

userValidatorReset.use(
  [
    body("nom_user")
      .notEmpty()
      .withMessage("Cannot be empty")
      .matches(/\w/)
      .withMessage("must contain a number"),
    body("prenom_user")
      .notEmpty()
      .withMessage("Cannot be empty")
      .matches(/\w/)
      .withMessage("must contain a number"),
    body("email").isEmail().withMessage("mail not valid"),
  ],
  (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.nom_user = req.body.nom_user;
    res.prenom_user = req.body.prenom_user;
    res.email = req.body.email;
    next();
  }
);

module.exports = userValidatorReset;
