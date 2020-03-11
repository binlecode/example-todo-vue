/**
 * simple express app to host static vue.js static content
 * to run:
 * node server.js
 *
 * this server.js is needed to host static vue app content when deploy to Heroku
 */
const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')

const SERVER_PORT = 8000

const app = express()

// here we are configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '/docs')))

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
  res.sendFile(path.join(__dirname, '/docs/index.html'))
})

const port = process.env.PORT || SERVER_PORT
app.listen(port)
console.log(`app is listening on port: ${port}`)
