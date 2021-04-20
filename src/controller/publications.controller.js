const User = require('../models/User')
const Publication = require('../models/Publication')
const Category = require('../models/Category')
const { Op } = require('sequelize')

exports.index = async (req, res) =>{
    const publication = await Publication.findAll({
        attributes:['id', 'title', 'description', 'content', 'created_at'],
        include: [{association:'user',attributes:['id','name','email']},{association:'categories',attributes:[['name','tag']],
        through: {attributes:[]}}]
    })

    if(!publication.length) return res.status(200).json({msg:'No publications found'})
    return res.status(200).json(publication)
}

exports.show = async (req, res) =>{
    let {category} = req.params
    const publication = await Publication.findByCategory(category.toLowerCase())

    if(!publication.length) return res.status(200).json({msg:'No publications found'})
    return res.status(200).json(publication)
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
    if(!publication.length) return res.status(200).json({msg:'No publications found'})
    return res.status(200).json(publication)
}

exports.user = async (req, res) =>{
    const { user_id } = req.params
    if( isNaN(Number(user_id)) ) return res.status(400).json({ error: 'User not found' })
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
    return res.status(200).json(user.publications)
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
        const [tag] = await Category.findOrCreate({where: {name: category.toLowerCase()} })
        await publication.addCategory(tag)
    }

    return res.status(200).json(publication)
}



exports.delete = async (req, res) => {
    const { publication_id } = req.params

    const publication = await Publication.findByPk(publication_id)

    await publication.destroy()

    return res.status(200).json({delete: true,msg:`Publication "${publication.title}" deleted`})
}
