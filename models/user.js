const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.belongsToMany(
        models.patient,
        { through: "consulter_par" },
        {
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        }
      );
    }
  }
  user.init(
    {
      nom_user: DataTypes.STRING,
      postnom_user: DataTypes.STRING,
      prenom_user: DataTypes.STRING,
      email: DataTypes.STRING,
      image_user: DataTypes.STRING,
      password: DataTypes.TEXT,
      is_admin: DataTypes.BOOLEAN,
      statut: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
