const express = require('express')
const router = express.Router()

router.get('/search', async(req, res)=>{
	res.send({ result: 1 })
})

module.exports = router