const { user, sequelize } = require("../models");
const { compare } = require("bcrypt");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
const getAllUser = async (req, res) => {
  try {
    if (req.user.is_admin !== true)
      return res.status(401).send("Access denied. You are not an admin.");

    const userFindAll = await user.findAll({
      attributes: [
        "id_user",
        "nom_user",
        "postnom_user",
        "prenom_user",
        "email",
        "sexe_user",
        "is_admin",
        "statut",
      ],
    });
    return res.status(200).send(userFindAll);
  } catch (error) {
    return res.status(400).send(error);
  }
};
const getUserById = async (req, res) => {
  const { id_user } = res;
  const userOne = await user.findOne({
    where: { id_user },
    attributes: [
      "id_user",
      "nom_user",
      "postnom_user",
      "prenom_user",
      "email",
      "statut",
      "sexe_user",
      "is_admin",
    ],
  });
  if (userOne) {
    return res.status(200).json(userOne);
  } else {
    return res.status(401).json({
      message: `Le personnel ayant l'identifiant ${id_user} est introuvable`,
    });
  }
};
const addUser = async (req, res) => {
  if (req.user.is_admin == true) {
    try {
      const alreadyExistsUser = await user.findOne({
        where: { email: req.body.email },
      });
      if (!alreadyExistsUser) {
        const userCreate = await user.create(res);
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
  } else {
    return res.status(400).send("Access denied. You are not an admin.");
  }
};
const deleteUser = async (req, res) => {
  if (req.user.is_admin !== true)
    return res.status(400).send("Access denied. You are not an admin.");
  try {
    const result = await sequelize.transaction(async (t) => {
      const { id_user } = res;
      const userFind = await user.findOne({ where: { id_user } });

      if (userFind) {
        const userDelete = await user.destroy({
          where: {
            id_user,
          },
          force: true,
        });
        return res.status(200).json({
          message: `${userFind.dataValues.nom_user} ${userFind.dataValues.postnom_user} est supprimé avec succès`,
        });
      } else {
        return res.status(400).json({
          message: `Le personnel ayant l'identifiant ${id_user} est introuvable`,
        });
      }
    });
  } catch (error) {
    return res.status(400).json({
      error: `${error}`,
    });
  }
};
const updateUser = async (req, res) => {
  if (req.user.id_user !== res.id_user) {
    return res.status(400).send("Access denied. Can't update another user.");
  }
  const verifyPassword = await compare(res.old_password, req.user.password);
  if (!verifyPassword) {
    return res.status(400).send("password not correct");
  }

  try {
    const result = await sequelize.transaction(async (t) => {
      const { id_user, nom_user, postnom_user, prenom_user, password } = res;
      const userFind = await user.findOne({ where: { id_user } });
      if (userFind) {
        const userUpdate = await user.update(
          { nom_user, postnom_user, prenom_user, password },
          {
            where: {
              id_user,
            },
          }
        );
        return res.status(200).json({
          message: `Mise à jour effectuée avec succès ${userUpdate}`,
        });
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
};
const resetPassword = async (req, res) => {
  const { email } = req.body;
  const userFind = await user.findOne({ where: { email } });
  if (userFind) {
    const from = '"Kesho Congo 👻"';
    const to = userFind.email;
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        //mail de l'entreprise
        user: process.env.MAILNAME, // ton mail
        pass: process.env.PASSMAIL, // ton mot de passe
      },
    });

    const password_generate = randomstring.generate(5);
    if (req.user.email !== to) {
      return res.status(400).json({
        message: "Votre adresse email n'est pas valide",
      });
    } else {
      const info = await transporter.sendMail({
        from: from, // sender address
        to: to, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello Jaco ?", // plain text body
        html: `Hello ${req.user.prenom_user} voici votre nouveau mot de passe : <b>${password_generate}</b>`, // html body
      });
      if (info) {
        try {
          const result = await sequelize.transaction(async (t) => {
            const password = password_generate;
            if (userFind) {
              const userUpdate = await user.update(
                { nom_user, postnom_user, prenom_user, password },
                {
                  where: {
                    id_user,
                  },
                }
              );
              return res.status(200).json({
                message: `Mise à jour effectuée avec succès ${userUpdate}`,
              });
            } else {
              return res.status(400).json({
                message: `Le personnel ayant l'identifiant ${id} est introuvable`,
              });
            }
          });
        } catch (error) {}
        console.log("Message sent: %s", info.messageId);

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      }
    }
  } else {
    res.status(400).json({ error: `${email} ce compte n'existe pas` });
  }
};

module.exports = {
  getAllUser,
  getUserById,
  addUser,
  deleteUser,
  updateUser,
  resetPassword,
};
