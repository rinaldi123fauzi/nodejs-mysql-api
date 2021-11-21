const express = require("express")
const db = require("./config/db")
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')

const app = express();


app.use(express.urlencoded({extended: true}))

db.authenticate().then(() => 
    console.log("berhasil terkoneksi dengan database")
)

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.redirect('/users')
})

app.get('/products', (req, res) => {
    res.redirect('/products')
})

app.use('/users', userRoutes)
app.use('/products', productRoutes)

app.listen(5000, () => console.log("port berjalan di 5000"))