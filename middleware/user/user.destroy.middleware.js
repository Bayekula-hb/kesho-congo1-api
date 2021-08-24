const express = require("express");
const { query, param, validationResult } = require("express-validator");
const { deleteUser } = require("../../controllers/user.controller");

const userDestroyMiddleware = express();

userDestroyMiddleware.use(
  [
    query("id")
      .notEmpty()
      .withMessage("Cannot be empty")
      .matches(/\d/)
      .withMessage("must contain a number"),
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
userDestroyMiddleware.use("/", deleteUser)
module.exports = userDestroyMiddleware;
