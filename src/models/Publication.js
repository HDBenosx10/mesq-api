const { Model, DataTypes } = require('sequelize')

class Publication extends Model {
    static init(sequelize) {
        super.init({
            title: DataTypes.STRING,
            description: DataTypes.STRING,
            content: DataTypes.STRING,
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey:'user_id', as: 'user'})
        this.belongsToMany(models.Category, { foreignKey:'publication_id', through:'publis_categories', as: 'categories'})
    }
}

module.exports = Publication
