import http from 'node:http'
import { serveStatic } from './utils/serveStatic.js'
import { getLivePrice } from './utils/getLivePrice.js'
import { handleGet, handlePost, handleGetPDF } from './utils/routeHandlers.js'

//const hostname = '127.0.0.1'
const PORT = process.env.PORT || 3000

const workDir = import.meta.dirname

const server = http.createServer(async (req, res) => {
    if (req.url === '/api/gold-price' && req.method === 'GET') {
        handleGet(res)
    } if (req.url === '/api/docinvest' && req.method === 'GET') {
        handleGetPDF(res)
    } else if (req.url === '/api/gold-invest' && req.method === 'POST') {
        handlePost(req, res)
    } else if (!req.url.startsWith('/api')) {
        await getLivePrice()
        return serveStatic(req, res, workDir)
    }
})

server.listen(PORT, hostname, () => {
    //console.log(`Server running at http://${hostname}:${PORT}/`)
    console.log(`Server running on port: ${PORT}/`)
})
