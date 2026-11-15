export function getRandomPrice(price, low_price, high_price) {
    let randomPrice = price
    const priceChange = (high_price - low_price) / 2
    const randomStep = Math.floor(Math.random() * priceChange) + Math.random()
    // Randomly choose to add or subtract (true = add, false = subtract)
    let addOrSubtract = Math.random() < 0.5;
    if (addOrSubtract) {
        randomPrice += randomStep
    } else {
        randomPrice -= randomStep
    }
    return randomPrice
}