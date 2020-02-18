const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

app.use(morgan('common'));
app.use(helmet());
app.use(cors())

app.get('/', (req, res, ) => {
    res.json({
        message: 'Hello'
    })
})

app.use((req, res, next) => {
    const error = new Error(`Not found - ${req.originalUrl}`)
    res.status(404)
    next(error)
})

app.use((error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode
    res.status(statusCode)
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? '🤣' : error.stack
    })
})

const port = process.env.PORT || 1337;
app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});
