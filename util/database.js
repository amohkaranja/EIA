const Sequelize = require('sequelize');

const sequelize = new Sequelize('endeavors_insurance_agency', 'root', 'password', {
    dialect: 'mysql',
    host: 'localhost'
  });
  
  module.exports = sequelize;