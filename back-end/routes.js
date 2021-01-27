const express = require('express')
const router = express.Router()

let data = [
	{id: 1, is: ['starred', 'trashed'], title: 'Pingoes live', type: 'site', owner: 'me', date: new Date(2020, 2, 23, 5, 30, 0, 0)},
	{id: 2, is: ['starred'], title: 'Dauting', type: 'site', owner: 'john', date: new Date(2020, 1, 2, 5, 30, 0, 0)},
	{id: 3, is: ['starred'], title: 'Coffee Mall', type: 'page', owner: 'jason', date: new Date(2020, 1, 23, 5, 30, 0, 0)},
	{id: 4, is: ['trashed'], title: 'The leaf',  type: 'page', owner: 'jarvis', date: new Date(2021, 2, 5, 30, 0, 0)},
	{id: 5, is: ['starred'], title: 'The coffee motel',  type: 'page', owner: 'phuong', date: new Date(2021, 2, 5, 30, 0, 0)}
]

router.get('/search', async(req, res)=>{
	console.log('Queries:', req.query)
	let conditions = req.query
	let result = []
	for(let doc of data) {
		if (conditions.type && doc.type != conditions.type) continue
		if (conditions.title && doc.title != conditions.title) continue
		if (conditions.is) {
			let matched = false
			for(let attr of conditions.is){
				if (doc.is.includes(attr)) { matched = true }
			}
			if (!matched) continue
		}
		if (conditions.owner) {
			// me, but who am I
			if (conditions.owner === 'byMe' && doc.owner != 'me') continue
			if (conditions.owner === 'notMe' && doc.owner == 'me') continue
			if (conditions.owner === 'specificPerson' && doc.owner != conditions.ownerSpecified) continue
		}
		if (conditions.hasWord) {
			if (doc.indexOf(conditions.hasWord) < 0) continue 
		}
		if (conditions.date) {
			let dateFrom, dateTo
			if (conditions.date === 'anytime') {
				dateFrom = 0
				dateTo   = new Date()
			}
			else if (conditions.date === 'yesterday') {
				dateFrom = new Date()
				dateFrom.setDate(dateFrom.getDate()-1)
				dateTo   = new Date()
			}
			else if (conditions.date === 'last30days'){
				dateFrom = new Date()
				dateFrom.setDate(dateFrom.getDate()-30)
				dateTo   = new Date()
			}
			else {
				dateFrom = new Date(conditions.dateFrom)
				dateTo 	 = new Date(conditions.dateTo)
			}
			if (doc.date < dateFrom || doc.date > dateTo) continue
		}
		result.push(doc)
	}
	console.log('Return value:', result)
	res.send(result)
})

module.exports = router