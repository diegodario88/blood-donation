import { listDonorsEntries, createDonorEntry } from './api/api.js'

async function handleBtnJoy () {   
const entry = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    bloodType: document.getElementById('blood').value,
    apiKey: document.getElementById('apiKey').value
}
if (entry.name && entry.email && entry.bloodType !== '') {
    const result = await createDonorEntry(entry)
    location.reload(true)
} else {
    alert('Name, Email, BloodType and Password must be provide!')
    }
}

document
    .querySelector('header button')
    .addEventListener("click", function () {
        document
            .querySelector('.form')
            .classList.toggle('hide')
    })

document
    .getElementById('btn-joy')
    .addEventListener("click", handleBtnJoy) 

const donorsContainer = document.getElementById('donors-container')

listDonorsEntries().then(res => {
    res.forEach(item => {
        let donorContainer = document.createElement('div')
        donorContainer.classList.add('donor')
                
        let blood = document.createElement('div')
        blood.classList.add('blood')
        blood.textContent = item.bloodType
                
        let name = document.createElement('p')
        name.textContent = item.name

        donorContainer.appendChild(blood)    
        donorContainer.appendChild(name)    
        donorsContainer.appendChild(donorContainer)
    })
})





