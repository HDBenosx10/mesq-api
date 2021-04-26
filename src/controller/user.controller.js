const User = require('../models/User')
const jwt = require('jsonwebtoken')

exports.show = async (req, res) => {
    const user = await User.findByPk(req.params.id)
    if(!user) return res.status(404).json({error:'User not found'})
    const {id,name,email,created_at} = user
    return res.status(200).json({id,name,email,created_at})
}

exports.store = async (req, res) => {
    const { name, email, password } = req.body
    if(!name||!email||!password)return res.status(400).json(
        {error:'Fields are in wrong format'}
    )
    const [user,newUser] = await User.findOrCreate({
        where: {email},
        defaults: {
            name,
            email,
            password
        }
    })

    if(!newUser) return res.status(422).json(
        {error:'User already exists'}
    )

    return res.status(201).json({name:user.name,email:user.email,created_at:user.created_at})
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
        return res.status(404).json(
            {error:'Wrong username/password'}
        )
    }

    if(!(await user.passwordIsValid(password))) {
        return res.status(404).json(
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

    await req.user.destroy()
    return res.status(200).json({delete: true,msg:`User ${user.name} deleted`})
}
