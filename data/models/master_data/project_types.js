'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const child_types = sequelize.define('child_types', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    relates_to_children: DataTypes.INTEGER,
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE
  });

  return child_types;
};