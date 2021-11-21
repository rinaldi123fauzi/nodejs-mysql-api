const express = require("express")
const db = require("./config/db")
const userRoutes = require('./routes/userRoutes')

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

app.use('/users', userRoutes)

app.listen(5000, () => console.log("port berjalan di 5000"))