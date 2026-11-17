const eventSource = new EventSource('/api/gold-price')
const priceDisplay = document.getElementById('price-display')
const connectionStatus = document.getElementById('connection-status')
const form = document.querySelector('form')
const investmentAmount = document.getElementById('investment-amount')
const dialogOutputs = document.querySelector('dialog')
const investmentSummary = document.getElementById('investment-summary')
const dialogBtn = document.querySelector('dialog button')
//const backendConnection = 'http://127.0.0.1:3000'
const backendConnection = 'https://gold-digger-v7cx.onrender.com'

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

form.addEventListener('submit', async (event) => {
    event.preventDefault()
    const dateTime = new Date()
    const price = Number(priceDisplay.textContent)
    const money = Number(investmentAmount.value)
    if (!price || !money) {
        return alert('Please complete all fields!')
    }
    const ounces = Number((money / price).toFixed(4))
    const investData = {
        dateTime: dateTime,
        money: money,
        price: price,
        ounces: ounces
    }
    //console.log(investData)

    try {
        const response = await fetch("./api/gold-invest", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
        },
            body: JSON.stringify(investData),
        })
    if (response.ok) {
        investmentSummary.style.whiteSpace = 'pre-line'
        investmentSummary.textContent = 
            `You just bought ${ounces} ounces (ozt) for $${money}.\n
            The sale has executed and we're preparing your documentation.`
        dialogOutputs.showModal()

    } else {
      console.error("Server Error:", response.statusText)
    }
  } catch (error) {
    console.error("Error:", error)
  }

})

dialogBtn.addEventListener('click', async () => {
    form.reset()

     try {
        window.open(`${backendConnection}/api/docinvest`, "_blank");
    } catch (error) {
        console.error("Error:", error)
    }
    dialogOutputs.close()
})
