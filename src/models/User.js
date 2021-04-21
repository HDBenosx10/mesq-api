const { Model, DataTypes } = require('sequelize')
const bcryptjs = require('bcryptjs')

class User extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.VIRTUAL,
            password_hash: DataTypes.STRING,
        }, {
            sequelize
        })
        this.addHook('beforeSave', async (user) => {
            if (user.password) {
              user.password_hash = await bcryptjs.hash(user.password, 8);
            }
        })
    }
    static associate(models) {
        this.hasMany(models.Publication, { foreignKey:'user_id', as: 'publications'})
    }

    passwordIsValid(password) {
        return bcryptjs.compare(password, this.password_hash);
    }
}

module.exports = User
