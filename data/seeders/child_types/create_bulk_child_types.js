'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {

  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      const title = ["Child Type1", "Child Type2","Child Type3","Child Type4","Child Type5","Child Type6","Child Type7","Child Type8",
                     "Child Type9", "Child Type10","Child Type11","Child Type12","Child Type13","Child Type14","Child Type15","Child Type16"];
      const description = ["Child Type1", "Child Type2","Child Type3","Child Type4","Child Type5","Child Type6","Child Type7","Child Type8",
                           "Child Type9", "Child Type10","Child Type11","Child Type12","Child Type13","Child Type14","Child Type15","Child Type16"];

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

