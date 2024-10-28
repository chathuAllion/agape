'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {

  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      const title = ["Atashinda - ABD", "Atashinda - ABC","Regular Spon"];
      const description = ["Higher Education of the child", "Special requirements","Education - School"];

      for (let i = 0; i < title.length; i++) {

        const project_types = [];
        project_types.push(
          {
            title: title[i],
            description: description[i],
          });

        const insertedChildTypes = await queryInterface.bulkInsert('project_types', project_types, {
          transaction,
          returning: ['id'],
        });

        const project_Type_Ids = insertedChildTypes.map((project_types) => project_types.id);
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('project_types');
  }

};

