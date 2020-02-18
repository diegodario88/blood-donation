const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const middlewares = require('./middlewares')
const mongoose = require('mongoose')
const api = require('./api/api')
require('dotenv').config()

const app = express();
app.enable('trust proxy'); // needed for rate limiting by Client IP
app.use(express.json())
const port = process.env.PORT || 1337;

app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Database connected');
})

app.use(morgan('common'));
app.use(helmet());
app.use(cors())
app.use(api.limiter)


app.get('/', (req, res, ) => {
    res.json({
        message: 'Blood-Donation API',
        version: '1.0.0',
        routes: '/api/v1/donors'
    })
})

app.use('/api/v1/donors', api.router)

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

