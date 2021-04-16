const { Model, DataTypes } = require('sequelize')

class Category extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
        }, {
            sequelize,
            tableName: 'categories',
        })
    }

    static associate(models) {
        this.belongsToMany(models.Publication, { foreignKey:'category_id', through:'publis_categories', as: 'publications'})
    }
}

module.exports = Category
