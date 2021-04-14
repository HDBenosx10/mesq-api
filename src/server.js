const { app } = require('./app')
app.listen(process.env.APP_PORT,process.env.APP_HOST,()=>{
    console.log(`Running on http://${process.env.APP_HOST}:${process.env.APP_PORT}`)
})
