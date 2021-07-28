 const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
	var a = (req.headers['x-forwarded-for'] || '').split(',')[0] 
        || req.connection.remoteAddress;

console.log(req.ip)
  res.send('your IP is: ' + req.connection.remoteAddress);
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})