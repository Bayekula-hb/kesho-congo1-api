const {
  patient,
  cause_malnutrition,
  famille,
  anthropometrique,
  consulter_par,
  user,
  sequelize,
} = require("../models");

const { QueryTypes } = require("sequelize");
module.exports = {
  getReporting: async (req, res) => {
    try {
      const result = await sequelize.transaction(async (t) => {
        const nbreGarcon = await patient.count("id", {
          where: { sexe_patient: "M" },
        });
        const nbreGarconAge0_2 = await sequelize.query(
            `
            select * form 
            patients
            where (Date.now()- date_naissance) <= 2
            `,
            { type: QueryTypes.SELECT }
          );
        res.status(200).json({ nbreGarcon, nbreGarconAge0_2 });
      });
    } catch (err) {
      res.status(500).json({ error: `${err}` });
    }
  },
};
