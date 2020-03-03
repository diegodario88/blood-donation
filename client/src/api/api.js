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

    return response.json()
}