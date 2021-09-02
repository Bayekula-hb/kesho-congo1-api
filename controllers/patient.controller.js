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
    try {
      const {
        atcd_mas,
        nbre_chute,
        date_naissance_tuteur,
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
    } catch (error) {
      res.status(400).json({ error: ` ${error}` });
    }
  },
  getPatient: async (req, res) => {
    try {
      const result = await sequelize.transaction(async (t) => {
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
          res.status(400).json({
            error: `Le patient ayant l'identifiant ${patientId} est introuvable`,
          });
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
      });
    } catch (error) {
      res.status(400).json({ error: `${error}` });
    }
  },
  updatePatient: async (req, res) => {
    if (req.user.is_admin === true) {
      const id = res.id;
      const patientFind = await patient.findOne({ where: { id } });
      try {
        const result = await sequelize.transaction(async (t) => {
          const {
            atcd_mas,
            nbre_chute,
            date_naissance_tuteur,
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
            type_contraception,
            contraception_naturelle,
            contraception_mere,
            contraception_moderne,
            niveau_socioeconomique,
            statut_marital,
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
          } = req.body;
          if (patientFind) {
            const familleId = await patientFind.familleId;
            const cause_malnutritionId = await cause_malnutrition.findOne({
              where: {
                patientId: id,
              },
              attributes: ["id"],
            });
            
            await patient.update(
              {
                nom_patient,
                postnom_patient,
                prenom_patient,
                sexe_patient,
                age_patient,
                provenance_patient,
                mode_arrive,
                poids_naissance,
                fin_allaitement,
                adresse_patient,
                date_naissance_patient,
                mois_fin_allaitement,
                diversification_aliment,
                telephone,
              },
              {
                where: {
                  id,
                },
              }
            );
            await famille.update(
              {
                type_statut_marital,
                tbc_parents,
                taille_menage,
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
                contraception_naturelle,
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
                tbc_chez,
                tbc_gueris,
                duree_traitement_tbc,
                tbc_declarer_finie,
                nom_tuteur,
                date_naissance_tuteur,
              },
              {
                where: {
                  id: familleId,
                },
              }
            );

            await cause_malnutrition.update(
              {
                atcd_mas,
                nbre_chute,
                mas_fratrie,
                terme_grossesse,
                sejour_neonat,
                eig,
                lieu_accouchement,
                asphyxie_perinatal,
                cause_dpm,
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
                mas_fratrie,
              },
              { where: { id: cause_malnutritionId.id } }
            );

            return res.status(200).json({
              message: `Mise à jour effectuée avec succès`,
            });
          } else {
            return res.status(400).json({
              message: `Le personnel ayant l'identifiant ${id} est introuvable`,
            });
          }
        });
      } catch (error) {
        return res.status(500).json({
          message: `Impossible de mettre à jour ce patient ${patientFind.nom_user} ${patientFind.postnom_user} ${error}`,
        });
      }
    } else {
      return res
      .status(400)
      .send("Access denied. You are an admin you can't update a user.");
    }
  },
  getAllPatient: async (req, res) => {
    try {
      const result = await sequelize.transaction(async (t) => {
        const Patients = await sequelize.query(
          `select Pa.id, nom_patient, postnom_patient, Anthr.type_malnutrition, Date_Consultation, nom_user as nom_consultant, postnom_user as postnom_consultant  from
          patients as Pa
          inner join (
            SELECT id, patientId, type_malnutrition, createdAt as Date_Consultation
            FROM anthropometriques
            WHERE createdAt IN (
              SELECT MAX(createdAt)
              FROM anthropometriques
              GROUP BY patientId
            )
          ) as Anthr
          on Anthr.patientId = Pa.id
          inner join (
          SELECT id, patientId, userId
          FROM consulter_pars
          WHERE createdAt IN (
              SELECT MAX(createdAt)
              FROM consulter_pars
              GROUP BY patientId
          )
          ) as Cons
          on Anthr.patientId = Cons.patientId 
          inner join users
          on Cons.userId = users.id`,
          { type: QueryTypes.SELECT }
        );
        res.status(200).json({ Patients });
      });
    } catch (error) {
      res.status(500).json({ error: `${error}` });
    }
  },
  deletePatient: async (req, res) => {
    try {
      const result = await sequelize.transaction(async (t) => {
        const { id } = res;
        const patientFind = await patient.findOne({ where: { id } });
        if (patientFind) {
          patientFind.destroy();
          res.status(200).json({
            message: `Le patient  a été supprimé`,
          });
        }
        res.status(400).json({
          error: `Le patient ayant l'identifiant ${id} est introuvable`,
        });
      });
    } catch (error) {
      res.status(400).json({
        error: `${error}`,
      });
    }
  },
};
