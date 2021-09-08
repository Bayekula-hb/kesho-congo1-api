const {
  patient,
  cause_malnutrition,
  famille,
  anthropometrique,
  consulter_par,
  user,
  sequelize,
} = require("../models");

const { QueryTypes , Op, where} = require("sequelize");
module.exports = {
  getReporting: async (req, res) => {
    try {
      const result = await sequelize.transaction(async (t) => {
        const totalPatient = await patient.count("id");
        const nbreFille = await patient.count({
          where: {
            sexe_patient: "F",
          },
        });
        const nbreGarcon = await patient.count({
          where: {
            sexe_patient: "M",
          },
        });
        // Adulte
        const Adulte = await sequelize.query(
          `
          select  count(id_patient) as nombre_adulte from (
            select id_patient, datediff(now(), date_naissance_patient)/365 as age
              from patients)
              as pa_age
              where age > 17 ;
          `,
          { type: QueryTypes.SELECT }
        );

        const NbreGarconAdulte = await sequelize.query(
          `
          select  count(id_patient) as nombre_enfant_mois_3ans from (
            select id_patient, sexe_patient, datediff(now(), date_naissance_patient)/365 as age
              from patients)
              as pa_age
              where  age > 17 and sexe_patient="M" ;
          `,
          { type: QueryTypes.SELECT }
        );
        const NbreFilleAdulte = await sequelize.query(
          `
          select  count(id_patient) as nombre_enfant_mois_3ans from (
            select id_patient, sexe_patient, datediff(now(), date_naissance_patient)/365 as age
              from patients)
              as pa_age
              where  age>17 and sexe_patient="F" ;
          `,
          { type: QueryTypes.SELECT }
        );

        //3 ans
        const Moins3Ans = await sequelize.query(
          `
          select  count(id_patient) as nombre_enfant_mois_3ans from (
            select id_patient, datediff(now(), date_naissance_patient)/365 as age
              from patients)
              as pa_age
              where age <= 2 ;
          `,
          { type: QueryTypes.SELECT }
        );
        const NbreFilleMoins3Ans = await sequelize.query(
          `
          select  count(id_patient) as nombre_enfant_mois_3ans from (
            select id_patient, sexe_patient, datediff(now(), date_naissance_patient)/365 as age
              from patients)
              as pa_age
              where age <= 2  and sexe_patient="F" ;
          `,
          { type: QueryTypes.SELECT }
        );
        const NbreGarconMoins3Ans = await sequelize.query(
          `
          select  count(id_patient) as nombre_enfant_mois_3ans from (
            select id_patient, sexe_patient, datediff(now(), date_naissance_patient)/365 as age
              from patients)
              as pa_age
              where age <= 2  and sexe_patient="M" ;
          `,
          { type: QueryTypes.SELECT }
        );

        //3 à 5 ans
        const Nbre_3_5Ans = await sequelize.query(
          `
          select  count(id_patient) as nombre_enfant_3_5ans from (
            select id_patient, datediff(now(), date_naissance_patient)/365 as age
              from patients)
              as pa_age
              where age > 2 and age <= 5 ;
          `,
          { type: QueryTypes.SELECT }
        );
        const NbreGarcon3_5Ans = await sequelize.query(
          `
          select  count(id_patient) as nombre_enfant_mois_3ans from (
            select id_patient, sexe_patient, datediff(now(), date_naissance_patient)/365 as age
              from patients)
              as pa_age
              where  (age > 2 and age <= 5) and sexe_patient="M" ;
          `,
          { type: QueryTypes.SELECT }
        );
        const NbreFille3_5Ans = await sequelize.query(
          `
          select  count(id_patient) as nombre_enfant_mois_3ans from (
            select id_patient, sexe_patient, datediff(now(), date_naissance_patient)/365 as age
              from patients)
              as pa_age
              where  (age > 2 and age <= 5) and sexe_patient="F" ;
          `,
          { type: QueryTypes.SELECT }
        );

        // 6 à 12 ans
        const Nbre_6_12Ans = await sequelize.query(
          `
          select  count(id_patient) as nombre__enfant_5_12ans from (
            select id_patient, datediff(now(), date_naissance_patient)/365 as age
              from patients)
              as pa_age
              where age > 5 and age <= 12 ;
          `,
          { type: QueryTypes.SELECT }
        );
        const NbreGarcon6_12Ans = await sequelize.query(
          `
          select  count(id_patient) as nombre_enfant_mois_3ans from (
            select id_patient, sexe_patient, datediff(now(), date_naissance_patient)/365 as age
              from patients)
              as pa_age
              where  (age > 5 and age <= 12) and sexe_patient="M" ;
          `,
          { type: QueryTypes.SELECT }
        );
        const NbreFille6_12Ans = await sequelize.query(
          `
          select  count(id_patient) as nombre_enfant_mois_3ans from (
            select id_patient, sexe_patient, datediff(now(), date_naissance_patient)/365 as age
              from patients)
              as pa_age
              where  (age > 5 and age <= 12) and sexe_patient="F" ;
          `,
          { type: QueryTypes.SELECT }
        );
        // const NbrePatientToday = await sequelize.query(
        //   `
        //   select  count(id) as nombre_patient_today from 
        //   consulter_pars
        //   where (createdAt >  (NOW() - INTERVAL 24 HOUR)) and (createdAt < NOW())
        //   `,
        //   { type: QueryTypes.SELECT }
        // );
        const NbrePatientToday = await consulter_par.count({
          where: {
            createdAt: {
              [Op.lt]: new Date(),
              [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000),
            },
          },
        });
        const NbreFilleToday = await consulter_par.count({
          where: {
            createdAt: {
              [Op.lt]: new Date(),
              [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000),
            },
          },
          include:[ {
            model:patient,
            where:{
              sexe_patient : "F"
            }
          }]
        });
        const NbreGarconToday = await consulter_par.count({
          where: {
            createdAt: {
              [Op.lt]: new Date(),
              [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000),
            },
          },
          include:[ {
            model:patient,
            where:{
              sexe_patient : "M"
            }
          }]
        });
        const NbrePatientYesterday = await consulter_par.count({
          where: {
            createdAt: {
              [Op.gt]: new Date(new Date() - 45 * 60.482 * 60 * 1000),
              [Op.lt]: new Date(new Date() - 21 * 60 * 60 * 1005.8),
            },
          },
        });
        const NbreGarconYesterday = await consulter_par.count({
          where: {
            createdAt: {
              [Op.gt]: new Date(new Date() - 45 * 60.482 * 60 * 1000),
              [Op.lt]: new Date(new Date() - 21 * 60 * 60 * 1005.8),
            },
          },
          include:[ {
            model:patient,
            where:{
              sexe_patient : "M"
            }
          }]
        });
        
        const NbreFilleYesterday = await consulter_par.count({
          where: {
            createdAt: {
              [Op.gt]: new Date(new Date() - 45 * 60.482 * 60 * 1000),
              [Op.lt]: new Date(new Date() - 21 * 60 * 60 * 1005.8),
            },
          },
          include:[ {
            model:patient,
            where:{
              sexe_patient : "F"
            }
          }]
        });
        res
          .status(200)
          .json({
            totalPatient,
            nbreGarcon,
            nbreFille,
            Adulte,
            NbreGarconAdulte,
            NbreFilleAdulte,
            Moins3Ans,
            NbreFilleMoins3Ans,
            NbreGarconMoins3Ans,
            Nbre_3_5Ans,
            NbreGarcon3_5Ans,
            NbreFille3_5Ans,
            Nbre_6_12Ans,
            NbreGarcon6_12Ans,
            NbreFille6_12Ans,
            NbrePatientToday,
            NbreFilleToday,
            NbreGarconToday,
            NbrePatientYesterday,
            NbreFilleYesterday,
            NbreGarconYesterday,
          });
      });
    } catch (err) {
      res.status(500).json({ error: `${err}` });
    }
  },
};
