const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AI_Model = sequelize.define('AI_Model', {
  id_model: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  model_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  version: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'models',
  timestamps: false 
});

module.exports = AI_Model;