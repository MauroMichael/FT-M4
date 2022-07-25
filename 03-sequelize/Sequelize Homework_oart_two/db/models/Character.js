const { DataTypes, Sequelize } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Character', {
    code: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      validate: {
        henryIsNotAllowed(value) {
          if(value.toLowerCase() === 'henry') {
            throw new Error('Any conbination of HENRY characters is not allowed');
          }
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notIn: [["Henry", "SoyHenry", "Soy Henry"]]
      }
    },
    age: {
      type: DataTypes.INTEGER,
      get() {
        // return this.getDataValue(age) + ' ' + 'years old';
        const rawValue = this.getDataValue('age'); //por si el age es = null
        return rawValue ? rawValue + ' years old': null;
      }
    },
    race: {
      type: DataTypes.ENUM('Human', 'Elf', 'Machine', 'Demon', 'Animal', 'Other'),
      defaultValue: 'Other'
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
      defaultValue: DataTypes.NOW
    }
  }, {
    timestamps: false
  })
}

