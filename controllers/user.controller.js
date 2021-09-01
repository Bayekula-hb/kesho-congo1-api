const { user, sequelize } = require("../models");

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
    } else {
      return res.status(400).json({
        message: `Le personnel ayant l'identifiant ${id} est introuvable`,
      });
    }
  },
  registerUser: async (req, res, next) => {
    const token = req.header("Authorization");
    console.log(token);
    console.log(req.user.is_admin);

    if (req.user.is_admin !== true)
      res.status(400).send("Access denied. You are not an admin.");
    try {
    
      const alreadyExistsUser = await user.findOne({ where: { email: req.body.email }});
      if (!alreadyExistsUser) {
        const userCreate = await user.create(req.body);
        return res.status(200).json({ message: "Thanks for registering" });
      } else {
        return res
          .status(400)
          .json({ message: "User with email already exists!" });
      }
    } catch (error) {
      return res
        .status(500)
        .json({ error: `Cannot register user at the moment! : ${error}` });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const result = await sequelize.transaction(async (t) => {
        const { id } = res;
        const userFind = await user.findOne({ where: { id } });

        if (userFind) {
          const userDelete = await user.destroy({
            where: {
              id,
            },
          });
          return res.status(200).json({
            message: `${userFind.dataValues.nom_user} ${userFind.dataValues.postnom_user} est suprimé avec succès`,
          });
        } else {
          return res.status(400).json({
            message: `Le personnel ayant l'identifiant ${id} est introuvable`,
          });
        }
      });
    } catch (error) {
      return res.status(400).json({
        error: `${error}`,
      });
    }
  },
  updateUser: async (req, res) => {
    try {
      const result = await sequelize.transaction(async (t) => {
        const { id, nom_user, postnom_user, prenom_user, password } = res;
        const userFind = await user.findOne({ where: { id } });
        if (userFind) {
          const userUpdate = await user.update(
            { nom_user, postnom_user, prenom_user, password },
            {
              where: {
                id,
              },
            }
          );
          return res.status(200).json({
            message: `Mise à jour effectuée avec succès`,
          });
          // if (!userUpdate) {
          //   return res.status(400).json({
          //     message: `Impossible de mettre à jour ce personnel ${userFind.dataValues.nom_user} ${userFind.dataValues.postnom_user}`,
          //   });
          // }
        } else {
          return res.status(400).json({
            message: `Le personnel ayant l'identifiant ${id} est introuvable`,
          });
        }
      });
    } catch (error) {
      return res.status(400).json({
        message: `Impossible de mettre à jour ce personnel ${userFind.dataValues.nom_user} ${userFind.dataValues.postnom_user} ${Error}`,
      });
    }
  },
};
