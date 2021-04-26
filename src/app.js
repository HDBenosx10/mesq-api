const express = require('express')
const cors = require('cors')
require('./configs/env')
require('./database')
const publications = require('./routers/publications.router')
const users = require('./routers/user.router')

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
        this.app.use('/publications/',publications)
        this.app.use('/users/',users)
        this.app.get('/', (req,res)=>{
            res.json({status:'Running',time:`${Date.now()}`})
        })
        this.app.use((req,res)=>{
            res.status(404).json({status:404,msg:'Unavailable endpoint'})
        })
    }
}

module.exports = new App()
