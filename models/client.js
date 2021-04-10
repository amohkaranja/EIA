
const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Client = sequelize.define('clients', {
   id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  firstName:{
    type: Sequelize.STRING,
    allowNull:false
  },
  lastName:{
    type: Sequelize.STRING,
    allowNull:false
  },
  town:{
    type: Sequelize.STRING,
    allowNull:true
  },
  country:{
    type: Sequelize.STRING,
    allowNull:true
  },
  boxOffice:{
    type: Sequelize.STRING,
    allowNull:true
  },
  phoneNumber:{
    type: Sequelize.INTEGER,
    allowNull:true
  },
  email:{
    type: Sequelize.STRING,
    allowNull:false
  },
  idNumber:{
    type: Sequelize.INTEGER,
    allowNull:true
  },
  businessType:{
    type: Sequelize.STRING,
    allowNull:true
  },
  businessNature:{
    type: Sequelize.STRING,
    allowNull:true
  },
  pin:{
    type: Sequelize.STRING,
    allowNull:true
  },
  regNumber:{
    type: Sequelize.STRING,
    allowNull:true
  },
  kraCert:{
    type: Sequelize.STRING,
    allowNull:true
  },
  idCopy:{
    type: Sequelize.STRING,
    allowNull:true
  },
  incopCert:{
    type: Sequelize.STRING,
    allowNull:true
  },
 
 
  
});

module.exports = Client;
