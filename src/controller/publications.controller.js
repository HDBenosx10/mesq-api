const User = require('../models/User')
const Publication = require('../models/Publication')
const Category = require('../models/Category')
const { Op } = require('sequelize')

exports.index = async (req, res) =>{
    const { user_id } = req.params
    const user = await User.findByPk(user_id, {
        include: [
            {
                association: 'publications',
                include: {
                    association: 'categories',
                    attributes:[['name','tag']],
                    through: {attributes:[]}
                }
            }
        ]
    })

    if(!user) {
        return res.status(400).json({ error: 'User not found' })
    }
    res.status(200).json(user.publications)
}

exports.store = async (req, res) =>{
    const { user_id } = req.params
    const { title, description, categories, content } = req.body

    const user = User.findByPk(user_id)

    if(!user) {
        return res.status(400).json({ error: 'User not found' })
    }

    const publication = await Publication.create({
        title,
        description,
        content,
        user_id
    })

    for (let category of categories) {
        const [tag] = await Category.findOrCreate({where: {name: category} })
        await publication.addCategory(tag)
    }





    return res.status(200).json(publication)
}

exports.show = (req, res) =>{
    res.status(200).json({
        status: "Running",
        router: "publis",
        route: "show",
        msg: `${req.params.category}`
    })
}

exports.search = async (req, res) =>{
    let {q:query} = req.query
    if(!query) query = ''
    const publication = await Publication.findAll({
        where: {
            [Op.or]:[
                {
                    title: {
                        [Op.like]: `%${query}%`
                    }
                },

                {
                    description: {
                        [Op.like]: `%${query}%`
                    }
                }
            ]
        }

    })
    res.status(200).json(publication)
}
