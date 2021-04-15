
const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Log = sequelize.define('logs', {
   id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  task:{
    type: Sequelize.STRING,
    allowNull:false
  },
  time:{
    type:Sequelize.TIME,
    allowNull:false,
    // set(valueToBeSet){
    //   this.setDataValue('time',valueToBeSet)
    // }
  },
  date:{
    type:Sequelize.DATEONLY,
    allowNull:false,
    // set(valueToBeSet){
    //   this.setDataValue('data',valueToBeSet)
    // }
  }
 
  
});

module.exports = Log;
