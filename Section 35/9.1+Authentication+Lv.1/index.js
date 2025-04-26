import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: 'postgres',
  password: 'pg#1234',
  database: 'whisper',
  host: 'localhost',
  port: 5432
});

db.connect();

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  let registered = false;

  try {
    await db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [email, password]);
    registered = true;
  } catch (error) {
    console.log(error);
  }

  if(registered) {
    res.redirect("/login");
  } else {
    res.render("register.ejs", {error: "Email already in use. Please log in or sign up with a different email."});
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  let authenticated = false;

  try {
    const passDB = await db.query("SELECT password FROM users WHERE email = $1", [email]);
    
    if(passDB.rows[0].password == password) {
      authenticated = true;
    }
    
  } catch (error) {
    console.log(error);
  }
  
  if(authenticated) {
    res.render("secrets.ejs");
  } else {
    res.render("login.ejs", {error: "Email or password incorrect. Please try again."});
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
