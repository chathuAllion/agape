'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const bank_accounts = sequelize.define('bank_accounts', {
    country_id: DataTypes.INTEGER,
    reference_name: DataTypes.STRING,
    bank_name: DataTypes.STRING,
    branch: DataTypes.STRING,
    bank_address: DataTypes.STRING,
    bank_code: DataTypes.STRING,
    swift_code: DataTypes.STRING,
    account_name: DataTypes.STRING,
    notes: DataTypes.STRING,
    account_number: DataTypes.STRING,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  });

  return bank_accounts;
};