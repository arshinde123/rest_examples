'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('Todos_a', [{
        title: 'Todo 1',
        description: 'Todo 1 description',
        status: 'pending'
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
		*/
      return queryInterface.bulkDelete('Todos_a', null, {});
  }
};
