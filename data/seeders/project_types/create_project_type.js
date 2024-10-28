'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('project_types', [{
      title: 'Child Care',
      description: 'Project for Children'
    }]);
  },

  // async down(queryInterface, Sequelize) {
  //   return queryInterface.bulkDelete('project_types', { id: { [Sequelize.Op.gt]: 1 } });
  // }
    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('project_types');
    }

};
