const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({
            msg: "auth required",
        })
    }


    const [, token] = authorization.split(' ')

    try {
        const dados = jwt.verify(token, process.env.TOKEN_SECRET)
        const { id, email } = dados

        const user = await User.findOne({
            where: {
                id,
                email,
            },
        })

        if (!user)return res.status(401).json({msg:'User not found'})

        req.user_id = id
        req.user_email = email
        return next()

    } catch (e) {
        return res.status(401).json({
            msg:'Invalid Token'
        })
    }
}
