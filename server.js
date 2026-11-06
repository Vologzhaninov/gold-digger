import http from 'node:http'
import { serveStatic } from './utils/serveStatic.js'

const hostname = '127.0.0.1'
const PORT = 3000

const workDir = import.meta.dirname

const server = http.createServer((req, res) => {
    serveStatic(req, res, workDir)
    // res.statusCode = 200
    // res.setHeader('Content-Type', 'text/plain')
    // res.end('Hello from Node server!')
})

server.listen(PORT, hostname, () => {
    console.log(`Server running at http://${hostname}:${PORT}/`)
})