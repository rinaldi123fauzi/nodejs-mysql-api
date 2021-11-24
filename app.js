const express = require("express")
const app = express();
const db = require("./config/db")
const jwt = require("jsonwebtoken")

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

app.get("/get", verifyToken, async (req, res) => {
    try {
        const getAllUser = await User.findAll({})
        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if (err) {
                res.sendStatus(403)
            } else {
                res.json({
                    getAllUser,
                    authData
                })
            }
        })
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

app.put("/update/:id", verifyToken, async (req, res) => {
    try {
        const {username, email, password} = req.body
        const id = req.params.id

        const updateUser = await User.update({
            username,
            email,
            password
        }, {where: {id:id} })

        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if (err) {
                res.sendStatus(403)
            }else{
                updateUser
                res.json("berhasil diupdate")
            }
        })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("server error")
    }
})

app.post("/api/login", (req, res) => {
    const user = {
        id: 1,
        username: 'rinaldi',
        email: 'rinaldi@n.com'
    }

    jwt.sign({user}, 'secretkey', {expiresIn: "10m"}, (err, token) => {
        res.json({
            token
        })
    })
})

//FORMAT TOKEN
//Authorization: Bearer <access_token>

function verifyToken(req, res, next){
    //Get auth header value
    const bearerHeader = req.headers['authorization'];
    //Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined'){
        //Split at the space
        const bearer = bearerHeader.split(' ');
        //Get token from array
        const bearerToken = bearer[1];
        //Set the token
        req.token = bearerToken;
        //Next middleware
        next();        
    }else{
        //Forbidden
        res.sendStatus(403);
    }

}

app.listen(5000, () => console.log("port berjalan di 5000"))