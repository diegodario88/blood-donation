const API_URL = 'http://localhost:1337'

export const getDonorsEntry = async () => {
    const response = await fetch(`${API_URL}/api/v1/donors`)
    return response.json()
}