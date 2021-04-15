const User = require('../models/User')

exports.index = async (req, res) => {
    const users = await User.findAll()
    return res.status(200).json(users)
}

exports.store = async (req, res) => {
    const { name, email } = req.body

    const user = await User.create({ name, email})

    return res.status(200).json(user)
}
