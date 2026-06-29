const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const History = sequelize.define('History', {
  id_history: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_user: {
  type: DataTypes.INTEGER,
  allowNull: false,
  references: {
    model: 'users',
    key: 'id_user'
  }
},
  id_summary: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'summaries', 
      key: 'id_summary'
    }
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
  history_name: {
    type: DataTypes.STRING,
    allowNull: true
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'histories',
  timestamps: true,
  createdAt: 'timestamp',
  updatedAt: false
});

module.exports = History;