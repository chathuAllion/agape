'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {

  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {

      const names = ["Australia", "Sri Lanka", "New Zealand"];
      const codes = ["AUS", "SL", "NZ"];
      const country_type_ids = [1, 0, 1];

      const reference_names=["AINA Australian Sponsorship","AINA Sri Lanka","New Zealand AINA"];
      const bank_names=["City Bank Australia","Bank of Ceylon","Merchant Bank of New Zealand"];
      const branches=["Sydney","Colombo","Wellington"];
      const account_names=["AINA AUS Spon","Sri Lanka Savings","New Zealand Donations"];
      const account_numbers=["00026556562556569564","0025454545656545656665955","121554558788855"];

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

        const bank_accounts = [];
        bank_accounts.push(
          {
            country_id: countryIds[0],
            reference_name: reference_names[i],
            bank_name: bank_names[i],
            branch: branches[i],
            account_name: account_names[i],
            account_number: account_numbers[i],
            created_at: new Date(),
            updated_at: new Date(),
          });

        const insertedBankAccounts = await queryInterface.bulkInsert('bank_accounts', bank_accounts, {
          transaction,
          returning: ['id'],
        });

        const bankAccountIds = insertedBankAccounts.map((bank_accounts) => bank_accounts.id);
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('bank_accounts');
    await queryInterface.bulkDelete('countries');
  }

};
