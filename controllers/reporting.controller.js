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
const getReporting= async (req, res) => {
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
        where Anthr.type_malnutrition = "severe" and Pa.sexe_patient = "F" and MONTH(Pa.createdAt) = MONTH(now())  
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
      const chronique_nombre_fille =  await sequelize.query(
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
      const chronique_nombre_garcon =  await sequelize.query(
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
      const moderee_nombre_fille =  await sequelize.query(
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
      const moderee_nombre_garcon =  await sequelize.query(
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
}
const getReportingByDate= async (req, res) => {
  const {date} = req.body;
  console.log("date :",date)
  console.log("req.body : ",req.body.date)
  try {
    const result = await sequelize.transaction(async (t) => {
      const totalPatient = await patient.count("id");
      const nbreFille = await patient.count({
        where: {
          sexe_patient: "F",
          // createdAt :{
          //   [Op.lt]: date,
          // }
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
        select MONTH("2021-09-07") as mois_envoyer, count(id_patient) as nombre_adulte from (
          select id_patient, createdAt, datediff(now(), date_naissance_patient)/365 as age
            from patients)
            as pa_age
            where age > 17
                  and MONTH(createdAt) = MONTH("2021-09-07")  
            ;
        `,
        { type: QueryTypes.SELECT }
      );

      const NbreGarconAdulte = await sequelize.query(
        `
        select  count(id_patient) as NbreGarconAdulte from (
          select id_patient, sexe_patient, datediff(now(), date_naissance_patient)/365 as age
            from patients)
            as pa_age
            where  age > 17 and sexe_patient="M"
            ;
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
      const moderee_nombre =  await sequelize.query(
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
        where Anthr.type_malnutrition = "moderée"
        ORDER BY Pa.id DESC`,
        { type: QueryTypes.SELECT }
      );
      const moderee_nombre_fille =  await sequelize.query(
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
        where Anthr.type_malnutrition = "moderée" and Pa.sexe_patient = "F"
        ORDER BY Pa.id DESC`,
        { type: QueryTypes.SELECT }
      );
      const moderee_nombre_garcon =  await sequelize.query(
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
        where Anthr.type_malnutrition = "moderée" and Pa.sexe_patient = "M"
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
        moderee_nombre,
        moderee_nombre_fille,
        moderee_nombre_garcon,
        
      });
    });
  } catch (err) {
    res.status(500).json({ error: `${err}` });
  }
}
module.exports = {
  getReporting,
  getReportingByDate,
};
