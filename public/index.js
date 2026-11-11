const eventSource = new EventSource('/api/gold-price')
const priceDisplay = document.getElementById('price-display')
const connectionStatus = document.getElementById('connection-status')

// Handle live price updates 
eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data)
    const price = data.price
    priceDisplay.textContent = price.toFixed(2)
    connectionStatus.textContent = 'Live Prices 🟢'
}

// Handle connection loss
eventSource.onerror = () => {
    priceDisplay.textContent = '----.--'
    connectionStatus.textContent = 'Disconnected 🔴'
    console.log("Connection lost. Attempting to reconnect...")
}
