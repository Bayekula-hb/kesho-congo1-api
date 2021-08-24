const express = require("express");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const { registerUser } = require("../../controllers/user.controller");

const userRegisterMiddleware = express();

userRegisterMiddleware.use(
  [
    body("email").isEmail(),
    body("nom_user").notEmpty().withMessage("Cannot be empty"),
    body("prenom_user").notEmpty().withMessage("Cannot be empty"),
    body("password")
      .notEmpty()
      .withMessage("Cannot be empty")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long"),
    body("image_user")
      .notEmpty()
      .withMessage("Cannot be empty")
      .isURL()
      .withMessage("this url is not valid"),
    body("statut")
      .notEmpty()
      .withMessage("Cannot be empty")
      .matches(/\w/)
      .withMessage("pas de chiffres"),
  ],
  (req, res, next) => {
    let {
      nom_user,
      postnom_user,
      prenom_user,
      image_user,
      email,
      is_admin,
      password,
      statut,
    } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.password = bcrypt.hashSync(password, 10);
    res.email = email;
    res.nom_user = nom_user;
    res.postnom_user = postnom_user;
    res.prenom_user = prenom_user;
    res.is_admin = is_admin;
    res.image_user = image_user;
    res.statut = statut;
    next();
  }
);

userRegisterMiddleware.use("/", registerUser);
module.exports = userRegisterMiddleware;
