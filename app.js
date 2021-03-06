const express = require("express")
const app = express();
const db = require("./config/db")

app.get("/", (req, res) => res.send("respon nodejs berhasil"))

app.use(express.urlencoded({extended: true}))

db.authenticate().then(() => 
    console.log("berhasil terkoneksi dengan database")
)

const User = require("./models/user")


app.post("/create", async (req, res) => {
    try {
        const {username, email, password} = req.body

        const newUser = new User({
            username, 
            email, 
            password
        })

        await newUser.save()
        res.json(newUser)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("server error")
    }
})

app.get("/get", async (req, res) => {
    try {
        const getAllUser = await User.findAll({})
        res.json(getAllUser)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("server error")
    }
})

app.get("/get/:id", async (req, res) => {
    try {
        const id = req.params.id

        const getUser = await User.findOne({
            where: {id:id}
        })

        res.json(getUser)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("server error")
    }
})

app.delete("/delete/:id", async (req, res) => {
    try {
        const id = req.params.id

        const getUser = await User.destroy({
            where: {id:id}
        })
        res.json("data berhasil dihapus")
    } catch (error) {
        console.error(error.message)
        res.status(500).send("server error")
    }
})

app.put("/update/:id", async (req, res) => {
    try {
        const {username, email, password} = req.body
        const id = req.params.id

        const updateUser = await User.update({
            username,
            email,
            password
        }, {where: {id:id} })

        await updateUser

        res.json("berhasil diupdate")

    } catch (error) {
        console.error(error.message)
        res.status(500).send("server error")
    }
})

app.listen(5000, () => console.log("port berjalan di 5000"))