const API_URL = 'http://localhost:1337'

export const listDonorsEntries = async () => {
    const response = await fetch(`${API_URL}/api/v1/donors`)
    return response.json()
}
export const createDonorEntry = async (entry) => {
    const apikey = entry.apiKey
    delete entry.apiKey
              
    const response = await fetch(`${API_URL}/api/v1/donors`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-API-KEY': apikey
        },
        body: JSON.stringify(entry)
    })
    
    let json

    if(response.headers.get('content-type').includes('text/html')){
        const message = await response.text()
        json = {
            message
        }
    } else {
        json = await response.json()
    }

    if(response.ok) return json

    const error = new Error(json.message)
    error.response = json
    throw error
}