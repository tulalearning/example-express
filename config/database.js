const { Sequelize } = require('sequelize');

//Define database connection
const sequelize = new Sequelize('example-express-db', 'postgres', 'banana08', {
  host: 'localhost',
  dialect: 'postgres',
});

//Connect Database function
async function connect() {
  try {
    await sequelize.authenticate();
    console.log('Connection established successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

//Auto generate tables
async function sync() {
  try {
    await sequelize.sync();
    console.log('The database synced successfully...');
  } catch (error) {
    console.error('Unable to sync the database', error);
  }
}

module.exports = { sequelize, connect, sync };
