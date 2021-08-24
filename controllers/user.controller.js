const { user } = require("../models");

module.exports = {
  registerUser: async (req, res) => {
    const email = res.newMail,
      password = res.newPass,
      nom_user = res.newNom,
      postnom_user = res.newPostnom,
      prenom_user = res.newPrenom,
      is_admin = res.newIsadmin;

    const alreadyExistsUser = await user.findOne({
      where: { email },
    });
    if (alreadyExistsUser) {
      return res
        .status(400)
        .json({ message: "User with email already exists!" });
    }
    const newUser = new user({
      nom_user,
      postnom_user,
      prenom_user,
      email,
      is_admin,
      password,
    });
    const savedUser = await newUser.save();
    if (savedUser) {
      return res.status(200).json({ message: "Thanks for registering" });
    } else {
      return res
        .status(500)
        .json({ error: "Cannot register user at the moment!" });
    }
  },
  deleteUser: async (req, res) => {
    const { id } = res;
    const userFind = await user.findOne({ where: { id } });
    if (!userFind) {
      return res.status(400).json({
        message: `Le personnel ayant l'identifiant ${id} est introuvable`,
      });
    }
    const userDelete = await user.destroy({
      where: {
        id,
      },
    });
    return res.status(200).json({
      message: `${userFind.dataValues.nom_user} ${userFind.dataValues.postnom_user} est suprimé avec succès`,
    });
  },
};