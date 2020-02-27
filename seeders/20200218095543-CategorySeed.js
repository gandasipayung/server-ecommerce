'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [
      {
        name: 'Uncategorized',
      },
      {
        name: 'Men Watch',
      },
      {
        name: 'Ladies Watch',
      },
      {
        name: 'Sport Watch',
      },
      {
        name: 'Aluminium Watch',
      },
      {
        name: 'Smartwatches',
      },
      {
        name: 'Digital Watch',
      },
      {
        name: 'Military Watch',
      },
      {
        name: 'Luxury Watch',
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('Categories', null, {})
  }
};
