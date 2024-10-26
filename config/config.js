const fs = require('fs');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.resolve(__dirname, '../', '.env') });

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true,
      //ssl: true,
      ssl: {
        rejectUnauthorized: false,
        // require: true,
        // ca: fs.readFileSync('/path/to/server-certificates/root.crt').toString()
      }
    }
  },
  // testing: {
  //   username: process.env.DB_USERNAME,
  //   password: process.env.DB_PASSWORD,
  //   database: process.env.DB_DATABASE,
  //   host: process.env.DB_HOST,
  //   port: process.env.DB_PORT,
  //   dialect: 'postgres',
  //   dialectOptions: {
  //     bigNumberStrings: true,
  //     ssl: true
  //   }
  // }
};