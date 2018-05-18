'use strict';
module.exports = (sequelize, DataTypes) => {
  var Habit = sequelize.define('Habit', {
    title: {
      type:DataTypes.STRING,
      allowNull: false,
    },
  });


  Habit.associate = function(models) {
    // associations can be defined here
    Habit.hasMany(models.Action, {
      foreignKey: 'habitId',
      as: 'actions'
    })
  };

  return Habit;
};