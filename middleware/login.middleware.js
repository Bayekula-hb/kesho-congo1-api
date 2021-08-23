const express = require("express");
const { login } = require("../controllers/login.controller");
const bcrypt = require("bcrypt");
const htmlEscape = require("../utils/escapeHtml");
const hashPassword = require("../utils/hashPassword");

const loginMiddleware = express();

loginMiddleware.use((req, res, next) => {
  const { email, password } = req.body;
  const typeEmail = typeof email,
    typePass = typeof password;

  if (typeEmail != "string" && typePass != "string") {
    res.status(400).json({
      message: `${email} et ${password} n'est sont pas de bon format`,
    });
  } else {
    if (email === "undefined" && password === "undefined") {
      res.status(400).json({
        message: `l'email ou le mot de passe est vide`,
      }); 
    } else {
      let cleanEmail = htmlEscape(email),
          cleanPassword = htmlEscape(password);
        // cleanPassword = bcrypt.hashSync(htmlEscape(password), 10);

      res.newPass = cleanPassword;
      res.newMail = cleanEmail;
      next();
    }
  }
});

loginMiddleware.use("/", login);
module.exports = loginMiddleware;