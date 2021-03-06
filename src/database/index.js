const databaseConfig = require('../configs/env')
const { Sequelize } = require('sequelize')

const User = require('../models/User')
const Publication = require('../models/Publication')
const Category = require('../models/Category')

const models = [ User, Publication, Category ]

const sequelize = new Sequelize(databaseConfig)

models.forEach(model => model.init(sequelize))

User.associate(sequelize.models)
Publication.associate(sequelize.models)
Category.associate(sequelize.models)

module.exports = sequelize

// async function run () {
//     try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully.');
// } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }}

// run()
