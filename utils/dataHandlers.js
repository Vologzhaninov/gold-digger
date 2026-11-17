import path from 'node:path'
import fs from 'node:fs/promises'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

export async function getData(fileType) {

  try { 
    if (fileType === 'json') {
        const pathJSON = path.join('data', 'data.json')
        const data = await fs.readFile(pathJSON, 'utf8')
        const parsedData = JSON.parse(data)
        return parsedData
    } else if (fileType === 'pdf') {
        const pathPDF = path.join('data', 'docinvest.pdf')
        const data = await fs.readFile(pathPDF)
        return data
    } else if (fileType === 'txt') {
        const pathTxt = path.join('data', 'userlog.txt')
        const stats = await fs.stat(pathTxt)
        return stats.size
    }
  } catch(error) {
    console.log(error)
    return []
  }
}


export async function writeUserData(content) {

    const { dateTime, money, price, ounces } = content
    const userData = `${dateTime}, amount paid: $${money}, price per Oz: $${price}, gold sold: ${ounces} Oz\n`

    try {
        const pathLog = path.join('data', 'userlog.txt')
        await fs.appendFile(pathLog, userData)

    } catch(error) {
        throw new Error(error)
    }
}


export async function createPDF(content) {

    const { dateTime, money, price, ounces } = content
    const userDateTime = new Date(dateTime)
    const pathPDF = path.join('data', 'docinvest.pdf')
    const pdfDoc = await PDFDocument.create()
    const courierFont = await pdfDoc.embedFont(StandardFonts.CourierBold)
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

    const page = pdfDoc.addPage()
    const { width, height } = page.getSize()
    const fontSize = 30
    page.drawText('GoldDigger', {
        x: width / 3,
        y: height - 1.5 * fontSize,
        size: fontSize,
        font: courierFont,
        color: rgb(0.72, 0.53, 0.04),
    })
    page.drawText(`
        ${userDateTime}\n
        Amount paid: $${money}\n
        Price per Oz: $${price}\n
        Gold sold: ${ounces} Oz\n`, {
        x: 20,
        y: height - 2.5 * fontSize,
        size: fontSize / 2,
        font: helveticaFont,
     })

    const pdfBytes = await pdfDoc.save()
    await fs.writeFile(pathPDF, pdfBytes)
}


export async function rotateUserLog(logbackup) {
    try {
        const logSizeLimit = 10240 //bytes
        const fileSize = await getData('txt')
        //console.log(fileSize)
        if (fileSize < logSizeLimit) {
            return
        } else {
            const pathUserLog = path.join('data', 'userlog.txt')
            const pathLogBackup = path.join('data', logbackup)
            await fs.rename(pathUserLog, pathLogBackup)
            //console.log('File renamed successfully.')
            return
        }
    } catch (error) {
        console.error('Error renaming file:', error);
    }
}