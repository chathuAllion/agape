'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('child_types', [{
      title: 'Atashinda',
      description: 'Atashinda child type'
    }]);
  },

  // async down(queryInterface, Sequelize) {
  //   return queryInterface.bulkDelete('child_types', { id: { [Sequelize.Op.gt]: 1 } });
  // }
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('child_types');
    }

};
