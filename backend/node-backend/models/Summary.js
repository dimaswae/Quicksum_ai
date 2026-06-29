const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Summary = sequelize.define('Summary', {
  id_summary: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_text: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'texts',
      key: 'id_text'
    }
  },
  id_model: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'models',
      key: 'id_model'
    }
  },
  summary_text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  processing_time: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  tableName: 'summaries',
  timestamps: true,
  createdAt: 'create_at',
  updatedAt: false
});

module.exports = Summary;