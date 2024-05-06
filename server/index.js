const express= require('express')
const cors = require('cors')

const app= express()
const PORT = 5001

  
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://carinventoryanshika-anshikaj69s-projects.vercel.app");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
  })


app.use(express.json())

app.use('/api/cars', require('./routes/carRoutes'))

app.get('/', (req,res)=>{
    res.json("car_inventory")
})

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})