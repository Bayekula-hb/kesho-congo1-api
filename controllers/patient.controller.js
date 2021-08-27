const {
  patient,
  cause_malnutrition,
  famille,
  anthropometrique,
  consulter_par,
} = require("../models");

module.exports = {
  registerPatient: async (req, res, next) => {
    const {
      atcd_mas,
      nbre_chute,
      terme_grossesse,
      sejour_neonat,
      eig,
      lieu_accouchement,
      asphyxie_perinatal,
      dpm,
      calendrier_vaccinal,
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
      peri_brachail,
      poids,
      taille,
      type_malnutrition,
      nom_patient,
      postnom_patient,
      prenom_patient,
      sexe_patient,
      age_patient,
      provenance_patient,
      adresse_patient,
      mode_arrive,
      taille_menage,
      poids_naissance,
      fin_allaitement,
      mois_fin_allaitement,
      diversification_aliment,
      telephone,
      type_status_marital,
      status_marital,
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
      id_user,
      mas_fratrie,
      cause_dpm,
      vaccin_non_recu,
      produit_plante,
      duree_produit_plante,
      date_naissance_patient,
    } = req.body;

    //Famille refactor insert
    const newFamille = new famille({
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
      type_status_marital,
      status_marital,
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
    });
    const savedFamille = await newFamille.save();
    console.log("savedFamille.id : ", savedFamille.id);
    // if (!savedFamille) {
    //   return res.status(500).json({ error: "Cannot register famille" });
    // }
    const id_famille = savedFamille.dataValues.id;

    //Cause_malnutrition
    const newCause_malnutrition = new cause_malnutrition({
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
    });
    const savedCause_malnutrition = await newCause_malnutrition.save();
    if (!savedCause_malnutrition) {
      return res
        .status(500)
        .json({ error: "Cannot register cause malnutrition" });
    }
    const id_cause_malnutrition = savedCause_malnutrition.dataValues.id;

    //Patient
    const newPatient = new patient({
      nom_patient,
      postnom_patient,
      prenom_patient,
      sexe_patient,
      age_patient,
      provenance_patient,
      adresse_patient,
      mode_arrive,
      poids_naissance,
      fin_allaitement,
      mois_fin_allaitement,
      diversification_aliment,
      telephone,
      id_cause_malnutrition,
      id_famille,
      date_naissance_patient,
    });
    const savedPatient = await newPatient.save();
    console.log(savedPatient.id);

    const ConsulterPar = await consulter_par.create({
      id_patient: savedPatient.id,
      id_user: id_user,
    });
    console.log("consulter par : ", ConsulterPar.id);
    // if (!savedPatient) {
    //   return res.status(500).json({ error: "Cannot register patient" });
    // }
    // let id_patient = savedPatient.dataValues.id;
    // console.log(savedPatient);
    // const id = id_patient;
    // const date_examen = Date.now();
    // const date_consultation = Date.now();

    // const currentPatientInsert = await patient.findOne({
    //   where: { id },
    //   attributes: ["id", "nom_patient", "postnom_patient", "prenom_patient"],
    // });
    // if (!currentPatientInsert) {
    //   return res
    //     .status(500)
    //     .json({ message: "Erreur le patient n'existe pas " });
    // }
    // id_patient = currentPatientInsert.id;
    // const newConsulter_par = new consulter_par({
    //   id_user,
    //   id_patient:id_patient,
    //   date_consultation,
    // });
    //   const savedConsulter_par = await newConsulter_par.save();
    //   if (!savedConsulter_par) {
    //     return res.status(5500).json({ error: "Cannot register consultation" });
    //   }
    //   const newAnthropometrique = new anthropometrique({
    //     peri_cranien,
    //     peri_brachail,
    //     poids,
    //     taille,
    //     type_malnutrition,
    //     date_examen,
    //     id_patient: id_patient,
    //   });
    //   const savedAnthropometrique = await newAnthropometrique.save();
    //   if (!savedAnthropometrique) {
    //     return res
    //       .status(5500)
    //       .json({ error: "Cannot register anthropometrique" });
    //   }

    //   return res
    //     .status(200)
    //     .json({ message: "Enregistrement effectuer avec succès" });
  },
};
