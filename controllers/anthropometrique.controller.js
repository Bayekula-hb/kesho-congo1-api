const {
  patient,
  cause_malnutrition,
  famille,
  anthropometrique,
  consulter_par,
  user,
} = require("../models");

module.exports = {
  registerAnthropometrique: async (req, res) => {
    const {
      peri_cranien,
      peri_brachial,
      poids,
      taille,
      type_malnutrition,
      id_patient,
      date_examen,
      id_user,
    } = req.body;

    const findPatient = await patient.findOne({ where: { id: id_patient } });
    const findUser = await user.findOne({ where: { id: id_user } });

    if (findUser && findPatient) {
      await anthropometrique.create({
        peri_cranien,
        peri_brachial,
        poids,
        taille,
        type_malnutrition,
        date_examen,
        patientId: id_patient,
      });

      await consulter_par.create({
        patientId: id_patient,
        userId: id_user,
      });
      return res
        .status(200)
        .json({ message: "Enregistrement effectuer avec succès" });
    } else {
      res
        .status(400)
        .json({ error: "Le patient non trouvé ou l'utilisateur non trouvé" });
    }
  },
  getAnthropometriqueByIdPatient: async (req, res) => {
    const { patientId } = res;

    const findPatient = await patient.findOne({ where: { id: patientId } });
    if (!findPatient) {
      res.status(400).json({ error: "Le patient non trouvé" });
    } else {
      const anthropometriqueOnePatient = await anthropometrique.findAndCountAll(
        {
          where: { patientId },
          order: [["id", "DESC"]],
          limit: 3,
        }
      );
      
      const consultant = await consulter_par.findAll({
        where: { patientId },
        order: [["id", "DESC"]],
        limit: 3,
      });
      res.status(200).json({ anthropometriqueOnePatient, consultant });
    }
  },
}; 