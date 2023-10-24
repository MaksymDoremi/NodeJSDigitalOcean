import express from 'express';
import session from 'express-session'; 
import serveIndex from 'serve-index';
//import main from './routes/main.js';
import { URL } from 'url';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import { getUsers, getUser, getUserByID, register } from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//#Password123*

const app = express();


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));


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
                req.session.username = user.Username;
                res.redirect("/home");
               // res.render('home', { username: user.Username });
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
                console.log(req.body);
                        if (user) {
                              // Redirect to the home route and pass the username as a query parameter
                                req.session.username = user.Username;
                                console.log(req.session);
                        res.redirect("/home");
                        } else {
                      // Handle authentication failure
                        res.status(401).send('Authentication failed');
                        }
        });

app.get('/home', (req, res) => {
  const username = req.session.username; // Get the username from the session
  console.log(req.session);
  if (!username) {
    // Handle the case where the username is not set in the session
    res.status(401).send('Authentication required');
  } else {
    res.render('home', { username });
  }
});

app
        .route("/logout")
        .get((req, res) => {
                res.status(201).send("Logged out");
                req.session.username = undefined;
                console.log("get logout");
                console.log(req.session);
        })
        .post((req, res)=>{
                console.log("post lougout");
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send("Something broke");
});

app.use('/public', express.static('public'));
app.use('/public', serveIndex('public'));

app.listen(3000, () => {
    console.log("Server is running.");
});