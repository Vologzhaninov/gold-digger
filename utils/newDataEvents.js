import { EventEmitter } from 'node:events'
import { createPDF, rotateUserLog } from './dataHandlers.js' 

export const newDataEvents = new EventEmitter()

newDataEvents.on('userData-added', createPDF)
newDataEvents.on('userLog-rotate', rotateUserLog)