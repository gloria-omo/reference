const express = require('express');
const blogRouter = require('./routers/blogRouter')
const commentRouter = require('./routers/commentRouter')

require('./config/config')

const app = express()

app.use(express.json())

app.use('/api/v1', blogRouter)
app.use('/api/v1', commentRouter)

const PORT = process.env.PORT


app.listen(PORT, ()=>{
    console.log(`This server is listening on port: ${PORT}`)
})