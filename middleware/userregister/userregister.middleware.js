const express = require("express");
const bcrypt = require("bcrypt");
const htmlEscape = require("../../utils/escapeHtml");
const { registerUser } = require("../../controllers/user.controller");

const userRegisterMiddleware = express();

userRegisterMiddleware.use((req, res, next) => {
  const { nom_user, postnom_user, prenom_user, email, is_admin, password } =
    req.body;
  const typeEmail = typeof email,
    typePass = typeof password,
    typeNom = typeof nom_user,
    typePostnom = typeof postnom_user,
    typePrenom = typeof prenom_user,
    typeIsadmin = typeof is_admin;

  // res.status(200).json({ message: `${email} - ${is_admin} - ${password}` });
  if (
    typeEmail != "string" &&
    typePass != "string" &&
    typeIsadmin != "boolean" &&
    typePostnom != "string" &&
    typeNom != "string" &&
    typePrenom != "string"
  ) {
    res.status(400).json({
      message: `format des données incorects`,
    });
  } else {
    if (
      email === "undefined" &&
      password === "undefined" &&
      nom_user === "undefined" &&
      postnom_user === "undefined" &&
      prenom_user === "undefined" &&
      is_admin === "undefined"
    ) {
      res.status(400).json({
        message: "Veuillez remplir tous les champs",
      });
    } else {
      const cleanEmail = htmlEscape(email),
        cleanPassword = bcrypt.hashSync(htmlEscape(password), 10),
        cleanNom = htmlEscape(nom_user),
        cleanPostnom = htmlEscape(postnom_user),
        cleanPrenom = htmlEscape(prenom_user),
        cleanIsadmin = htmlEscape(is_admin);

      res.newPass = cleanPassword;
      res.newMail = cleanEmail;
      res.newNom = cleanNom;
      res.newPostnom = cleanPostnom;
      res.newPrenom = cleanPrenom;
      res.newIsadmin = cleanIsadmin;
      next();
    }
  }

  // res.status(200).json({ message: "nice register user B22222" });
  next();
});

userRegisterMiddleware.use("/", registerUser);
module.exports = userRegisterMiddleware;
