const express = require("express");

const patientRegisterMiddleware = express();

patientRegisterMiddleware.use((req, res, next) => {
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
    atcd_rougeole_fratrie,
    vaccination_rougeole,
    terrain_vih,
    tbc,
    atcd_du_tbc_dans_fratrie,
    hospitalisation_recente,
    cocktail_atb,
    duree_prise_atb,
  } = req.body;

  const {
    peri_cranien,
    peri_brachail,
    poids,
    taille,
    type_malnutrition,
    date_examen,
    id_patient,
  } = req.body;

  const {nom_patient, postnom_patient, prenom_patient, sexe_patient, age_patient, provenance_patient, 
  mode_arrive, poids_naissance, fin_allaitement, mois_fin_allaitement, diversification_aliment, telephone, id_cause_malnutrition, id_famille} = req.body;

  // res.status(200).json({ message: "patient register" });
});

module.exports = patientRegisterMiddleware;