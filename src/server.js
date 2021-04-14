const { app } = require('./app')
require('./database')
app.listen(process.env.APP_PORT,process.env.APP_HOST,()=>{
    console.log(`Running on http://${process.env.APP_HOST}:${process.env.APP_PORT}`)
})
