'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  Token.init({
    email: { 
      type: DataTypes.STRING, 
      set(value) {
        this.setDataValue('firstName', titleCap(value));
      },
    },
    type: { 
      type: DataTypes.STRING, 
      set(value) {
        this.setDataValue('lastName', titleCap(value));
      },
    },
    token: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    expiresIn: { 
      type: DataTypes.DATE, 
    }
  }, {
    schema: "central",
    sequelize,
    modelName: 'Token',
    timestamps: true,
  });

  return Token;
};