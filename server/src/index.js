const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')

const app = express()

app.use(morgan('common'))
app.use(helmet())

const port = process.env.PORT || 1337

app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
    
})