const express = require("express");
const { addPatient } = require("../../controllers/patient.controller");
const { body, validationResult } = require("express-validator");

const patientRegisterMiddleware = express();

patientRegisterMiddleware.use(
  [
    body("atcd_mas").notEmpty().withMessage("Cannot be empty"),
    body("nbre_chute").notEmpty().withMessage("Cannot be empty"),
    body("cause_dpm").notEmpty().withMessage("Cannot be empty"),
    body("terme_grossesse").notEmpty().withMessage("Cannot be empty"),
    body("sejour_neonat").notEmpty().withMessage("Cannot be empty"),
    body("eig").notEmpty().withMessage("Cannot be empty"),
    body("lieu_accouchement").notEmpty().withMessage("Cannot be empty"),
    body("asphyxie_perinatal").notEmpty().withMessage("Cannot be empty"),
    body("dpm").notEmpty().withMessage("Cannot be empty"),
    body("produit_plante").notEmpty().withMessage("Cannot be empty"),
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
    body("peri_cranien").notEmpty().withMessage("Cannot be empty"),
    body("peri_brachial").notEmpty().withMessage("Cannot be empty"),
    body("poids").notEmpty().withMessage("Cannot be empty"),
    body("taille").notEmpty().withMessage("Cannot be empty"),
    body("type_malnutrition").notEmpty().withMessage("Cannot be empty"),
    body("type_statut_marital").notEmpty().withMessage("Cannot be empty"),
    body("statut_marital").notEmpty().withMessage("Cannot be empty"),
    body("nom_patient").notEmpty().withMessage("Cannot be empty"),
    body("postnom_patient").notEmpty().withMessage("Cannot be empty"),
    body("prenom_patient").notEmpty().withMessage("Cannot be empty"),
    body("sexe_patient").notEmpty().withMessage("Cannot be empty"),
    body("age_patient").notEmpty().withMessage("Cannot be empty"),
    body("provenance_patient").notEmpty().withMessage("Cannot be empty"),
    body("poids_naissance").notEmpty().withMessage("Cannot be empty"),
    body("fin_allaitement").notEmpty().withMessage("Cannot be empty"),
    body("mois_fin_allaitement").notEmpty().withMessage("Cannot be empty"),
    body("diversification_aliment").notEmpty().withMessage("Cannot be empty"),
    body("telephone").notEmpty().withMessage("Cannot be empty"),
    body("image_patient").notEmpty().withMessage("Cannot be empty"),
    body("contraception_naturelle").notEmpty().withMessage("Cannot be empty"),
    body("adresse_patient").notEmpty().withMessage("Cannot be empty"),
    body("type_contraception").notEmpty().withMessage("Cannot be empty").matches(/\D/).withMessage("pas de chiffres"),
    body("vivre_deux_parents").notEmpty().withMessage("Cannot be empty"),
    body("mere_enceinte").notEmpty().withMessage("Cannot be empty"),
    body("mere_en_vie").notEmpty().withMessage("Cannot be empty"),
    body("pere_en_vie").notEmpty().withMessage("Cannot be empty"),
    body("profession_mere").notEmpty().withMessage("Cannot be empty"),
    body("profession_chef_menage").notEmpty().withMessage("Cannot be empty"),
    body("age_mere").notEmpty().withMessage("Cannot be empty"),
    body("scolarite_mere").notEmpty().withMessage("Cannot be empty"),
    body("contraception_mere").notEmpty().withMessage("Cannot be empty"),
    body("contraception_moderne").notEmpty().withMessage("Cannot be empty"),
    body("niveau_socioeconomique").notEmpty().withMessage("Cannot be empty"),
    body("statut_marital").notEmpty().withMessage("Cannot be empty"),
    body("nbre_femme_pere").notEmpty().withMessage("Cannot be empty"),
    body("tribu").notEmpty().withMessage("Cannot be empty"),
    body("religion").notEmpty().withMessage("Cannot be empty"),
    body("posseder_radio_tele").notEmpty().withMessage("Cannot be empty"),
    body("nbre_repas").notEmpty().withMessage("Cannot be empty"),
    body("consommation_poisson").notEmpty().withMessage("Cannot be empty"),
    body("atb").notEmpty().withMessage("Cannot be empty"),
    body("liste_atb").notEmpty().withMessage("Cannot be empty"),
    body("mas_fratrie").notEmpty().withMessage("Cannot be empty"),
    body("tbc_chez").notEmpty().withMessage("Cannot be empty"),
    body("tbc_gueris").notEmpty().withMessage("Cannot be empty"),
    body("duree_traitement_tbc").notEmpty().withMessage("Cannot be empty"),
    body("tbc_declarer_finie").notEmpty().withMessage("Cannot be empty"),
    body("nom_tuteur").notEmpty().withMessage("Cannot be empty"),
    body("taille_menage").notEmpty().withMessage("Cannot be empty"),
    body("tbc_parents").notEmpty().withMessage("Cannot be empty"),
    body("calendrier_vaccinal").notEmpty().withMessage("Cannot be empty"),
    body("vaccin_non_recu").notEmpty().withMessage("Cannot be empty"),
    body("duree_produit_plante").notEmpty().withMessage("Cannot be empty"),
    body("date_naissance_patient").notEmpty().withMessage("Cannot be empty"),
    body("date_naissance_tuteur").notEmpty().withMessage("Cannot be empty"),
    body("allaitement_6mois").notEmpty().withMessage("Cannot be empty"),
    body("age_fin_allaitement").notEmpty().withMessage("Cannot be empty"),
    body("traitement_nutri").notEmpty().withMessage("Cannot be empty"),
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
      cause_dpm,
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
      mas_fratrie,
    } = req.body;

    // Table Parametres Anthropometriques
    const {
      peri_cranien,
      peri_brachail,
      poids,
      taille,
      type_malnutrition,
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
      id_famille,
    } = req.body;

    // add table famille

    const {
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
      nbre_femme_pere,
      tribu,
      religion,
      posseder_radio_tele,
      nbre_repas,
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

patientRegisterMiddleware.use("/", addPatient)

module.exports = patientRegisterMiddleware;