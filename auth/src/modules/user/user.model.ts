'use strict';
const {
  Model
} = require('sequelize');
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Admin.init({
    first_name: { 
      type: DataTypes.STRING
      
    },
    last_name: { 
      type: DataTypes.STRING
    },
    
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
    },
    
    status: {
      type: DataTypes.ENUM('active', 'disabled', 'unverified'),
    },
  }, {
    schema: "central",
    sequelize,
    modelName: 'Admin',
    timestamps: true,
  });
  Admin.prototype.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.passwd);
  };
  Admin.prototype.generateJwtToken = function () {
    return jwt.sign(
      {
        id: this.id,
        email: this.email
      },
      process.env.TOKEN_SECRET_KEY,
      {
        expiresIn: process.env.TOKEN_EXPIRATION,
      }
    );
  };
  return Admin;
};