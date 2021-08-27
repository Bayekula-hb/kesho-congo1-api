const express = require("express");
const bcrypt = require("bcrypt");
const { param, query, body, validationResult } = require("express-validator");
const {
  getAllUser,
  getUserById,
} = require("../../controllers/user.controller");

const getUserMiddleware = express();

getUserMiddleware.use(
  [
    param("id")
      .isEmpty()
      .withMessage("paramètre manquant")
      // .matches(/\d/)
      // .withMessage("paramètre non valide"),
  ],
  (req, res, next) => {
    let { id } = req.query;

    const errors = validationResult(req);    
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.id = id;
    next();
  }
);

getUserMiddleware.use("/", getUserById);
module.exports = getUserMiddleware;
