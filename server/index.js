const express= require('express')
const cors = require('cors')

const app= express()
const PORT = 5001

app.use(cors({
    origin : `'*'`,
    methods : ['GET', 'POST', 'PUT', 'DELETE'],
}))


app.use(express.json())

app.use('/api/cars', require('./routes/carRoutes'))

app.get('/', (req,res)=>{
    res.json("car_inventory")
})

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})