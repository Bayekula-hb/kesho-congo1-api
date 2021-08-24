const { user } = require("../models");

module.exports = {
  getAllUser: async (req, res) => {
    const userFindAll = await user.findAll({
      attributes: [
        "id",
        "nom_user",
        "postnom_user",
        "prenom_user",
        "email",
        "statut",
        "image_user",
      ],
    });
    return res.status(200).json(userFindAll);
  },
  getUserById: async (req, res) => {
    const { id } = res;
    const userOne = await user.findOne({
      where: { id },
      attributes: [
        "id",
        "nom_user",
        "postnom_user",
        "prenom_user",
        "email",
        "statut",
        "image_user",
      ],
    });
    if (userOne) {
      return res.status(200).json(userOne);
    }else{
      return res.status(400).json({
        message: `Le personnel ayant l'identifiant ${id} est introuvable`,
      });
    }
  },
  registerUser: async (req, res) => {
    const {
      email,
      password,
      nom_user,
      postnom_user,
      prenom_user,
      is_admin,
      image_user,
      statut,
    } = res;

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
      image_user,
      statut,
    });
    const savedUser = await newUser.save();
    // console.log(savedUser.dataValues.id);
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
  updateUser: async (req, res) => {
    const { id, nom_user, postnom_user, prenom_user, password } = res;

    const userFind = await user.findOne({ where: { id } });
    if (!userFind) {
      return res.status(400).json({
        message: `Le personnel ayant l'identifiant ${id} est introuvable`,
      });
    }
    const userUpdate = await user.update(
      { nom_user, postnom_user, prenom_user, password },
      {
        where: {
          id,
        },
      }
    );
    console.log(userUpdate);
    if (!userUpdate) {
      return res.status(400).json({
        message: `Impossible de mettre à jour ce personnel ${userFind.dataValues.nom_user} ${userFind.dataValues.postnom_user}`,
      });
    }
    return res.status(200).json({
      message: `Mise à jour effectuée avec succès`,
    });
  },
};
