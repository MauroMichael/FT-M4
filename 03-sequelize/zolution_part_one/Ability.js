const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Ability', {
    name: {
      type: DataTypes.STRING,
      unique: 'claveUnica',
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    mana_cost: {
      type: DataTypes.FLOAT, 
      unique: 'claveUnica',
      allowNull: false
    }
  })
}