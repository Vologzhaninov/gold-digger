import { getData } from './getData.js'

function dummyPrice(price, low_price, high_price) {
    let livePrice = price
    const priceChange = (high_price - low_price) / 2
    const randomStep = Math.floor(Math.random() * priceChange) + Math.random()
    // Randomly choose to add or subtract (true = add, false = subtract)
    let addOrSubtract = Math.random() < 0.5;
    if (addOrSubtract) {
        livePrice += randomStep
    } else {
        livePrice -= randomStep
    }
    return livePrice
}

export async function sendPrice(res) {

    const { price, low_price, high_price } = await getData()
   
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    setInterval(() => {
        res.write(`data: ${JSON.stringify(
            {
            event: 'price-update',
            price: dummyPrice(price, low_price, high_price)
            })}\n\n`
        )
   }, 3000)
}