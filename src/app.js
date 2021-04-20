const express = require('express')
const cors = require('cors')
require('./configs/env')
require('./database')
const publis = require('./routers/publications.router')
const user = require('./routers/user.router')

class App {
    constructor() {
        this.app = express()
        this.middlewares()
        this.routers()
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended:true }))
        this.app.use(express.json())
        this.app.use(cors())
    }

    routers() {
        this.app.use('/publis/',publis)
        this.app.use('/user/',user)
        this.app.get('/', (req,res)=>{
            res.json({status:'Running',msg:'Hello World'})
        })
        this.app.use((req,res)=>{
            res.status(404).json({status:404,msg:'Unavailable endpoint'})
        })
    }
}

module.exports = new App()
