const {
  patient,
  cause_malnutrition,
  famille,
  anthropometriques,
  consulter_par,
  user,
  sequelize,
} = require("../models");

const { QueryTypes, Op, where } = require("sequelize");
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
          select  count(id_patient) as NbreGarconAdulte from (
            select id_patient, sexe_patient, datediff(now(), date_naissance_patient)/365 as age
              from patients)
              as pa_age
              where  age > 17 and sexe_patient="M" ;
          `,
          { type: QueryTypes.SELECT }
        );
        const NbreFilleAdulte = await sequelize.query(
          `
          select  count(id_patient) as NbreFilleAdulte from (
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
          select  count(id_patient) as Moins3Ans from (
            select id_patient, datediff(now(), date_naissance_patient)/365 as age
              from patients)
              as pa_age
              where age <= 2 ;
          `,
          { type: QueryTypes.SELECT }
        );
        const NbreFilleMoins3Ans = await sequelize.query(
          `
          select  count(id_patient) as NbreFilleMoins3Ans from (
            select id_patient, sexe_patient, datediff(now(), date_naissance_patient)/365 as age
              from patients)
              as pa_age
              where age <= 2  and sexe_patient="F" ;
          `,
          { type: QueryTypes.SELECT }
        );
        const NbreGarconMoins3Ans = await sequelize.query(
          `
          select  count(id_patient) as NbreGarconMoins3Ans from (
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
          select  count(id_patient) as Nbre_3_5Ans from (
            select id_patient, datediff(now(), date_naissance_patient)/365 as age
              from patients)
              as pa_age
              where age > 2 and age <= 5 ;
          `,
          { type: QueryTypes.SELECT }
        );
        const NbreGarcon3_5Ans = await sequelize.query(
          `
          select  count(id_patient) as NbreGarcon3_5Ans from (
            select id_patient, sexe_patient, datediff(now(), date_naissance_patient)/365 as age
              from patients)
              as pa_age
              where  (age > 2 and age <= 5) and sexe_patient="M" ;
          `,
          { type: QueryTypes.SELECT }
        );
        const NbreFille3_5Ans = await sequelize.query(
          `
          select  count(id_patient) as NbreFille3_5Ans from (
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
          select  count(id_patient) as Nbre_6_12Ans from (
            select id_patient, datediff(now(), date_naissance_patient)/365 as age
              from patients)
              as pa_age
              where age > 5 and age <= 12 ;
          `,
          { type: QueryTypes.SELECT }
        );
        const NbreGarcon6_12Ans = await sequelize.query(
          `
          select  count(id_patient) as NbreGarcon6_12Ans from (
            select id_patient, sexe_patient, datediff(now(), date_naissance_patient)/365 as age
              from patients)
              as pa_age
              where  (age > 5 and age <= 12) and sexe_patient="M" ;
          `,
          { type: QueryTypes.SELECT }
        );
        const NbreFille6_12Ans = await sequelize.query(
          `
          select  count(id_patient) as NbreFille6_12Ans from (
            select id_patient, sexe_patient, datediff(now(), date_naissance_patient)/365 as age
              from patients)
              as pa_age
              where  (age > 5 and age <= 12) and sexe_patient="F" ;
          `,
          { type: QueryTypes.SELECT }
        );
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
          include: [
            {
              model: patient,
              where: {
                sexe_patient: "F",
              },
            },
          ],
        });
        const NbreGarconToday = await consulter_par.count({
          where: {
            createdAt: {
              [Op.lt]: new Date(),
              [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000),
            },
          },
          include: [
            {
              model: patient,
              where: {
                sexe_patient: "M",
              },
            },
          ],
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
          include: [
            {
              model: patient,
              where: {
                sexe_patient: "M",
              },
            },
          ],
        });

        const NbreFilleYesterday = await consulter_par.count({
          where: {
            createdAt: {
              [Op.gt]: new Date(new Date() - 45 * 60.482 * 60 * 1000),
              [Op.lt]: new Date(new Date() - 21 * 60 * 60 * 1005.8),
            },
          },
          include: [
            {
              model: patient,
              where: {
                sexe_patient: "F",
              },
            },
          ],
        });

        // Type de malnutrition

       
        const sereve_nombre =  await sequelize.query(
          `select count(Pa.id_patient) as nombre_patient_chronique from
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
          where Anthr.type_malnutrition = "severe"
          ORDER BY Pa.id DESC`,
          { type: QueryTypes.SELECT }
        );
        const sereve_nombre_fille =  await sequelize.query(
          `select count(Pa.id_patient) as sereve_nombre_fille from
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
          where Anthr.type_malnutrition = "severe" and Pa.sexe_patient = "F"
          ORDER BY Pa.id DESC`,
          { type: QueryTypes.SELECT }
        );
        const sereve_nombre_garcon =  await sequelize.query(
          `select count(Pa.id_patient) as sereve_nombre_garcon from
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
          where Anthr.type_malnutrition = "severe" and Pa.sexe_patient = "M"
          ORDER BY Pa.id DESC`,
          { type: QueryTypes.SELECT }
        );

        const chronique_nombre =  await sequelize.query(
          `select count(Pa.id_patient) as nombre_patient_chronique from
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
          where Anthr.type_malnutrition = "chronique"
          ORDER BY Pa.id DESC`,
          { type: QueryTypes.SELECT }
        );
        const chronique_nombre_fille =  await sequelize.query(
          `select count(Pa.id_patient) as sereve_nombre_fille from
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
          where Anthr.type_malnutrition = "chronique" and Pa.sexe_patient = "F"
          ORDER BY Pa.id DESC`,
          { type: QueryTypes.SELECT }
        );
        const chronique_nombre_garcon =  await sequelize.query(
          `select count(Pa.id_patient) as sereve_nombre_garcon from
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
          where Anthr.type_malnutrition = "chronique" and Pa.sexe_patient = "M"
          ORDER BY Pa.id DESC`,
          { type: QueryTypes.SELECT }
        );
        res.status(200).json({
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
          sereve_nombre,
          sereve_nombre_fille,
          sereve_nombre_garcon,
          chronique_nombre,
          chronique_nombre_fille,
          chronique_nombre_garcon,
        });
      });
    } catch (err) {
      res.status(500).json({ error: `${err}` });
    }
  },
};
