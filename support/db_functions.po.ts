var child_process = require('child_process');
import dotenv from 'dotenv';
import path from 'path';
//dotenv.config({ path: path.resolve(__dirname, '../../../', '.env') });

export class DBFunctions {
    // sample functions to add in spec; runs query and gets data from DB //

    // test.beforeAll(async ({ }) => {
    //   const dbConnect = new DBConnect();
    //   dbConnect.getDataFromDB("Select * from Users Where id=1;");
    // });

    // test.beforeAll(async ({ }) => {
    //     const dbFunctions = new DBFunctions();
    //     dbFunctions.clearDataFromDB('subjects', 'code', 'maths');
    //   });

    // test('01. get data', async ({ page }) => {
    //     const dbFunctions = new DBFunctions();
    //     dbFunctions.getDataFromDB("SELECT * FROM users;");
    // });

    async getDataFromDB(query: string) {
        const { Sequelize } = require('sequelize');

        const sequelize = new Sequelize({
            dialect: 'postgres',
            host: "localhost",
            port: "5432",
            username: "postgres",
            password: "Allion@321",
            database: "agape",
            logging: false,
        });

        // export default connection; 
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');

            const { QueryTypes } = require('sequelize');
            const data = await sequelize.query(query, { type: QueryTypes.Select });
            // console.log(data[0][0]);
            return data[0][0];

        } catch (error) {
            console.error('Unable to get data from DB', error);
        }
        sequelize.close();
    };

    async clearDataFromDB(db_tableName: any, columnName: any, parameter: any) {
        const { Sequelize } = require('sequelize');
        // const sequelize = new Sequelize('postgres://' + process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD + '@'
        //     + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_DATABASE
        //     + (process.env.DB_PARAMSPEC ? '?' + process.env.DB_PARAMSPEC : ''));

        const sequelize = new Sequelize({
            dialect: 'postgres',
            host: "localhost",
            port: "5432",
            username: "postgres",
            password: "Allion@321",
            database: "agape",
            logging: false,
        });

        try {
            await sequelize.authenticate();
            // console.log('Connection has been established successfully.');

            const { QueryTypes } = require('sequelize');
            await sequelize.query("DELETE FROM " + db_tableName + " WHERE " + columnName + " = '" + parameter + "';", { type: QueryTypes.DELETE });

        } catch (error) {
            console.error('Unable to delete the row, check if row exists', error);
        }
        await sequelize.close();
    };

    async createDataInDB(folder_name: any, seed_file: any) {
        var seeders_path = './data/seeders/' + folder_name;
        await child_process.execSync("npx sequelize-cli db:seed --seeders-path " + seeders_path + " --seed " + seed_file + ".js",
            function (err: any, stderr: any) {
                if (err) {
                    console.log(err);
                    console.log("\n" + stderr);
                    console.log("there was an error creating the " + seed_file);
                } else {
                    // console.log(seed_file + " successfully created in database");
                }
            }
        );
    };

    async removeDataFromDB(folder_name: any, seed_file: any) {
        var seeders_path = './data/seeders/' + folder_name;
        await child_process.execSync("npx sequelize-cli db:seed:undo --seeders-path " + seeders_path + " --seed " + seed_file + ".js",
            function (err: any, stderr: any) {
                if (err) {
                    console.log(err);
                    console.log("\n" + stderr);
                    console.log("there was an error removing the " + seed_file);
                } else {
                    // console.log(seed_file + " successfully removed from database");
                }
            }
        );
    };


    /*****  some more sample functions to use in future ************************ */

    async clearDBTables(db_tables: any) {
        const { Sequelize } = require('sequelize');
        // const sequelize = new Sequelize('postgres://' + process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD + '@'
        //     + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_DATABASE
        //     + (process.env.DB_PARAMSPEC ? '?' + process.env.DB_PARAMSPEC : ''));

        const sequelize = new Sequelize({
            dialect: 'postgres',
            host: "localhost",
            port: "5432",
            username: "postgres",
            password: "Allion@321",
            database: "agape",
            logging: false,
        });
        try {
            await sequelize.authenticate();
            // console.log('Connection has been established successfully.');

            const { QueryTypes } = require('sequelize');
            for (var i = 0; i < db_tables.length; i++) {
                await sequelize.query("DELETE FROM " + db_tables[i], { type: QueryTypes.Select });
                // console.log('Data deleted from ' + db_tables[i] + ' table successfully');
            }

        } catch (error) {
            console.error('Unable to delete data', error);
        }
        sequelize.close();
    };

    // this is used to run raw queries saved in a file
    async insertTestSpecData(testData: any) {
        const { Sequelize } = require('sequelize');
        // const sequelize = new Sequelize('postgres://' + process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD + '@'
        //     + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_DATABASE
        //     + (process.env.DB_PARAMSPEC ? '?' + process.env.DB_PARAMSPEC : ''));

        const sequelize = new Sequelize({
            dialect: 'postgres',
            host: "localhost",
            port: "5432",
            username: "postgres",
            password: "Allion@321",
            database: "agape",
            logging: false,
        });
        try {
            // console.log(testData);      
            await sequelize.authenticate();
            // console.log('Connection has been established successfully.');

            const { QueryTypes } = require('sequelize');
            await sequelize.query(testData, { type: QueryTypes.INSERT });
            // console.log('Data inserted successfully');

        } catch (error) {
            console.error('Unable to insert data; it is possible the same data is already present in the DB:', error);
        }
        await sequelize.close();
    };

    async updateTestData(query: any) {
        const { Sequelize } = require('sequelize');
        // const sequelize = new Sequelize('postgres://' + process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD + '@'
        //     + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_DATABASE
        //     + (process.env.DB_PARAMSPEC ? '?' + process.env.DB_PARAMSPEC : ''));

        const sequelize = new Sequelize({
            dialect: process.env.DB_DIALECT,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            logging: false,
        });
        try {
            // console.log(testData);      
            await sequelize.authenticate();
            // console.log('Connection has been established successfully.');

            const { QueryTypes } = require('sequelize');
            await sequelize.query(query, { type: QueryTypes.UPDATE });
            // console.log('Data updated successfully');

        } catch (error) {
            console.error('Unable to update data:', error);
        }
        await sequelize.close();
    };

    async runRawQuery(statement: any) {
        const { Sequelize } = require('sequelize');
        // const sequelize = new Sequelize('postgres://' + process.env.DB_USERNAME + ':' + process.env.DB_PASSWORD + '@'
        //     + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_DATABASE
        //     + (process.env.DB_PARAMSPEC ? '?' + process.env.DB_PARAMSPEC : ''));

        const sequelize = new Sequelize({
            dialect: process.env.DB_DIALECT,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            logging: false,
        });

        try {
            await sequelize.authenticate();
            await sequelize.query(statement);
        } catch (error) {
            console.error('Unable to run query:', error);
        }
        await sequelize.close();
    }

};