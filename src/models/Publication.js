const { Model, DataTypes, QueryTypes } = require('sequelize')

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

    static async findByCategory(category) {
        return this.sequelize.query(`SELECT DISTINCT publications.id,publications.title,categories.name as tag,publications.content,publications.description,publications.user_id,users.email,publications.created_at
        FROM publications
        INNER JOIN publis_categories
            ON publications.id = publis_categories.publication_id
        INNER JOIN categories
            ON categories.id = publis_categories.category_id
        INNER JOIN users
            ON users.id = publications.user_id
        WHERE categories.name = '${category}'`,{type:QueryTypes.SELECT})
    }
}

module.exports = Publication
