const express = require('express')
const parser = require('body-parser')
const route = require('./back-end/routes')
const app = express()
const PORT = process.env.PORT || 8000

app.use(parser.json())
app.use(parser.urlencoded({extended: true}))
app.use(express.static('front-end'))
app.use('/', route)

// start listening
app.listen(PORT, ()=>{
	console.log('Listening on port', PORT)
	console.log(`You could go to http://localhost:${PORT}`)
})