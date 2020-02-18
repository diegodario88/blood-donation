import { getDonorsEntry } from './api/api.js'

document
    .querySelector('header button')
    .addEventListener("click", function () {
        document
            .querySelector('.form')
            .classList.toggle('hide')
    })

