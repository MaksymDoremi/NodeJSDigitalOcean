import express from 'express';
import { getUsers, getUser, getUserByID, register } from './database.js';
import main from './routes/main.js';
import { URL } from 'url';
import path from 'path';
import { fileURLToPath } from 'url';
import serveIndex from 'serve-index';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();


app.use(express.json());
//app.use("/main", main);

app.get("/", (req, res) => {
	res.redirect("/registration")
});

app.get("/public", (req, res) => {
	res.redirect("/registration")
});

app.get("/registration", (req, res) => {
	res.sendFile(path.join(__dirname+"/registration.html"));
});

app.get("/login", (req, res) => {
	res.sendFile(path.join(__dirname+"/login.html"));
});

/*
app.get("/users", async (req, res) => {
	const users = await getUsers();
	res.send(users);
});


app.get("/users/:id", async (req, res) => {
	const id = req.params.id;
	const user = await getUserByID(id);
	res.send(user);
});

app.post("/users", async (req, res) => {
	const { username, password } = req.body;
	const user = await register(username, password, password);
	res.status(201).send(user);
});
*/

app.use((err, req, res, next) => {
	console.log(err.stack);
	res.status(500).send("Something broke");
});

app.use('/public', express.static('public'));
app.use('/public', serveIndex('public'));

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});