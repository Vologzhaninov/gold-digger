import path from 'node:path'
import fs from 'node:fs/promises'
import { sendResponse } from './sendResponse.js'

export async function serveStatic(req, res, workDir) {
    const publicDir = path.join(workDir, 'public')
    const filePath = path.join(publicDir, 
        req.url === '/' ? 'index.html' : req.url)
    const fileContent = await fs.readFile(filePath, 'utf8')
    sendResponse(res, 200, 'text/html', fileContent)
}