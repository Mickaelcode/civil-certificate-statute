const { sequelize, DataTypes } = require("./sequielize");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: { msg: "Email already exists" },
      allowNull: false,
      validate: {
        isEmail: { msg: "Email is not valid" },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 100],
          msg: "Password must be between 8 and 100 characters",
        },
      },
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    timestamps: false,
  }
);

const Citizen = sequelize.define(
  "Citizen",
  {
    copyNumber: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
      allowNull: false,
      unique: { msg: "copy number already exists" },
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: { msg: "Format date  is not valid" },
      },
    },
    cin: {
      type: DataTypes.INTEGER,
      allowNull: true,
      unique: { msg: "cin already exists" },
      validate: {
        isNumeric: { msg: "cin must be a number" },
      },
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

User.hasOne(Citizen, { foreignKey: 'copyNumber' });
Citizen.belongsTo(User, { foreignKey: 'id' });

module.exports = {User, Citizen}
