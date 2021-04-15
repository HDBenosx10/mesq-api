const User = require('../models/User')
const Publication = require('../models/Publication')

exports.index = async (req, res) =>{
    const { user_id } = req.params
    const user = await User.findByPk(user_id, {
        include: { association: 'publications'}
    })

    if(!user) {
        return res.status(400).json({ error: 'User not found' })
    }
    res.status(200).json(user)
}

exports.store = async (req, res) =>{
    const { user_id } = req.params
    const { title, description, category, content } = req.body

    const user = User.findByPk(user_id)

    if(!user) {
        return res.status(400).json({ error: 'User not found' })
    }

    const publication = await Publication.create({
        title,
        description,
        category,
        content,
        user_id
    })

    res.status(200).json(publication)
}

exports.show = (req, res) =>{
    res.status(200).json({
        status: "Running",
        router: "publis",
        route: "show",
        msg: `${req.params.category}`
    })
}

exports.search = (req, res) =>{
    res.status(200).json({
        status: "Running",
        router: "publis",
        route: "show",
        msg: `${req.query.q}`
    })
}
