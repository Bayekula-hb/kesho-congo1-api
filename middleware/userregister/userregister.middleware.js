const express = require("express");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const htmlEscape = require("../../utils/escapeHtml");
const { registerUser } = require("../../controllers/user.controller");

const userRegisterMiddleware = express();

userRegisterMiddleware.use(
  [
    body("email").isEmail(),
    body("password")
      .notEmpty()
      .withMessage("Cannot be empty")
      .isLength({ min: 5 })
      .withMessage("must be at least 5 chars long"),
    body("nom_user")
      .notEmpty()
      .withMessage("cannot nom_user empty")
      .isLength({ min: 3 })
      .withMessage("must be at least 3 chars long"),
    body("postnom_user")
      .notEmpty()
      .withMessage("cannot postnom_user empty")
      .isLength({ min: 3 })
      .withMessage("must be at least 3 chars long"),
    body("prenom_user")
      .notEmpty()
      .withMessage("cannot prenom_user empty")
      .isLength({ min: 3 })
      .withMessage("must be at least 3 chars long"),
    body("is_admin").notEmpty().withMessage("cannot is_admin empty"),
  ],
  (req, res, next) => {
    let { nom_user, postnom_user, prenom_user, email, is_admin, password } =
      req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    email = htmlEscape(email);
    password = bcrypt.hashSync(htmlEscape(password), 10);
    nom_user = htmlEscape(nom_user);
    postnom_user = htmlEscape(postnom_user);
    prenom_user = htmlEscape(prenom_user);
    is_admin = htmlEscape(is_admin);

    res.newPass = password;
    res.newMail = email;
    res.newNom = nom_user;
    res.newPostnom = postnom_user;
    res.newPrenom = prenom_user;
    res.newIsadmin = is_admin;
    next();
  }
);

userRegisterMiddleware.use("/", registerUser);
module.exports = userRegisterMiddleware;
