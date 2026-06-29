const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Text = sequelize.define('Text', {
  id_text: {
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
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE' 
  },
  text_origin: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'texts',
  timestamps: true,
  createdAt: 'create_at',
  updatedAt: false
});

module.exports = Text;