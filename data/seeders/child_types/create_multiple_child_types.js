'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {

  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      const title = ["Atashinda - ABD", "Atashinda - ABC","Regular Spon"];
      const description = ["Higher Education of the child", "Special requirements","Education - School"];

      for (let i = 0; i < title.length; i++) {

        const child_types = [];
        child_types.push(
          {
            title: title[i],
            description: description[i],
          });

        const insertedChildTypes = await queryInterface.bulkInsert('child_types', child_types, {
          transaction,
          returning: ['id'],
        });

        const child_Type_Ids = insertedChildTypes.map((child_types) => child_types.id);
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('child_types');
  }

};

