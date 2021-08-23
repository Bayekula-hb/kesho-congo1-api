const { user } = require("../models");
const { compare } = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  login: async (req, res) => {
    const email = res.newMail,
      password = res.newPass;

    const userWithEmail = await user.findOne({ where: { email } });
    const isPasswordValid = await compare(password, userWithEmail.password);

    if (!userWithEmail && !isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Email and password does not valid" });
    } else if (userWithEmail && !isPasswordValid) {
      return res.status(400).json({ message: "Password not valid" });
    } else if (!userWithEmail && isPasswordValid) {
      return res.status(400).json({ message: "Email not valid" });
    } else {
      const jwtToken = jwt.sign(
        { id: userWithEmail.id, email: userWithEmail.email },
        process.env.JWT_SECRET
      );
      res.status(200).json({ message: "Welcome Back!", token: jwtToken });
    }
  },
};
