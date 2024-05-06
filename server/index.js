const express= require('express')
const cors= require('cors')

const app= express()
const PORT = 5001

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://carinventoryanshika-anshikaj69s-projects.vercel.app/'); // Replace '*' with your frontend domain
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

app.use(cors())
app.use(express.json())

app.use('/api/cars', require('./routes/carRoutes'))

app.get('/', (req,res)=>{
    res.json("car_inventory")
})

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`)
})