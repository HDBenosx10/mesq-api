const databaseConfig = require('../configs/env')
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(databaseConfig)


module.exports = sequelize

// async function run () {
//     try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
// } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }}

// run()
