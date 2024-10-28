'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {

  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      const title = ["Project Type1", "Project Type2","Project Type3","Project Type4","Project Type5","Project Type6","Project Type7","Project Type8",
                     "Project Type9", "Project Type10","Project Type11","Project Type12","Project Type13","Project Type14","Project Type15","Project Type16"];
      const description = ["Project Type1", "Project Type2","Project Type3","Project Type4","Project Type5","Project Type6","Project Type7","Project Type8",
                           "Project Type9", "Project Type10","Project Type11","Project Type12","Project Type13","Project Type14","Project Type15","Project Type16"];

      for (let i = 0; i < title.length; i++) {

        const project_types = [];
        project_types.push(
          {
            title: title[i],
            description: description[i],
          });

        const insertedProjectTypes = await queryInterface.bulkInsert('project_types', project_types, {
          transaction,
          returning: ['id'],
        });

        const project_Type_Ids = insertedProjectTypes.map((project_types) => project_types.id);
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

