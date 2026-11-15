import { getData, writeUserData } from './dataHandlers.js'
import { getRandomPrice } from './getRandomPrice.js'
import { parseJSONbody } from "./parseJSONbody.js"
import { sendResponse } from "./sendResponse.js"
import { newDataEvents } from './newDataEvents.js'

export async function handleGet(res) {

    const { price, low_price, high_price } = await getData('json')
   
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    setInterval(() => {
        res.write(`data: ${JSON.stringify(
            {
            event: 'update-price',
            price: getRandomPrice(price, low_price, high_price)
            })}\n\n`
        )
   }, 3000)
}

export async function handleGetPDF(res) {
    try {
        const userPDF = await getData('pdf')
        sendResponse(res, 200, 'application/pdf', userPDF)
    } catch (err) {
        sendResponse(res, 400, 'application/json', JSON.stringify({ error: err }))
    } 
}

export async function handlePost(req, res) {
    try {
        const parsedBody = await parseJSONbody(req)
        await writeUserData(parsedBody)
        newDataEvents.emit('userData-added', parsedBody)
        sendResponse(res, 201, 'application/json', JSON.stringify(parsedBody))
    } catch (err) {
        sendResponse(res, 400, 'application/json', JSON.stringify({ error: err }))
    } 
}
