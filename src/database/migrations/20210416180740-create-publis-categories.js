'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('publis_categories', {
        id: {
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        publication_id: {
            type:Sequelize.INTEGER,
            allowNull: false,
            references: { model: 'publications', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        category_id: {
            type:Sequelize.INTEGER,
            allowNull: false,
            references: { model: 'categories', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        created_at: {
            type:Sequelize.DATE,
            allowNull: false,
        },
        updated_at: {
            type:Sequelize.DATE,
            allowNull: false,
        }
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('publis_categories');

  }
};
