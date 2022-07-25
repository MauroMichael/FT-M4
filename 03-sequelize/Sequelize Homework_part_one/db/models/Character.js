const { DataTypes, Sequelize } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Character', {
    code: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER
    },
    race: {
      type: Sequelize.ENUM('Human', 'Elf', 'Machine', 'Demon', 'Animal', 'Other'),
      defautlValue: 'Other'
    },
    hp: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    mana: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    date_added: {
      type: DataTypes.DATEONLY,
      defautlValue: DataTypes.NOW
    }
  },
  { 
    timestamps: false
  })
}