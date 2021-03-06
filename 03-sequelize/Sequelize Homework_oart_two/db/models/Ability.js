const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Ability', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: 'compositeUnique'
    },
    description: {
      type: DataTypes.TEXT
    },
    mana_cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
      unique: 'compositeUnique',
      validate: {
        max: 250.0,
        min: 10.0
      }
    },
    summary: {
      type: DataTypes.VIRTUAL,
      get() {
        `${this.name} (${parseInt(this.mana_cost)} points of mana) - Description: ${this.description}`
      }
    }
  })
}