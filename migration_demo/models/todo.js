'use strict';
module.exports = (sequelize, DataTypes) => {
  var Todo = sequelize.define('Todo', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
		timestamps: true
	});
  Todo.associate = function(models) {
    // associations can be defined here
  };
  return Todo;
};
