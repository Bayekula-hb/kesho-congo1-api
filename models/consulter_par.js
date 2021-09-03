"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class consulter_par extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.consulter_par.belongsTo(models.patient, {
        foreignKey: {
          allowNull: false,
        },
      });
      models.consulter_par.belongsTo(models.user, {
        foreignKey: {
          allowNull: false,
        },
      });
    }
  }
  consulter_par.init(
    {
      id_consulter_par : DataTypes.UUID,
      userId: DataTypes.INTEGER,
      patientId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "consulter_par",
    }
  );
  return consulter_par;
};
