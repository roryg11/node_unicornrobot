'use strict';
module.exports = (sequelize, DataTypes) => {
  var Action = sequelize.define('Action', {
    content: {
      type: DataTypes.STRING,
      allowNull: false
    },
    completed: {
      type: DataTypes.BOOLEAN,
      deafaultValue: true
    },
  });

  Action.associate = function(models) {
    // associations can be defined here
    Action.belongsTo(models.Habit, {
      foreignKey: 'habitId',
      onDelete: 'CASCADE'
    });
  };
  
  return Action;
};