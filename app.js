const express = require("express");
const app = express();

const db = require("./config/db");
const User = require("./models/User");

app.get("/", (req, res) => res.send("respon nodejs berhasil"));

app.use(express.urlencoded({extended: true}));

db.authenticate().then(() => console.log("berhasil terkoneksi dengan database")); 

//crud

app.post("/crud", async (req, res) => {
    try {
        const {username, email,password} = req.body;
        const newUser = new User({
            username, email, password,
        })

        await newUser.save();
        res.json(newUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});
//get all
app.get("/crud", async (req, res) => {
    try {
        const getAllUser = await User.findAll({});

        res.json(getAllUser);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
});

app.get("/crud/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const getUser = await User.findOne({
            where: {id: id}
        });
        res.json(getUser)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
});

app.delete("/crud/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deleteUser = await User.destroy({
            where: {id: id}
        })

        await deleteUser;

        res.json("berhasil di hapus");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
});

app.put("/crud/:id", async (req, res) =>{
    try {
        const {username, email, password} = req.body;
        const id = req.params.id;

        const updateUser = await User.update({
            username,
            email,
            password
        },{where: {id: id} });

        await updateUser;
        res.json("berhasil di update");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("server error");
    }
})

//finish crud

app.listen(5000, () => console.log("port berjalan di 5000"));

