const { user } = require("../models");

module.exports = {
  login: async (req, res) => {
    // const { newPass, newMail } = res;
    const email = res.newMail,
      password = res.newPass;

    // // const userWithEmail = await User.findOne({ where: { email } });
    const userWithEmail = await user.findAll();
    // .catch((err) => {
    //   console.log("Error: ", err);
    // });
    res.status(200).json({ message: `${userWithEmail}` });

    // .catch(
    //   (err) => {
    //     console.log("Error: ", err);
    //   }
    // );

    // Si il est mal ecrit ou il n'existe pas

    // if (!userWithEmail) {
    //   return res
    //     .status(400)
    //     .json({ message: "Email or password does not match!" });
    // }
    // Si le password ne correspond pas

    // const isPasswordValid = await compare(password, userWithEmail.password);
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
