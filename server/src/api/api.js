const { Router } = require('express')
const RateLimit = require('express-rate-limit')
const MongoStore = require('rate-limit-mongo')
require('dotenv').config()

const Donors = require('../models/Donors')

const { API_KEY, DATABASE_URL } = process.env

const router = Router()

const rateLimitDelay = 10 * 1000
const limiter = new RateLimit({
    store: new MongoStore({
        uri: DATABASE_URL,
        expireTimeMs: rateLimitDelay
    }),
    max: 5,
    windowMs: rateLimitDelay
})

router.get('/', async (req, res, next) => {
    try {
        const entries = await Donors.find()
        res.json(entries)
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        if (req.get('X-API-KEY') !== API_KEY) {
            res.status(401)
            throw new Error('UnAuthorized')
        }
        const donorEntry = new Donors(req.body)
        const createdEntry = await Donors.create(donorEntry)
        res.json(createdEntry)

    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(422)
        }
        next(error)
    }
})


module.exports = { router, limiter }