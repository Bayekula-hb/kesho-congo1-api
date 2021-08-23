const express = require("express");
const { registerPatient } = require("../../controllers/patient.controller");
const { body, validationResult } = require("express-validator");

const patientRegisterMiddleware = express();

patientRegisterMiddleware.use(
  [
    body("atcd_mas").notEmpty().withMessage("Cannot be empty"),
    body("nbre_chute").notEmpty().withMessage("Cannot be empty"),
    body("mas_fratie").notEmpty().withMessage("Cannot be empty"),
    body("terme_grossesse").notEmpty().withMessage("Cannot be empty"),
    body("sejour_neonat").notEmpty().withMessage("Cannot be empty"),
    body("eig").notEmpty().withMessage("Cannot be empty"),
    body("lieu_accouchement").notEmpty().withMessage("Cannot be empty"),
    body("asphyxie_perinatal").notEmpty().withMessage("Cannot be empty"),
    body("dpm").notEmpty().withMessage("Cannot be empty"),
    body("caliendrier_vaccinal").notEmpty().withMessage("Cannot be empty"),
    body("rang_fratrie").notEmpty().withMessage("Cannot be empty"),
    body("taille_fratrie").notEmpty().withMessage("Cannot be empty"),
    body("atcd_rougeole_fratrie").notEmpty().withMessage("Cannot be empty"),
    body("vaccination_rougeole").notEmpty().withMessage("Cannot be empty"),
    body("terrain_vih").notEmpty().withMessage("Cannot be empty"),
    body("tbc").notEmpty().withMessage("Cannot be empty"),
    body("atcd_du_tbc_dans_fratrie").notEmpty().withMessage("Cannot be empty"),
    body("hospitalisation_recente").notEmpty().withMessage("Cannot be empty"),
    body("diagnostique_hospitalisation").notEmpty().withMessage("Cannot be empty"),
    body("duree_prise_atb").notEmpty().withMessage("Cannot be empty"),
  ],
  async (req, res, next) => {
    // Cause malnutrition
    const {
      atcd_mas,
      nbre_chute,
      mas_fratie,
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
    } = req.body;

    // Table Parametres Anthropometriques
    const {
      peri_cranien,
      peri_brachail,
      poids,
      taille,
      type_malnutrition,
      date_examen,
      id_patient,
    } = req.body;

    // Table Patient
    const {
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
      id_cause_malnutrition,
      id_famille,
    } = req.body;

    // add table famille

    const {
      taille_famille,
      vivre_deux_parent,
      mere_enceinte,
      mere_en_vie,
      pere_en_vie,
      profession_mere,
      profession_chef_menage,
      age_mere,
      scolarite_mere,
      contraception_mere,
      contraception_moyens,
      niveau_socioeconomique,
      statut_marital,
      nbr_femme_pere,
      tribu,
      religion,
      posseder_radio_tele,
      nbr_repas,
      consommation_poisson,
      atb,
      liste_atb,
      tbc_chez_parents,
      tbc_chez,
      tbc_gueris,
      duree_traitement_tbc,
      tbc_declarer_finie,
      nom_tuteur,
    } = req.body;
    const errors = validationResult(req);
    // erreur pour voir si le champs est vide
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
);

patientRegisterMiddleware.use("/", registerPatient)

module.exports = patientRegisterMiddleware;