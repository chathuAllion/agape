'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const countries = sequelize.define('countries', {
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    country_type_id: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  });

  return countries;
};