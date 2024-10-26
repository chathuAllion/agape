'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {

  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      const names = ["Australia", "Sri Lanka", "New Zealand"];
      const codes = ["AUS", "SL", "NZ"];
      const country_type_ids = [0, 1, 0];

      for (let i = 0; i < names.length; i++) {

        const countries = [];
        countries.push({
          name: names[i],
          code: codes[i],
          country_type_id: country_type_ids[i],
        });

        const insertedCountries = await queryInterface.bulkInsert('countries', countries, {
          transaction,
          returning: ['id'],
        });

        const countryIds = insertedCountries.map((countries) => countries.id);
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('countries');
  }

};
