const express = require('express')
const fileUpload = require('express-fileupload')
const fs = require('fs')

const app = express()
app.use(fileUpload())

// post a new image
app.post('/upload', async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        console.error('No files were uploaded.')
        return res.status(400).send('No files were uploaded.')
    }
    const date = new Date().toISOString().replaceAll(':', '_')
    // use current datetime string as filename prefix
    // ":" is not a valid char for filenames
    fs.writeFile(`images/${date}#${req.files.image.name}`, req.files.image.data, function (err) {
        if (err) {
            console.error(err)
            return res.status(400).send('Couldnt write file.')
        }
        return res.status(200).send('OK.')
    })
})

// fetch all new images, getting all images with a newer date than lastDate
const newImagesBody = ['lastDate']
app.post('/newImages', async (req, res) => {
    if (
        !req.body ||
        !newImagesBody.every((k) => Object.keys(req.body).includes(k))
    ) {
        console.error('Missing form data.')
        return res.status(400).send('Missing form data.')
    }
    const lastDate = new Date(req.body.lastDate)
    const files = fs.readdirSync('images', { withFileTypes: true })
        // get filename and date from that filename
        .map(item => ({ name: item.name, time: new Date(item.name.split('#')[0].replaceAll('_', ':')) }))
        .filter(item => {
            const timeString = item.name.split('#')[0].replaceAll('_', ':')
            const imageDate = new Date(timeString)
            return imageDate > lastDate
        })
    if (files.length) {
        const base64 = files.map(file => new Buffer.from(fs.readFileSync(`images/${file.name}`)).toString("base64"))
        const newLastDate = new Date(Math.max(...files.map(file => file.time))).toISOString()
        return res.status(200).send({ newFiles: true, newLastDate, files: base64 })
    }
    return res.status(200).send({ newFiles: false })
})

module.exports = app