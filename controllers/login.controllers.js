const { user } = require("../models");

module.exports = {
  login: async (req, res) => {
    // const { newPass, newMail } = res;
    const email = res.newMail,
      password = res.newPass;

    const userWithEmail = await User.findOne({ where: { email } });
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
    // const userWithEmail = await user.findAll();
    // .catch((err) => {
    //   console.log("Error: ", err);
    // });

    // Si il est mal ecrit ou il n'existe pas

    // Si le password ne correspond pas

    // if (!isPasswordValid) {
    //   return res
    //     .status(400)
    //     .json({ message: "Email or password does not match!" });
    // }
    // Nous generons un Token qui gardera les identifiants id et email de notre utilisateur
    // const jwtToken = jwt.sign(
    //   { id: userWithEmail.id, email: userWithEmail.email },
    //   process.env.JWT_SECRET
    // );
    // res.json({ message: "Welcome Back!", token: jwtToken });
  },
};
