
const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('user', {
  _id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  password:{
    type: Sequelize.STRING,
    allowNull:false
  },
  email:{
    type:Sequelize.STRING,
    allowNull:false
  },
  lastName:{
    type:Sequelize.STRING,
    allowNull:false
  },
  firstName:{
    type:Sequelize.STRING,
    allowNull:false
  },
  phoneNumber:{
    type:Sequelize.INTEGER,
    allowNull:false
  },
  resetToken:Sequelize.STRING,
  resetTokenExpiration:Sequelize.DATE,
  resetFlag:{
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  userLevel:{
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "High level"
  },
});

module.exports = User;
