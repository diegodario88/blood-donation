const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const middlewares = require('./middlewares')

const app = express();

app.use(morgan('common'));
app.use(helmet());
app.use(cors())

app.get('/', (req, res, ) => {
    res.json({
        message: 'Hello'
    })
})

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

const port = process.env.PORT || 1337;
app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});
