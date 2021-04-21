const User = require('../models/User')
const jwt = require('jsonwebtoken')

exports.index = async (req, res) => {
    const users = await User.findAll()
    return res.status(200).json(users)
}

exports.store = async (req, res) => {
    const { name, email, password } = req.body

    const user = await User.create({ name, email, password })

    return res.status(200).json(user)
}

exports.login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json(
            {error:'Fields are in wrong format'}
        )
    }

    const user = await User.findOne({ where: { email } })
    if(!user) {
        return res.status(400).json(
            {error:'Wrong username/password'}
        )
    }

    if(!(await user.passwordIsValid(password))) {
        return res.status(400).json(
            {error:'Wrong username/password'}
        )
    }

    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({ user: user.name, token });

}

exports.delete = async (req, res) => {
    const { id } = req.params

    const user = await User.findByPk(id)
    if(!user) return res.status(400).json(
        {error:'User not found'}
    )
    await user.destroy()

    return res.status(200).json({delete: true,msg:`User ${user.name} deleted`})
}
