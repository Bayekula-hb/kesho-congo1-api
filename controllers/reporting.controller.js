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
const getReporting = async (req, res) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const nombre_garcon = await sequelize.query(
        `
        select count(id_patient) as nombre_garcon
            from patients
            where sexe_patient="M" and MONTH(createdAt) = MONTH(now())  
            ;
        `,
        { type: QueryTypes.SELECT }
      );
      const nombre_fille = await sequelize.query(
        `
        select count(id_patient) as nombre_fille
            from patients
            where sexe_patient="F" and MONTH(createdAt) = MONTH(now())  
            ;
        `,
        { type: QueryTypes.SELECT }
      );

      const nombre_garcon_adulte = await sequelize.query(
        `
        select  count(id_patient) as nombre_garcon_adulte from (
          select id_patient, sexe_patient, createdAt, datediff(now(), date_naissance_patient)/365 as age
            from patients)
            as pa_age
            where  age > 17 and sexe_patient="M" and MONTH(createdAt) = MONTH(now())  
            ;
        `,
        { type: QueryTypes.SELECT }
      );
      const nombre_fille_adulte = await sequelize.query(
        `
        select  count(id_patient) as nombre_fille_adulte from (
          select id_patient, sexe_patient, createdAt, datediff(now(), date_naissance_patient)/365 as age
            from patients)
            as pa_age
            where  age>17 and sexe_patient="F" and MONTH(createdAt) = MONTH(now())  ;
        `,
        { type: QueryTypes.SELECT }
      );

      const nombre_fille_moins_3ans = await sequelize.query(
        `
        select  count(id_patient) as nombre_fille_moins_3ans from (
          select id_patient, sexe_patient, createdAt, datediff(now(), date_naissance_patient)/365 as age
            from patients)
            as pa_age
            where age <= 2  and sexe_patient="F" and MONTH(createdAt) = MONTH(now())  ;
        `,
        { type: QueryTypes.SELECT }
      );
      const nombre_garcon_moins_3ans = await sequelize.query(
        `
        select  count(id_patient) as nombre_garcon_moins_3ans from (
          select id_patient, sexe_patient, createdAt, datediff(now(), date_naissance_patient)/365 as age
            from patients)
            as pa_age
            where age <= 2  and sexe_patient="M" and MONTH(createdAt) = MONTH(now())   ;
        `,
        { type: QueryTypes.SELECT }
      );

      const nombre_garcon_3_5ans = await sequelize.query(
        `
        select  count(id_patient) as nombre_garcon_3_5ans from (
          select id_patient, sexe_patient, createdAt, datediff(now(), date_naissance_patient)/365 as age
            from patients)
            as pa_age
            where  (age > 2 and age <= 5) and sexe_patient="M" and MONTH(createdAt) = MONTH(now())  ;
        `,
        { type: QueryTypes.SELECT }
      );
      const nombre_fille_3_5ans = await sequelize.query(
        `
        select  count(id_patient) as nombre_fille_3_5ans from (
          select id_patient, sexe_patient, createdAt, datediff(now(), date_naissance_patient)/365 as age
            from patients)
            as pa_age
            where  (age > 2 and age <= 5) and sexe_patient="F" and MONTH(createdAt) = MONTH(now())  ;
        `,
        { type: QueryTypes.SELECT }
      );

      const nombre_garcon_6_12ans = await sequelize.query(
        `
        select  count(id_patient) as nombre_garcon_6_12ans from (
          select id_patient, sexe_patient, createdAt,datediff(now(), date_naissance_patient)/365 as age
            from patients)
            as pa_age
            where  (age > 5 and age <= 12) and sexe_patient="M" and MONTH(createdAt) = MONTH(now()) ;
        `,
        { type: QueryTypes.SELECT }
      );
      const nombre_fille_6_12ans = await sequelize.query(
        `
        select  count(id_patient) as nombre_fille_6_12ans from (
          select id_patient, sexe_patient, createdAt,datediff(now(), date_naissance_patient)/365 as age
            from patients)
            as pa_age
            where  (age > 5 and age <= 12) and sexe_patient="F" and MONTH(createdAt) = MONTH(now())  ;
        `,
        { type: QueryTypes.SELECT }
      );

      // const NbrePatientToday = await consulter_par.count({
      //   where: {
      //     createdAt: {
      //       [Op.lt]: new Date(),
      //       [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000),
      //     },
      //   },
      // });
      const nbre_fille_today = await consulter_par.count({
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
      const nbre_garcon_today = await consulter_par.count({
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
      // const NbrePatientYesterday = await consulter_par.count({
      //   where: {
      //     createdAt: {
      //       [Op.gt]: new Date(new Date() - 45 * 60.482 * 60 * 1000),
      //       [Op.lt]: new Date(new Date() - 21 * 60 * 60 * 1005.8),
      //     },
      //   },
      // });
      const nbre_garcon_yesterday = await consulter_par.count({
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
      const nbre_fille_yesterday = await consulter_par.count({
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
      // const sereve_nombre =  await sequelize.query(
      //   `select count(Pa.id_patient) as nombre_patient_chronique, createdAt from
      //   patients as Pa
      //   inner join (
      //     SELECT id, patientId, type_malnutrition, createdAt as Date_Consultation
      //     FROM anthropometriques
      //     WHERE createdAt IN (
      //       SELECT MAX(createdAt)
      //       FROM anthropometriques
      //       GROUP BY patientId
      //     )
      //   ) as Anthr
      //   on Anthr.patientId = Pa.id
      //   inner join (
      //   SELECT id, patientId, userId
      //   FROM consulter_pars
      //   WHERE createdAt IN (
      //       SELECT MAX(createdAt)
      //       FROM consulter_pars
      //       GROUP BY patientId
      //   )
      //   ) as Cons
      //   on Anthr.patientId = Cons.patientId
      //   where Anthr.type_malnutrition = "severe" and MONTH(Pa.createdAt) = MONTH(now())
      //   ORDER BY Pa.id DESC`,
      //   { type: QueryTypes.SELECT }
      // );
      const sereve_nombre_fille = await sequelize.query(
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
        where Anthr.type_malnutrition = "severe" and Pa.sexe_patient = "F" and MONTH(Pa.createdAt) = MONTH(now())  
        ORDER BY Pa.id DESC`,
        { type: QueryTypes.SELECT }
      );
      const sereve_nombre_garcon = await sequelize.query(
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
        where Anthr.type_malnutrition = "severe" and Pa.sexe_patient = "M" and MONTH(Pa.createdAt) = MONTH(now())  
        ORDER BY Pa.id DESC`,
        { type: QueryTypes.SELECT }
      );

      // const chronique_nombre =  await sequelize.query(
      //   `select count(Pa.id_patient) as nombre_patient_chronique, createdAt from
      //   patients as Pa
      //   inner join (
      //     SELECT id, patientId, type_malnutrition, createdAt as Date_Consultation
      //     FROM anthropometriques
      //     WHERE createdAt IN (
      //       SELECT MAX(createdAt)
      //       FROM anthropometriques
      //       GROUP BY patientId
      //     )
      //   ) as Anthr
      //   on Anthr.patientId = Pa.id
      //   inner join (
      //   SELECT id, patientId, userId
      //   FROM consulter_pars
      //   WHERE createdAt IN (
      //       SELECT MAX(createdAt)
      //       FROM consulter_pars
      //       GROUP BY patientId
      //   )
      //   ) as Cons
      //   on Anthr.patientId = Cons.patientId
      //   where Anthr.type_malnutrition = "chronique" and MONTH(Pa.createdAt) = MONTH(now())
      //   ORDER BY Pa.id DESC`,
      //   { type: QueryTypes.SELECT }
      // );
      const chronique_nombre_fille = await sequelize.query(
        `select count(Pa.id_patient) as chronique_nombre_fille from
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
        where Anthr.type_malnutrition = "chronique" and Pa.sexe_patient = "F" and MONTH(Pa.createdAt) = MONTH(now())  
        ORDER BY Pa.id DESC`,
        { type: QueryTypes.SELECT }
      );
      const chronique_nombre_garcon = await sequelize.query(
        `select count(Pa.id_patient) as chronique_nombre_garcon from
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
        where Anthr.type_malnutrition = "chronique" and Pa.sexe_patient = "M" and MONTH(Pa.createdAt) = MONTH(now())  
        ORDER BY Pa.id DESC`,
        { type: QueryTypes.SELECT }
      );
      // const moderee_nombre =  await sequelize.query(
      //   `select count(Pa.id_patient) as nombre_patient_moderee, createdAt from
      //   patients as Pa
      //   inner join (
      //     SELECT id, patientId, type_malnutrition, createdAt as Date_Consultation
      //     FROM anthropometriques
      //     WHERE createdAt IN (
      //       SELECT MAX(createdAt)
      //       FROM anthropometriques
      //       GROUP BY patientId
      //     )
      //   ) as Anthr
      //   on Anthr.patientId = Pa.id
      //   inner join (
      //   SELECT id, patientId, userId
      //   FROM consulter_pars
      //   WHERE createdAt IN (
      //       SELECT MAX(createdAt)
      //       FROM consulter_pars
      //       GROUP BY patientId
      //   )
      //   ) as Cons
      //   on Anthr.patientId = Cons.patientId
      //   where Anthr.type_malnutrition = "moderée" and MONTH(Pa.createdAt) = MONTH(now())
      //   ORDER BY Pa.id DESC`,
      //   { type: QueryTypes.SELECT }
      // );
      const moderee_nombre_fille = await sequelize.query(
        `select count(Pa.id_patient) as moderee_nombre_fille from
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
        where Anthr.type_malnutrition = "moderée" and Pa.sexe_patient = "F" and MONTH(Pa.createdAt) = MONTH(now()) 
        ORDER BY Pa.id DESC`,
        { type: QueryTypes.SELECT }
      );
      const moderee_nombre_garcon = await sequelize.query(
        `select count(Pa.id_patient) as moderee_nombre_garcon from
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
        where Anthr.type_malnutrition = "moderée" and Pa.sexe_patient = "M" and MONTH(Pa.createdAt) = MONTH(now()) 
        ORDER BY Pa.id DESC`,
        { type: QueryTypes.SELECT }
      );
      res.status(200).json({
        nombre_garcon,
        nombre_fille,

        nombre_garcon_adulte,
        nombre_fille_adulte,

        nombre_fille_moins_3ans,
        nombre_garcon_moins_3ans,

        nombre_garcon_3_5ans,
        nombre_fille_3_5ans,

        nombre_garcon_6_12ans,
        nombre_fille_6_12ans,

        nbre_fille_today,
        nbre_garcon_today,

        nbre_fille_yesterday,
        nbre_garcon_yesterday,

        sereve_nombre_fille,
        sereve_nombre_garcon,

        chronique_nombre_fille,
        chronique_nombre_garcon,

        moderee_nombre_fille,
        moderee_nombre_garcon,
      });
    });
  } catch (err) {
    res.status(500).json({ error: `${err}` });
  }
};
const getReportingByDate = async (req, res) => {
  const { starting_date, ending_date } = req.body;
  try {
    const result = await sequelize.transaction(async (t) => {
      const nombre_garcon = await sequelize.query(
        'SELECT COUNT("id") as nombre_garcon FROM patients WHERE sexe_patient="M" AND createdAt BETWEEN (:starting_date) AND (:ending_date)',
        {
          replacements: {
            starting_date: starting_date,
            ending_date: ending_date,
            plain: true,
          },
          type: QueryTypes.SELECT,
        }
      );
      const nombre_fille = await sequelize.query(
        'SELECT COUNT("id") as nombre_fille FROM patients WHERE sexe_patient="F" AND createdAt BETWEEN (:starting_date) AND (:ending_date)',
        {
          replacements: {
            starting_date: starting_date,
            ending_date: ending_date,
            plain: true,
          },
          type: QueryTypes.SELECT,
        }
      );

      const nombre_garcon_adulte = await sequelize.query(
        `
        select  count(id_patient) as nombre_garcon_adulte from (
          select id_patient, sexe_patient, createdAt, datediff(now(), date_naissance_patient)/365 as age
            from patients)
            as pa_age
            where  age >= 18 and sexe_patient="M" AND createdAt BETWEEN (:starting_date) AND (:ending_date)
        `,
        {
          replacements: {
            starting_date: starting_date,
            ending_date: ending_date,
            plain: true,
          },
          type: QueryTypes.SELECT,
        }
      );
      const nombre_fille_adulte = await sequelize.query(
        `
        select  count(id_patient) as nombre_fille_adulte from (
          select id_patient, sexe_patient, createdAt, datediff(now(), date_naissance_patient)/365 as age
            from patients)
            as pa_age
            where  age >= 18 and sexe_patient="F" AND createdAt BETWEEN (:starting_date) AND (:ending_date)
        `,
        {
          replacements: {
            starting_date: starting_date,
            ending_date: ending_date,
            plain: true,
          },
          type: QueryTypes.SELECT,
        }
      );

      // //3 ans
      const nombre_fille_moins_3ans = await sequelize.query(
        `
        select  count(id_patient) as nombre_fille_moins_3ans from (
          select id_patient, sexe_patient, createdAt, datediff(now(), date_naissance_patient)/365 as age
            from patients)
            as pa_age
            where age <= 2  and sexe_patient="F"  AND createdAt BETWEEN (:starting_date) AND (:ending_date)
        `,
        {
          replacements: {
            starting_date: starting_date,
            ending_date: ending_date,
            plain: true,
          },
          type: QueryTypes.SELECT,
        }
      );
      const nombre_garcon_moins_3ans = await sequelize.query(
        `
        select  count(id_patient) as nombre_garcon_moins_3ans from (
          select id_patient, sexe_patient, createdAt, datediff(now(), date_naissance_patient)/365 as age
            from patients)
            as pa_age
            where age <= 2  and sexe_patient="M"  AND createdAt BETWEEN (:starting_date) AND (:ending_date)
        `,
        {
          replacements: {
            starting_date: starting_date,
            ending_date: ending_date,
            plain: true,
          },
          type: QueryTypes.SELECT,
        }
      );

      // //3 à 5 ans
      const nombre_garcon_3_5ans = await sequelize.query(
        `
        select  count(id_patient) as nombre_garcon_3_5ans from (
          select id_patient, sexe_patient, createdAt, datediff(now(), date_naissance_patient)/365 as age
            from patients)
            as pa_age
            where  (age > 2 and age <= 5) and sexe_patient="M" AND createdAt BETWEEN (:starting_date) AND (:ending_date)
        `,
        {
          replacements: {
            starting_date: starting_date,
            ending_date: ending_date,
            plain: true,
          },
          type: QueryTypes.SELECT,
        }
      );
      const nombre_fille_3_5ans = await sequelize.query(
        `
        select  count(id_patient) as nombre_fille_3_5ans from (
          select id_patient, sexe_patient, createdAt, datediff(now(), date_naissance_patient)/365 as age
            from patients)
            as pa_age
            where  (age > 2 and age <= 5) and sexe_patient="F" AND createdAt BETWEEN (:starting_date) AND (:ending_date)
        `,
        {
          replacements: {
            starting_date: starting_date,
            ending_date: ending_date,
            plain: true,
          },
          type: QueryTypes.SELECT,
        }
      );

      // // 6 à 12 ans
      const nombre_garcon_6_12ans = await sequelize.query(
        `
        select  count(id_patient) as nombre_garcon_6_12ans from (
          select id_patient, sexe_patient, createdAt, datediff(now(), date_naissance_patient)/365 as age
            from patients)
            as pa_age
            where  (age > 5 and age <= 12) and sexe_patient="M" AND createdAt BETWEEN (:starting_date) AND (:ending_date)
        `,
        {
          replacements: {
            starting_date: starting_date,
            ending_date: ending_date,
            plain: true,
          },
          type: QueryTypes.SELECT,
        }
      );
      const nombre_fille_6_12ans = await sequelize.query(
        `
        select  count(id_patient) as nombre_fille_6_12ans from (
          select id_patient, sexe_patient, createdAt, datediff(now(), date_naissance_patient)/365 as age
            from patients)
            as pa_age
            where  (age > 5 and age <= 12) and sexe_patient="F" AND createdAt BETWEEN (:starting_date) AND (:ending_date)
        `,
        {
          replacements: {
            starting_date: starting_date,
            ending_date: ending_date,
            plain: true,
          },
          type: QueryTypes.SELECT,
        }
      );

      const nombre_garcon_yesterday = await consulter_par.count({
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
      const nombre_fille_yesterday = await consulter_par.count({
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
      const sereve_nombre_fille = await sequelize.query(
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
        where Anthr.type_malnutrition = "MAS" AND Pa.sexe_patient = "F" AND Pa.createdAt BETWEEN (:starting_date) AND (:ending_date)
        ORDER BY Pa.id DESC`,
        {
          replacements: {
            starting_date: starting_date,
            ending_date: ending_date,
            plain: true,
          },
          type: QueryTypes.SELECT,
        }
      );
      const sereve_nombre_garcon = await sequelize.query(
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
        where Anthr.type_malnutrition = "MAS" AND Pa.sexe_patient = "M" AND Pa.createdAt BETWEEN (:starting_date) AND (:ending_date)
        ORDER BY Pa.id DESC`,
        {
          replacements: {
            starting_date: starting_date,
            ending_date: ending_date,
            plain: true,
          },
          type: QueryTypes.SELECT,
        }
      );

      const chronique_nombre_fille = await sequelize.query(
        `select count(Pa.id_patient) as chronique_nombre_fille from
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
        where Anthr.type_malnutrition = "MAC" AND Pa.sexe_patient = "F" AND Pa.createdAt BETWEEN (:starting_date) AND (:ending_date)
        ORDER BY Pa.id DESC`,
        {
          replacements: {
            starting_date: starting_date,
            ending_date: ending_date,
            plain: true,
          },
          type: QueryTypes.SELECT,
        }
      );
      const chronique_nombre_garcon = await sequelize.query(
        `select count(Pa.id_patient) as chronique_nombre_garcon from
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
        where Anthr.type_malnutrition = "MAC" AND Pa.sexe_patient = "M" AND Pa.createdAt BETWEEN (:starting_date) AND (:ending_date)
        ORDER BY Pa.id DESC`,
        {
          replacements: {
            starting_date: starting_date,
            ending_date: ending_date,
            plain: true,
          },
          type: QueryTypes.SELECT,
        }
      );

      const moderee_nombre_fille = await sequelize.query(
        `select count(Pa.id_patient) as moderee_nombre_fille from
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
        where Anthr.type_malnutrition = "MAM" AND Pa.sexe_patient = "F" AND Pa.createdAt BETWEEN (:starting_date) AND (:ending_date)
        ORDER BY Pa.id DESC`,
        {
          replacements: {
            starting_date: starting_date,
            ending_date: ending_date,
            plain: true,
          },
          type: QueryTypes.SELECT,
        }
      );
      const moderee_nombre_garcon = await sequelize.query(
        `select count(Pa.id_patient) as moderee_nombre_garcon from
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
        where Anthr.type_malnutrition = "MAM" AND Pa.sexe_patient = "M" AND Pa.createdAt BETWEEN (:starting_date) AND (:ending_date)
        ORDER BY Pa.id DESC`,
        {
          replacements: {
            starting_date: starting_date,
            ending_date: ending_date,
            plain: true,
          },
          type: QueryTypes.SELECT,
        }
      );

      res.status(200).json({
        nombre_garcon,
        nombre_fille,
        nombre_garcon_adulte,
        nombre_fille_adulte,
        nombre_garcon_moins_3ans,
        nombre_fille_moins_3ans,
        nombre_garcon_3_5ans,
        nombre_fille_3_5ans,
        nombre_garcon_6_12ans,
        nombre_fille_6_12ans,
        nombre_garcon_yesterday,
        nombre_fille_yesterday,
        sereve_nombre_garcon,
        sereve_nombre_fille,
        chronique_nombre_garcon,
        chronique_nombre_fille,
        moderee_nombre_garcon,
        moderee_nombre_fille,
      });
    });
  } catch (err) {
    res.status(500).json({ error: `${err}` });
  }
};
module.exports = {
  getReporting,
  getReportingByDate,
};
