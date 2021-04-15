const { Model, DataTypes } = require('sequelize')

class Publication extends Model {
    static init(sequelize) {
        super.init({
            title: DataTypes.STRING,
            description: DataTypes.STRING,
            category: DataTypes.STRING,
            content: DataTypes.STRING,
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey:'user_id', as: 'user'})
    }
}

module.exports = Publication
