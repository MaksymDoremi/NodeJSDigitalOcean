import express from 'express';
import { getUsers, getUser, getUserByID, register } from './database.js';
import main from './routes/main.js';
import { URL } from 'url';
import path from 'path';
import { fileURLToPath } from 'url';
import serveIndex from 'serve-index';
import bodyParser from 'body-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//#Password123*

const app = express();


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');


app.get("/", (req, res) => {
    res.redirect("/registration")
});

app.get("/public", (req, res) => {
    res.redirect("/registration")
});

app
	.route("/registration")
	.get((req, res) => {
		res.sendFile(path.join(__dirname + "/registration.html"));
	})
	.post(async (req, res) => {
		const { usernameInput, passwordInput, confirmPasswordInput } = req.body;
    	const user = await register(usernameInput, passwordInput, confirmPasswordInput);
        res.status(201);
        // redirect to main page
		console.log(req.body);
	});

app
	.route("/login")
	.get((req, res) => {
		res.sendFile(path.join(__dirname + "/login.html"));
	})
	.post(async (req, res) => {
		const { usernameInput, passwordInput } = req.body;
    	const user = await getUser(usernameInput, passwordInput );
        res.status(201);
        res.render('home', { username: user.Username });
		console.log(req.body);
		console.log(user);
	});

/*
app.get("/registration", (req, res) => {
   
});
/*
app.post("/registration", (req, res) => {
    //const { usernameInput, passwordInput, confirmPasswordInput } = req.body;
    //const user = await register(usernameInput, passwordInput, confirmPasswordInput);
    //res.status(201).send(user);
    
});
*/
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname + "/login.html"));
});


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
    const { usernameInput, passwordInput, confirmPasswordInput } = req.body;
    const user = await register(usernameInput, passwordInput, confirmPasswordInput);
    res.status(201).send(user);
});


app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send("Something broke");
});

app.use('/public', express.static('public'));
app.use('/public', serveIndex('public'));

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});