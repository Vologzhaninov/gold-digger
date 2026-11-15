import { EventEmitter } from 'node:events'
import { createPDF } from './dataHandlers.js' 

export const newDataEvents = new EventEmitter()

newDataEvents.on('userData-added', createPDF)