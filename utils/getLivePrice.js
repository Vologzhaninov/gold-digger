import path from 'node:path'
import fs from 'node:fs/promises'

export async function getLivePrice() {

    const url = process.env.GOLD_URL

    const requestOptions = {
        method: 'GET',
        headers: {
            "x-access-token": process.env.GOLD_API_KEY,
            "Content-Type": "application/json"
        },
        redirect: 'follow'
    };

    try {
        const response = await fetch(url, requestOptions)
        if (!response.ok) {
            throw new Error(`HTTP error! Response status: ${response.status}`);
        }
        const result = await response.json();
        const pathJSON = path.join('data', 'data.json')
        await fs.writeFile(
            pathJSON,
            JSON.stringify(result, null, 2),
        'utf8'
        )
        
    } catch (error) {
        console.error('Failed to fetch data: ', error.message)
    }
}