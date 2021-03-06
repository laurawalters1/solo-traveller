const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class Trip extends Model {}

Trip.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    trip_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "companies",
        key: "id",
      },
    },
    trip_link: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isUrl: true,
      },
    },
    img_src: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "/images/placeholder.jpg",
    },
    trip_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    traveller_num: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    hooks: {},
    sequelize,
    timestamps: false,
    freezeTableName: false,
    underscored: true,
    modelName: "trips",
  }
);

module.exports = Trip;
