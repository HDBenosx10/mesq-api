const dotenv = require('dotenv')

const env = process.env.NODE_ENV
const path = env ? `.env.${env}` : `.env`

dotenv.config({
    path: path
})

exports.databaseConfig = {
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
    dialectOptions: {
      timezone: '-03:00',
    },
    timezone: '-03:00',
  }
