'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('countries', [{
      name: 'Sri Lanka',
      code: 'SL',
      country_type_id:1
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('bank_accounts');
    await queryInterface.bulkDelete('countries');
  }

};
