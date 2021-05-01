
const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Policy = sequelize.define('policy', {
   id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  policytype:{
    type: Sequelize.STRING,
    allowNull:true
  },
  policyName:{
    type: Sequelize.STRING,
    allowNull:true
  },
  coverType:{
    type:Sequelize.STRING,
    allowNull:true,
    
  },
  branch:{
    type:Sequelize.STRING,
    allowNull:true,
    
  },
  mvClass:{
    type: Sequelize.STRING,
    allowNull:true
  },
  regNumber:{
    type: Sequelize.STRING,
    allowNull:true
  },
  sumInsured:{
    type: Sequelize.INTEGER,
    allowNull:true
  },
  insurer:{
    type: Sequelize.STRING,
    allowNull:true
  },
  logBookNumber:{
    type: Sequelize.STRING,
    allowNull:true
  },
  engineNumber:{
    type: Sequelize.STRING,
    allowNull:true
  },
  chasisNumber:{
    type: Sequelize.STRING,
    allowNull:true
  },
  logBookScanned:{
    type: Sequelize.STRING,
    allowNull:true
  },
  businessNumber:{
    type: Sequelize.STRING,
    allowNull:true
  },
  employees:{
    type: Sequelize.INTEGER,
    allowNull:true
  },
incorpCert:{
    type: Sequelize.STRING,
    allowNull:true
  },
  policyStart:{
    type: Sequelize.DATEONLY,
    allowNull:true
  },
  policyEnd:{
    type: Sequelize.DATEONLY,
    allowNull:true
  },
  policyNumber:{
    type: Sequelize.STRING,
    allowNull:true
  },
  exPro:{
    type: Sequelize.STRING,
    allowNull:true
  },
  poliTe:{
    type: Sequelize.STRING,
    allowNull:true
  },
  perAcc:{
    type: Sequelize.STRING,
    allowNull:true
  },
  otherBe:{
    type: Sequelize.STRING,
    allowNull:true
  },
  
});

module.exports = Policy;
