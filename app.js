import express from 'express'
import { getUsers, getUser, getUserByID, register } from './database.js'

const app = express()

app.use(express.json())

app.get("/users", async (req, res) => {
	const users = await getUsers()
    res.send(users)
})


app.get("/users/:id", async (req, res) => {
	const id = req.params.id
	const user = await getUserByID(id)
    res.send(user)
})

app.post("/users", async(req,res)=>{
	const {username, password} = req.body
	const user = await register(username, password, password)
	res.status(201).send(user)
})

app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send("Something broke")
})

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})