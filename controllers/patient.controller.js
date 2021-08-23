const { patient } = require("../models");

module.exports = {
    registerPatient: async (req, res, next) => {
        console.log(req.body)
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
    }
}