const express = require('express')
const PORT = process.env.PORT || 7000 
const path = require('path')
const cors = require('cors')
require('dotenv').config()

const app = new express()
app.use(express.json())
app.use(cors())
app.set('static',path.join(__dirname,'public'))
const userController = require('./module/user.js')
const foodController = require('./module/food.js')
const orderController = require('./module/order.js')

app.get('/users',userController.GET)  
app.get('/foods',foodController.GET)  
app.get('/orders',orderController.GET)  

app.post('/users',userController.POST)  
app.post('/orders',orderController.POST)  



app.listen(PORT, () => console.log('cilent server is running on http://localhost:'+PORT))