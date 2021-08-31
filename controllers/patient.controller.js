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
const { compareSync } = require("bcrypt");

module.exports = {
  registerPatient: async (req, res, next) => {
    const {
      atcd_mas,
      nbre_chute,
      mas_fratie,
      date_naissance_tuteur,
      terme_grossesse,
      sejour_neonat,
      eig,
      lieu_accouchement,
      asphyxie_perinatal,
      dpm,
      caliendrier_vaccinal,
      rang_fratrie,
      taille_fratrie,
      atcd_rougeole_fratrie,
      vaccination_rougeole,
      terrain_vih,
      tbc,
      atcd_du_tbc_dans_fratrie,
      hospitalisation_recente,
      diagnostique_hospitalisation,
      cocktail_atb,
      duree_prise_atb,
      peri_cranien,
      peri_brachial,
      poids,
      taille,
      type_malnutrition,
      date_examen,
      type_contraception,
      contraception_naturelle,
      nom_patient,
      postnom_patient,
      prenom_patient,
      sexe_patient,
      age_patient,
      provenance_patient,
      mode_arrive,
      poids_naissance,
      fin_allaitement,
      mois_fin_allaitement,
      diversification_aliment,
      telephone,
      taille_famille,
      vivre_deux_parents,
      mere_enceinte,
      mere_en_vie,
      pere_en_vie,
      profession_mere,
      profession_chef_menage,
      age_mere,
      scolarite_mere,
      contraception_mere,
      contraception_moderne,
      niveau_socioeconomique,
      statut_marital,
      nbr_femme_pere,
      tribu,
      religion,
      posseder_radio_tele,
      nbre_repas,
      consommation_poisson,
      atb,
      liste_atb,
      tbc_parents,
      tbc_chez,
      tbc_gueris,
      duree_traitement_tbc,
      tbc_declarer_finie,
      type_statut_marital,
      nom_tuteur,
      nbre_femme_pere,
      taille_menage,
      adresse_patient,
      date_naissance_patient,
      mas_fratrie,
      cause_dpm,
      calendrier_vaccinal,
      vaccin_non_recu,
      produit_plante,
      duree_produit_plante,
      id_user,
      image_patient,
      traitement_nutri,
      constitution_aliment,
      age_fin_allaitement,
      allaitement_6mois,
    } = req.body;

    //Famille refactor insert
    const newFamille = await famille.create({
      taille_famille,
      vivre_deux_parents,
      mere_enceinte,
      mere_en_vie,
      pere_en_vie,
      profession_mere,
      profession_chef_menage,
      age_mere,
      scolarite_mere,
      type_contraception,
      contraception_mere,
      contraception_naturelle,
      contraception_moderne,
      niveau_socioeconomique,
      type_statut_marital,
      statut_marital,
      nbre_femme_pere,
      tribu,
      religion,
      posseder_radio_tele,
      nbre_repas,
      consommation_poisson,
      atb,
      liste_atb,
      tbc_parents,
      tbc_chez,
      tbc_gueris,
      duree_traitement_tbc,
      tbc_declarer_finie,
      nom_tuteur,
      taille_menage,
      date_naissance_tuteur,
    });
    const id_famille = await newFamille.id;

    //Patient
    const newPatient = await patient.create({
      nom_patient,
      postnom_patient,
      prenom_patient,
      sexe_patient,
      age_patient,
      provenance_patient,
      image_patient,
      adresse_patient,
      mode_arrive,
      poids_naissance,
      telephone,
      familleId: id_famille,
      date_naissance_patient,
    });
    const patientId = newPatient.id;

    //Cause_malnutrition
    const newCause_malnutrition = await cause_malnutrition.create({
      atcd_mas,
      nbre_chute,
      terme_grossesse,
      sejour_neonat,
      eig,
      lieu_accouchement,
      asphyxie_perinatal,
      dpm,
      rang_fratrie,
      taille_fratrie,
      atcd_rougeole_fratrie,
      vaccination_rougeole,
      terrain_vih,
      tbc,
      atcd_du_tbc_dans_fratrie,
      hospitalisation_recente,
      diagnostique_hospitalisation,
      cocktail_atb,
      duree_prise_atb,
      mas_fratrie,
      cause_dpm,
      calendrier_vaccinal,
      vaccin_non_recu,
      produit_plante,
      duree_produit_plante,
      patientId,
      fin_allaitement,
      mois_fin_allaitement,
      traitement_nutri,
      diversification_aliment,
      constitution_aliment,
      age_fin_allaitement,
      allaitement_6mois,
    });

    const newAnthropometrique = await anthropometrique.create({
      peri_cranien,
      peri_brachial,
      poids,
      taille,
      type_malnutrition,
      date_examen,
      patientId,
    });

    const findUser = await user.findOne({ where: { id: id_user } });
    if (findUser) {
      const ConsulterPar = await consulter_par.create({
        patientId,
        userId: id_user,
      });
      return res
        .status(200)
        .json({ message: "Enregistrement effectuer avec succès" });
    } else {
      res.status(400).json({ errpr: "L'utilisateur non trouvé" });
    }
  },

  getPatient: async (req, res) => {
    const { patientId } = res;
    const Patient = await patient.findOne({
      where: { id: patientId },
      attributes: [
        "id",
        "nom_patient",
        "postnom_patient",
        "prenom_patient",
        "sexe_patient",
        "date_naissance_patient",
        "adresse_patient",
        "provenance_patient",
        "mode_arrive",
        "telephone",
        "familleId",
      ],
    });
    if (!Patient) {
      res
        .status(400)
        .json({ error: `Le patient ayant l'identifiant ${patientId} pas` });
    } else {
      const id_famillePatient = Patient.familleId;
      const Anthropometrique = await anthropometrique.findAll({
        where: { patientId },
        order: [["id", "DESC"]],
        limit: 3,
        attributes: [
          "peri_cranien",
          "peri_brachial",
          "poids",
          "taille",
          "type_malnutrition",
          "date_examen",
        ],
      });
      const Famille = await famille.findOne({
        where: { id: id_famillePatient },
        attributes: ["nom_tuteur"],
      });
      const consultant = await consulter_par.findOne({
        where: { patientId },
        order: [["id", "DESC"]],
        limit: 1,
      });
      const date_consultation = await consultant.createdAt;
      const { userId } = await consultant;
      const name_consultant = await user.findOne({
        where: { id: userId },
        attributes: ["nom_user", "postnom_user", "prenom_user"],
      });
      res.status(200).json({
        Patient,
        Anthropometrique,
        Famille,
        name_consultant,
        date_consultation,
      });
    }
  },
  getAllPatient: async (req, res) => {
    // const patients = await patient.findAll({
    //   attributes: [
    //     "id",
    //     "nom_patient",
    //     "postnom_patient",
    //     "prenom_patient",
    //     "sexe_patient",
    //     "date_naissance_patient",
    //     "adresse_patient",
    //     "provenance_patient",
    //     "telephone",
    //   ],
    // });
    // const consultant = await consulter_par.findAll({
    //   // where: { patientId:patients.id },
    //   // order: [["id", "DESC"]],
    //   group:["consulter_par.patientId"]
    //   // limit: 1,
    // });

    // const patients = await sequelize.query(
    //   "SELECT patients.id, nom_patient, prenom_patient, date_naissance_patient, sexe_patient, type_malnutrition, userId, date_examen, nom_user, postnom_user FROM ((patients INNER JOIN consulter_pars on patients.id = patientId) INNER JOIN anthropometriques on patients.id = anthropometriques.patientId INNER JOIN users on consulter_pars.userId = users.id) ",
    //   {
    //     type: QueryTypes.SELECT,
    //   }
    // );
    const Patients = await sequelize.query(
      `select C2.patientId, nom_patient, postnom_patient, date_naissance_patient, C2.date_consultation, type_malnutrition,nom_user as nom_consultant, postnom_user  as postnom_consultant  from consulter_pars as C 
      inner join (
      select id, userId, patientId, max(createdAt) as date_consultation
      from consulter_pars 
      group by patientId) as C2
      on C.patientId = C2.patientId and C.createdAt = C2.date_consultation
      inner join patients
      on C2.patientId = patients.id
      inner join familles
      on patients.familleId = familles.id
      inner join users
      on C2.userId = users.id
      inner join anthropometriques
      on C2.patientId = anthropometriques.id`,
      {type : QueryTypes.SELECT,})
    if (Patients) {
      res.status(200).json({ Patients });
    } else {
      res.status(500).json({ error: "service non disponible" });
    }
  },

  deletePatient: async (req, res) => {
    const { id } = res;
    const patientFind = await patient.findOne({ where: { id } });
    if (!patientFind) {
      res.status(400).json({
        error: `Le patient ayant l'identifiant ${id} est introuvable`,
      });
    }
    const patientDelete = await patient.destroy({ where: { id } });
    if (patientDelete) {
      res
        .status(200)
        .json({
          message: `Le patient ${patient.dataValues.prenom_patient} ${patient.dataValues.nom_patient} a été supprimé`,
        });
    }
  },
};
