// models/index.js
const sequelize = require('../config/database');
const User = require('./User');
const AI_Model = require('./AI_Model');
const Text = require('./Text');
const Summary = require('./Summary');
const History = require('./History');

// -- RELASI USER & TEXT (One-to-Many) --
User.hasMany(Text, { foreignKey: 'id_user', onDelete: 'CASCADE' });
Text.belongsTo(User, { foreignKey: 'id_user' });

// -- RELASI TEXT & SUMMARY (One-to-One) --
Text.hasOne(Summary, { foreignKey: 'id_text', onDelete: 'CASCADE' });
Summary.belongsTo(Text, { foreignKey: 'id_text' });

// -- RELASI MODEL & SUMMARY (One-to-Many) --
AI_Model.hasMany(Summary, { foreignKey: 'id_model' });
Summary.belongsTo(AI_Model, { foreignKey: 'id_model' });

// -- RELASI HISTORY (Menghubungkan ke User, Text, dan Summary) --
User.hasMany(History, { foreignKey: 'id_user', onDelete: 'CASCADE' });
History.belongsTo(User, { foreignKey: 'id_user' });

Text.hasMany(History, { foreignKey: 'id_text', onDelete: 'CASCADE' });
History.belongsTo(Text, { foreignKey: 'id_text' });

Summary.hasMany(History, { foreignKey: 'id_summary', onDelete: 'CASCADE' });
History.belongsTo(Summary, { foreignKey: 'id_summary' });

module.exports = {
  sequelize,
  User,
  AI_Model,
  Text,
  Summary,
  History
};